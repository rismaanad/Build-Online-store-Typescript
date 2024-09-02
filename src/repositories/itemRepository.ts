import { PrismaClient, Item } from '@prisma/client';
import { IItemRepository } from './IitemRepository';
import prisma from '../config/prismaClient';

export class ItemRepository implements IItemRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
      }

    async createItem(adminId: number, itemName: string): Promise<Item> {
        return this.prisma.item.create({
            data: { adminId, itemName },
        });
    }

    async getItems(): Promise<Item[]> {
        return this.prisma.item.findMany();
    }

    async getItemById(id: number): Promise<Item | null> {
        return this.prisma.item.findUnique({
            where: { id },
        });
    }

    async updateItem(id: number, itemName: string): Promise<Item> {
        return this.prisma.item.update({
            where: { id },
            data: { itemName },
        });
    }

    async deleteItem(id: number): Promise<Item> {
        return this.prisma.item.delete({
            where: { id },
        });
    }
}