import { Admin } from '@prisma/client';

export interface IAdminRepository {
    createAdmin(name: string, email: string, password: string): Promise<Admin>;
    getAdmins(): Promise<Admin[]>;
    getAdminById(id: number): Promise<Admin | null>;
    updateAdmin(id: number, name: string, email: string, password: string): Promise<Admin>;
    deleteAdmin(id: number): Promise<Admin>;
    getAdminByEmail(email: string): Promise<Admin | null>;
}