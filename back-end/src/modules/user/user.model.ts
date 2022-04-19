import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

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
}
