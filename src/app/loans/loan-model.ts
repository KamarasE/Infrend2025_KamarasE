export interface Loan {
  id?: number;
  memberId: number;
  itemId: number;
  loanDate?: Date;
  returnDate?: Date;
  isReturned?: boolean;
}
