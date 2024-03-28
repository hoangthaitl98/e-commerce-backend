import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: true })
  address: string;
}
