import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Loan } from "./Loan";
@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  idCardNumber: string;

  @Column()
  address: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Loan, loan => loan.member)
  loans: Loan[];
}
