import { Router } from 'express';
import { IAdminRepository } from '../repositories/IadminRepository';
import { AdminController } from '../controllers/adminController';
import prisma from '../config/prismaClient'; // Adjust path as needed
import { AdminRepository } from '../repositories/adminRepository'; // Adjust path as needed

const adminRepository: IAdminRepository = new AdminRepository(prisma);
const adminController = new AdminController(adminRepository);

const router = Router();

router.post('/register', (req, res) => adminController.createAdmin(req, res));
router.post('/login', (req, res) => adminController.login(req, res));
router.get('/', (req, res) => adminController.getAdmins(req, res));
router.put('/:id', (req, res) => adminController.updateAdmin(req, res));
router.delete('/:id', (req, res) => adminController.deleteAdmin(req, res));

export default router;
    