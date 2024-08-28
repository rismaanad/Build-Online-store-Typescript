import { Router } from 'express';
import { createItem, getItems, updateItem, deleteItem } from '../controllers/itemController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.post('/', authenticateJWT, createItem);
router.get('/', authenticateJWT, getItems);
router.put('/:id', authenticateJWT, updateItem);
router.delete('/:id', authenticateJWT, deleteItem);

export default router;
