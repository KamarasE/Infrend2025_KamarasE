import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Loan } from "./Loan";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // "book", "cd", "kotta"

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  acquisitionDate: Date;

  @Column()
  inventoryNumber: string;

  @Column({ default: 'available' })
  status: string; // "available", "loaned", "discarded"

  @OneToMany(() => Loan, loan => loan.item)
  loans: Loan[];
}
