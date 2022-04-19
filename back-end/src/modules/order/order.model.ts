import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { Product } from "../products/products.model";
import { User } from "../user/user.model";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Product, (product) => product.orders)
  product: Product;

  @ManyToOne((type) => User, (user) => user.orders)
  user: User;

  @Column()
  orderPrice: number;

  @Column()
  date: Date;
}
