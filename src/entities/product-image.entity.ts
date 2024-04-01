import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: "product_image" })
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  fileName: string;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: true })
  productId: number;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
