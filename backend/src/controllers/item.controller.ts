import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Item } from '../entity/Item';
import { isValidTitle, isValidType, isValidStatus, isValidDate, isValidInventoryNumber } from '../validators/itemValidator';

export class ItemController {
  private itemTable: Repository<Item>;

  constructor(dataSource) {
    this.itemTable = dataSource.getRepository(Item);
  }

  getAllItems = async (_req: Request, res: Response) => {
    try {
      const items = await this.itemTable.find({
        order: { inventoryNumber: 'ASC' }
      });
      res.json(items);
    } catch (err) {
      this.handleError(res, err);
    }
  };

  getItem = async (req: Request, res: Response) => {
    try {
      const inventoryNumber = req.params['inventoryNumber'];
      if (!isValidInventoryNumber(inventoryNumber)) {
        return res.status(400).json({ message: 'Érvénytelen leltári szám.' });
      }

      const item = await this.itemTable.findOneBy({ inventoryNumber });
      if (!item) {
        return res.status(404).json({ message: 'Nincs ilyen tétel.' });
      }

      res.json(item);
    } catch (err) {
      this.handleError(res, err);
    }
  };

  createItem = async (req: Request, res: Response) => {
    try {
      const { type, author, title, acquisitionDate, inventoryNumber } = req.body;

      if (!type || !title || !acquisitionDate || !inventoryNumber) {
        return res.status(400).json({ message: 'Hiányzó mezők.' });
      }

      if (!isValidTitle(title) || !isValidType(type) || !isValidDate(acquisitionDate) || !isValidInventoryNumber(inventoryNumber)) {
        return res.status(400).json({ message: 'Érvénytelen adatok.' });
      }

      const newItem = this.itemTable.create({
        type,
        author,
        title,
        acquisitionDate: new Date(acquisitionDate),
        inventoryNumber,
        status: 'available',
      });

      await this.itemTable.save(newItem);
      res.status(201).json({ message: 'Új tétel sikeresen hozzáadva.', item: newItem });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  updateItem = async (req: Request, res: Response) => {
    try {
      const inventoryNumber = req.params['inventoryNumber'];
      const item = await this.itemTable.findOneBy({ inventoryNumber });

      if (!item) {
        return res.status(404).json({ message: 'Nincs ilyen tétel.' });
      }

      const { type, author, title, acquisitionDate, status } = req.body;

      if (title !== undefined) item.title = title;
      if (author !== undefined) item.author = author;
      if (type !== undefined) item.type = type;
      if (acquisitionDate !== undefined) item.acquisitionDate = new Date(acquisitionDate);
      if (status !== undefined) item.status = status;

      await this.itemTable.save(item);
      res.json({ message: 'Tétel frissítve.', item });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  deleteItem = async (req: Request, res: Response) => {
    try {
      const inventoryNumber = req.params['inventoryNumber'];
      const item = await this.itemTable.findOneBy({ inventoryNumber });

      if (!item) {
        return res.status(404).json({ message: 'Nincs ilyen tétel.' });
      }

      if (item.status === 'loaned') {
        return res.status(400).json({ message: 'A tétel jelenleg ki van kölcsönözve.' });
      }

      item.status = 'discarded';
      await this.itemTable.save(item);

      res.json({ message: 'Tétel selejtezve.', item });
    } catch (err) {
      this.handleError(res, err);
    }
  };

  private handleError(res: Response, err: any, status = 500, message = 'Szerverhiba.') {
    console.error(err);
    res.status(status).json({ message });
  }
}
