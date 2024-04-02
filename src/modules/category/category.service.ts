import { BadRequestException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";
import { DataSource, Repository } from "typeorm";
import { CreateCategoryDto } from "./dtos/create-category.dts";
import { Product } from "src/entities/product.entity";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private dataSource: DataSource
  ) {}

  async getAllCategories() {
    const categories = await this.categoryRepo.find();
    return categories;
  }

  async addCategory(dto: CreateCategoryDto) {
    const category = new Category();
    category.name = dto.name;
    return await this.categoryRepo.save(category);
  }

  async updateCategory(id: number, dto: CreateCategoryDto) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new BadRequestException("category not found");
    }
    category.name = dto.name;
    return await this.categoryRepo.save(category);
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ["products"],
    });
    if (!category) {
      throw new BadRequestException("Category not found");
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const products = category.products;
      await this.productRepo.save(
        products.map((product) => ({
          ...product,
          category: null,
          categoryId: null,
        }))
      );
      await this.categoryRepo.delete(id);
      await queryRunner.commitTransaction();
      return { status: HttpStatus.OK, message: "Delete success" };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error;
    }
  }
}
