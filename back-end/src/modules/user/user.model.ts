import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Order } from "../order/order.model";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  points: number;

  @Column()
  totalPoints: number;

  @Column({
    select: false,
    nullable: true,
  })
  password!: string;

  @Column()
  email: string;

  @Column({
    default: "user",
    enum: ["user", "admin"],
  })
  nivel: string;

  @Column({
    nullable: true,
    select: false,
  })
  registerToken!: string;

  @BeforeInsert()
  equalsTotalPoints() {
    this.totalPoints = this.points;
  }

  @OneToMany((type) => Order, (order) => order.user)
  @JoinColumn()
  orders: Order[];
}
