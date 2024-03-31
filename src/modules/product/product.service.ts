import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationParam } from "src/commons/pagination";
import { Category } from "src/entities/category.entity";
import { Product } from "src/entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>
  ) {}

  async getAllProduct(pagination: PaginationParam) {
    console.log(pagination);

    const [data, total] = await this.productRepo.findAndCount({
      skip: pagination.page * pagination.size,
      take: pagination.size,
    });
    return { data, total };
  }

  async getDetailProduct(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ["images", "category"],
    });
    if (!product) {
      throw new BadRequestException("Product not found!");
    }
    return product;
  }

  async getProductsByCategory(categoryId: number, pagination: PaginationParam) {
    const [data, total] = await this.categoryRepo
      .createQueryBuilder("product")
      .leftJoin("product.category", "category")
      .where("category.id = :categoryId", { categoryId })
      .skip(pagination.page * pagination.size)
      .take(pagination.size)
      .getManyAndCount();
    return { data, total };
  }

  async createProduct(dto: CreateProductDto) {
    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });
    if (!category) {
      throw new BadRequestException("Category not found!");
    }
    const product = new Product();
    product.name = dto.name;
    product.price = dto.price;
    product.category = category;
    return await this.productRepo.save(product);
  }
}
