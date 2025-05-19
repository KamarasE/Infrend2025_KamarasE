// routers/loanRoutes.ts
import { Router } from 'express';
import { LoanController } from '../controllers/loan.controller';
import { AppDataSource } from '../data-source';

const loanRouter = Router();
const loanController = new LoanController(AppDataSource);

loanRouter.get('/', loanController.getAllLoans);
loanRouter.post('/', loanController.createLoan);
loanRouter.put('/return/:id', loanController.returnLoan);

export default loanRouter;