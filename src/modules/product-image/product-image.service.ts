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

  async uploadImage(productId: number, files: Array<Express.Multer.File>) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new BadRequestException("Product not found");
    }
    const images = [];
    for (let i = 0; i < files.length; i++) {
      const image = new ProductImage();
      image.fileName = files[i].filename;
      image.url = files[i].path;
      image.product = product;
      images.push(image);
    }
    await this.productImageRepo.save(images);
  }
}
