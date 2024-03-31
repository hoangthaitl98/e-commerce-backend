import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: "product_image" })
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  url: string;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
