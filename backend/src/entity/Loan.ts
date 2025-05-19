import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Member } from "./Member";
import { Item } from "./Item";
@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, member => member.loans)
  member: Member;

  @ManyToOne(() => Item, item => item.loans)
  item: Item;

  @Column()
  loanDate: Date;

  @Column({ nullable: true })
  returnDate: Date;
}
