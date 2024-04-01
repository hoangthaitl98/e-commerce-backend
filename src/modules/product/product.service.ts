import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationParam } from "src/commons/pagination";
import { Category } from "src/entities/category.entity";
import { Product } from "src/entities/product.entity";
import { DataSource, In, Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductImage } from "src/entities/product-image.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(ProductImage)
    private productImageRepo: Repository<ProductImage>,
    private dataSource: DataSource
  ) {}

  async getAllProduct(pagination: PaginationParam) {
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
    if (dto.imagesId?.length > 0) {
      const images = await this.productImageRepo.find({
        where: { id: In(dto.imagesId) },
      });
      product.images = images;
    }
    return await this.productRepo.save(product);
  }

  async updateProduct(id: number, dto: CreateProductDto) {
    const [product, category, images] = await Promise.all([
      this.productRepo.findOne({ where: { id } }),
      this.categoryRepo.findOne({
        where: { id: dto.categoryId },
      }),
      dto.imagesId?.length > 0
        ? this.productImageRepo.find({
            where: { id: In(dto.imagesId) },
          })
        : null,
    ]);
    if (!product) {
      throw new BadRequestException("Product not found");
    }
    if (!category) {
      throw new BadRequestException("Category not found!");
    }
    product.name = dto.name;
    product.price = dto.price;
    product.category = category;
    if (images) product.images = images;
    return await this.productRepo.save(product);
  }

  async deleteProduct(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new BadRequestException("Product not found");
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      queryRunner.manager.getRepository(Product).delete(id);
      queryRunner.manager
        .getRepository(ProductImage)
        .delete(product.images.map((img) => img.id));
      queryRunner.commitTransaction();
    } catch (error) {
      queryRunner.rollbackTransaction();
    }
  }
}
