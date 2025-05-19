// routers/itemRoutes.ts
import { Router } from 'express';
import { ItemController } from '../controllers/item.controller';
import { AppDataSource } from '../data-source';

const itemRouter = Router();
const itemController = new ItemController(AppDataSource);

itemRouter.get('/', itemController.getAllItems);
itemRouter.get('/:sorszam', itemController.getItem);
itemRouter.post('/', itemController.createItem);
itemRouter.put('/:sorszam', itemController.updateItem);
itemRouter.delete('/:sorszam', itemController.deleteItem);

export default itemRouter;