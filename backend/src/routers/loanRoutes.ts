import { Router } from 'express';
import { LoanController } from '../controllers/loan.controller';
import { AppDataSource } from '../data-source';

const loanRouter = Router();
const loanController = new LoanController(AppDataSource);

loanRouter.get('/', loanController.getAllLoans);
loanRouter.post('/', loanController.createLoan);
loanRouter.patch('/:id/return', loanController.returnLoan);
loanRouter.get('/overdue', loanController.getOverdueLoans);


export default loanRouter;

console.log("LoanRoutes registered paths:");
loanRouter.stack.forEach((layer: any) => {
  if (layer.route) {
    console.log(Object.keys(layer.route.methods).join(', ').toUpperCase(), layer.route.path);
  }
});
