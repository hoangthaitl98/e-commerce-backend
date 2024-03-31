import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entities/product.entity";
import { ProductImage } from "src/entities/product-image.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { Category } from "src/entities/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage, Category])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
