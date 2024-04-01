import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductImage } from "src/entities/product-image.entity";
import { Product } from "src/entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private productImageRepo: Repository<ProductImage>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>
  ) {}

  async uploadImage(files: Array<Express.Multer.File>) {
    const images = [];
    for (let i = 0; i < files.length; i++) {
      const image = new ProductImage();
      image.fileName = files[i].filename;
      image.url = files[i].path;
      images.push(image);
    }
    return await this.productImageRepo.save(images);
  }
}
