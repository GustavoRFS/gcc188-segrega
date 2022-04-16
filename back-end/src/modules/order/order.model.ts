import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  productId: number;

  @Column()
  orderPrice: number;

  @Column()
  date: Date
}
