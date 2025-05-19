import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Loan } from '../entity/Loan';
import { Member } from '../entity/Member';
import { Item } from '../entity/Item';
import { isValidMemberId, isValidItemId } from '../validators/loanValidator';

export class LoanController {
  private loanTable: Repository<Loan>;
  private memberTable: Repository<Member>;
  private itemTable: Repository<Item>;

  constructor(dataSource) {
    this.loanTable = dataSource.getRepository(Loan);
    this.memberTable = dataSource.getRepository(Member);
    this.itemTable = dataSource.getRepository(Item);
  }

  getAllLoans = async (_req: Request, res: Response) => {
    try {
      const loans = await this.loanTable.find({ relations: ['member', 'item'] });
      res.json(loans);
    } catch (err) {
      this.handleError(res, err);
    }
  };

  createLoan = async (req: Request, res: Response) => {
    try {
      const { memberId, inventoryNumber } = req.body;

      if (!isValidMemberId(memberId) || !isValidItemId(inventoryNumber)) {
        return res.status(400).json({ message: 'Érvénytelen tag vagy tétel azonosító.' });
      }

      const member = await this.memberTable.findOneBy({ id: memberId });
      const item = await this.itemTable.findOneBy({ inventoryNumber });

      if (!member || !item) {
        return res.status(404).json({ message: 'Nem található tag vagy tétel.' });
      }

      if (item.status !== 'available') {
        return res.status(400).json({ message: 'A tétel nem elérhető.' });
      }

      const activeLoans = await this.loanTable.count({
        where: { member: { id: memberId }, returnDate: null }
      });

      if (activeLoans >= 6) {
        return res.status(400).json({ message: 'A tag elérte a kölcsönzési limitet.' });
      }

      const newLoan = this.loanTable.create({
        member,
        item,
        loanDate: new Date(),
        returnDate: null
      });

      item.status = 'loaned';
      await this.itemTable.save(item);
      await this.loanTable.save(newLoan);

      res.json({ message: 'Kölcsönzés létrehozva.', loan: newLoan });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  returnLoan = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params['id']);
      const loan = await this.loanTable.findOne({
        where: { id },
        relations: ['item']
      });

      if (!loan || loan.returnDate !== null) {
        return res.status(404).json({ message: 'Nincs ilyen aktív kölcsönzés.' });
      }

      loan.returnDate = new Date();
      loan.item.status = 'available';

      await this.itemTable.save(loan.item);
      await this.loanTable.save(loan);

      res.json({ message: 'Kölcsönzés lezárva.', loan });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  private handleError(res: Response, err: any, status = 500, message = 'Szerverhiba.') {
    console.error(err);
    res.status(status).json({ message });
  }
}
