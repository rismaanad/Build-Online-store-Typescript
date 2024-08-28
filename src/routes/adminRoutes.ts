import { Router } from 'express';
import { createAdmin, loginAdmin, getAdmins, updateAdmin, deleteAdmin } from '../controllers/adminController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.post('/register', createAdmin);
router.post('/login', loginAdmin);

router.get('/', authenticateJWT, getAdmins);
router.put('/:id', authenticateJWT, updateAdmin);
router.delete('/:id', authenticateJWT, deleteAdmin);

export default router;
