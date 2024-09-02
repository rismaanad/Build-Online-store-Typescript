import { Request, Response } from 'express';
import { IAdminRepository } from '../repositories/IadminRepository';
import { generateToken } from '../utils/jwtUtils';
import { formatResponse } from '../utils/responseFormatter';

export class AdminController {
    private adminRepository: IAdminRepository;

    constructor(adminRepository: IAdminRepository) {
        this.adminRepository = adminRepository;
    }

    async createAdmin(req: Request, res: Response) {
        const { name, email, password } = req.body;
        try {
            const admin = await this.adminRepository.createAdmin(name, email, password);
            res.status(201).json(formatResponse(201, admin));
        } catch (error) {
            res.status(400).json(formatResponse(400, undefined, { error: 'Error creating admin' }));
        }
    }

    async getAdmins(_req: Request, res: Response) {
        try {
            const admins = await this.adminRepository.getAdmins();
            res.status(200).json(formatResponse(200, admins));
        } catch (error) {
            res.status(500).json(formatResponse(500, undefined, { error: 'Error fetching admins' }));
        }
    }

    async updateAdmin(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        try {
            const admin = await this.adminRepository.updateAdmin(parseInt(id), name, email, password);
            res.status(200).json(formatResponse(200, admin));
        } catch (error) {
            res.status(400).json(formatResponse(400, undefined, { error: 'Error updating admin' }));
        }
    }

    async deleteAdmin(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.adminRepository.deleteAdmin(parseInt(id));
            res.status(204).json(formatResponse(204));
        } catch (error) {
            res.status(400).json(formatResponse(400, undefined, { error: 'Error deleting admin' }));
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const admin = await this.adminRepository.getAdminByEmail(email);
            if (!admin || admin.password !== password) {
                return res.status(401).json(formatResponse(401, undefined, { error: 'Invalid credentials' }));
            }
            const token = generateToken(admin);
            res.status(200).json(formatResponse(200, { token }));
        } catch (error) {
            res.status(400).json(formatResponse(400, undefined, { error: 'Error logging in' }));
        }
    }
}