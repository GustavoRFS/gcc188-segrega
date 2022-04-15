import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import bcrypt from 'bcryptjs';

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

  @Column({ select: false })
  password: string;

  @Column()
  email: string;

  @Column({
    default: 'user'
  })
  nivel: string;

  @BeforeInsert()
  equalsTotalPoints() {
    this.totalPoints = this.points
  }

}
