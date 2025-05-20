// routers/itemRoutes.ts
import { Router } from 'express';
import { ItemController } from '../controllers/item.controller';
import { AppDataSource } from '../data-source';

const itemRouter = Router();
const itemController = new ItemController(AppDataSource);

itemRouter.get('/', itemController.getAllItems);
itemRouter.get('/:id', itemController.getItem);
itemRouter.post('/', itemController.createItem);
itemRouter.put('/:id', itemController.updateItem);
itemRouter.delete('/:id', itemController.deleteItem);

export default itemRouter;