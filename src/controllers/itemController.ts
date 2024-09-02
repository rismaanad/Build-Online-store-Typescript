import { Request, Response } from 'express';
import { IItemRepository } from '../repositories/IitemRepository';
import { formatResponse } from '../utils/responseFormatter';

export class ItemController {
    private itemRepository: IItemRepository;

    constructor(itemRepository: IItemRepository) {
        this.itemRepository = itemRepository;
    }

    async createItem(req: Request, res: Response) {
        const { adminId, itemName } = req.body;
        try {
            const item = await this.itemRepository.createItem(parseInt(adminId), itemName);
            res.status(201).json(formatResponse(201, item));
        } catch (error) {
            res.status(400).json(formatResponse(400, undefined, { error: 'Error creating item' }));
        }
    }

    async getItems(_req: Request, res: Response) {
        try {
            const items = await this.itemRepository.getItems();
            res.status(200).json(formatResponse(200, items));
        } catch (error) {
            res.status(500).json(formatResponse(500, undefined, { error: 'Error fetching items' }));
        }
    }

    async updateItem(req: Request, res: Response) {
        const { id } = req.params;
        const { itemName } = req.body;
        try {
            const item = await this.itemRepository.updateItem(parseInt(id), itemName);
            res.status(200).json(formatResponse(200, item));
        } catch (error) {
            res.status(400).json(formatResponse(400, undefined, { error: 'Error updating item' }));
        }
    }

    async deleteItem(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await this.itemRepository.deleteItem(parseInt(id));
            res.status(204).json(formatResponse(204));
        } catch (error) {
            res.status(400).json(formatResponse(400, undefined, { error: 'Error deleting item' }));
        }
    }
}
