import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
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
  orders: Order[];

  @Column()
  image?: string;
}
