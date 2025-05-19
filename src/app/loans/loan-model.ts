export interface Loan {
  id?: number;
  memberId: number;
  itemId: number;
  borrowDate: Date;
  returnDate?: Date;
  isReturned: boolean;
}
