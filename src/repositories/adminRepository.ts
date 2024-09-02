import { PrismaClient, Admin } from '@prisma/client';
import { IAdminRepository } from './IadminRepository';
import prisma from '../config/prismaClient';

export class AdminRepository implements IAdminRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
      }

    async createAdmin(name: string, email: string, password: string): Promise<Admin> {
        return this.prisma.admin.create({
            data: { name, email, password },
        });
    }

    async getAdmins(): Promise<Admin[]> {
        return this.prisma.admin.findMany();
    }

    async getAdminById(id: number): Promise<Admin | null> {
        return this.prisma.admin.findUnique({
            where: { id },
        });
    }

    async updateAdmin(id: number, name: string, email: string, password: string): Promise<Admin> {
        return this.prisma.admin.update({
            where: { id },
            data: { name, email, password },
        });
    }

    async deleteAdmin(id: number): Promise<Admin> {
        return this.prisma.admin.delete({
            where: { id },
        });
    }

    async getAdminByEmail(email: string): Promise<Admin | null> {
        return this.prisma.admin.findUnique({
            where: { email },
        });
    }
}