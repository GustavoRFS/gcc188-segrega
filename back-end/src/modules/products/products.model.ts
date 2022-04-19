import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Order } from "../order/order.model";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: true, select: false })
  isActive: boolean;

  @OneToMany((type) => Order, (order) => order.product)
  @JoinColumn()
  orders: Order[];

  @Column({ nullable: true })
  image?: string;
}
