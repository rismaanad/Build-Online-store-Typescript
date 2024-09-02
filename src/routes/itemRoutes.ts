import { Router } from 'express';
import { IItemRepository } from '../repositories/IitemRepository';
import { ItemController } from '../controllers/itemController';
import prisma from '../config/prismaClient'; 
import { ItemRepository } from '../repositories/itemRepository'; 

const itemRepository: IItemRepository = new ItemRepository(prisma);
const itemController = new ItemController(itemRepository);

const router = Router();

router.post('/', (req, res) => itemController.createItem(req, res));
router.get('/', (req, res) => itemController.getItems(req, res));
router.put('/:id', (req, res) => itemController.updateItem(req, res));
router.delete('/:id', (req, res) => itemController.deleteItem(req, res));

export default router;
