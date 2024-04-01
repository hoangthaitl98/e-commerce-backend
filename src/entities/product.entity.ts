import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductImage } from "./product-image.entity";
import { Category } from "./category.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  price: number;

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Column({ nullable: true })
  categoryId: number;
}
