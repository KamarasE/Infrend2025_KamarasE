// controllers/member.controller.ts
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Member } from '../entity/Member';
import { isValidName, isValidPhone, isValidIdCard, isValidAddress } from '../validators/memberValidator';

export class MemberController {
  private memberTable: Repository<Member>;

  constructor(dataSource) {
    this.memberTable = dataSource.getRepository(Member);
  }

  getMember = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params['id']);
      const member = await this.memberTable.findOneBy({ id });
      if (!member) return res.status(404).json({ message: 'Nincs ilyen tag.' });
      res.json(member);
    } catch (err) {
      this.handleError(res, err);
    }
  };

  getMemberByQuery = async (req: Request, res: Response) => {
  try {
    const q = req.query.q?.toString().trim().toLowerCase();

    if (!q) {
      return res.status(400).json({ message: 'Keresési kifejezés szükséges (pl. név vagy ID).' });
    }

    const id = Number(q);
    if (!isNaN(id)) {
      const member = await this.memberTable.findOneBy({ id });
      if (member) return res.json([member]);
    }

    const matches = await this.memberTable
      .createQueryBuilder('member')
      .where('LOWER(member.name) LIKE :name', { name: `%${q}%` })
      .orderBy('member.id', 'ASC')
      .getMany();

    if (matches.length > 0) {
      return res.json(matches);
    }

    return res.status(404).json({ message: 'Nem található egyező tag.' });
  } catch (err) {
    this.handleError(res, err);
  }
};


  createMember = async (req: Request, res: Response) => {
    try {
      const { name, idCardNumber, phone, address } = req.body;
      if (!isValidName(name) || !isValidPhone(phone) || !isValidIdCard(idCardNumber) || !isValidAddress(address)) {
        return res.status(400).json({ message: 'Érvénytelen adatok.' });
      }
      const newMember = this.memberTable.create({ name, idCardNumber, phone, address, active: true });
      await this.memberTable.save(newMember);
      res.json({ message: 'Tag sikeresen hozzáadva!', member: newMember });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  updateMember = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params['id']);
      const member = await this.memberTable.findOneBy({ id });
      if (!member) return res.status(404).json({ message: 'Nincs ilyen tag.' });
      const { name, idCardNumber, phone, address } = req.body;
      if (name && !isValidName(name)) return res.status(400).json({ message: 'Érvénytelen név.' });
      if (idCardNumber && !isValidIdCard(idCardNumber)) return res.status(400).json({ message: 'Érvénytelen személyi szám.' });
      if (phone && !isValidPhone(phone)) return res.status(400).json({ message: 'Érvénytelen telefonszám.' });
      if (address && !isValidAddress(address)) return res.status(400).json({ message: 'Érvénytelen cím.' });
      Object.assign(member, req.body);
      await this.memberTable.save(member);
      res.json({ message: 'Tag frissítve!', member });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  deleteMember = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params['id']);
      const member = await this.memberTable.findOneBy({ id });
      if (!member) return res.status(404).json({ message: 'Nincs ilyen tag.' });
      member.active = false;
      await this.memberTable.save(member);
      res.json({ message: 'A tag inaktiválva lett.', member });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  private handleError = (res: Response, err: any, status = 500, message = 'Szerverhiba.') => {
    console.error(err);
    res.status(status).json({ message });
  };
}
