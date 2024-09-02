import { Item } from '@prisma/client';

export interface IItemRepository {
    createItem(adminId: number, itemName: string): Promise<Item>;
    getItems(): Promise<Item[]>;
    getItemById(id: number): Promise<Item | null>;
    updateItem(id: number, itemName: string): Promise<Item>;
    deleteItem(id: number): Promise<Item>;
}