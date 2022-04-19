import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "../products/products.model";
import { User } from "../user/user.model";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Product, (product) => product.orders)
  @JoinColumn()
  product: Product;

  @ManyToOne((type) => User, (user) => user.orders)
  @JoinColumn()
  user: User;

  @Column()
  orderPrice: number;

  @Column()
  date: Date;
}
