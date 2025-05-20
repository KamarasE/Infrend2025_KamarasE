export interface Loan {
  id?: number;
  memberId?: number; // ha külön is marad
  itemId?: number;
  loanDate: Date;
  returnDate?: Date;
  isReturned?: boolean;
  member?: {
    id: number;
    name: string;
  };
  item?: {
    id: number;
    title: string;
  };
}
