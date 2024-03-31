import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductImageController } from "./product-image.controller";
import { ProductImageService } from "./product-image.service";
import { ProductImage } from "src/entities/product-image.entity";
import { MulterModule } from "@nestjs/platform-express";
import { Product } from "src/entities/product.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductImage, Product]),
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  controllers: [ProductImageController],
  providers: [ProductImageService],
  exports: [ProductImageService],
})
export class ProductImageModule {}
