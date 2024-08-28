import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createItem = async (req: Request, res: Response) => {
  const { adminId, itemName } = req.body;
  try {
    const item = await prisma.item.create({
      data: { adminId: parseInt(adminId), itemName },
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: 'Error creating item' });
  }
};

export const getItems = async (_req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching items' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { itemName } = req.body;
  try {
    const item = await prisma.item.update({
      where: { id: parseInt(id) },
      data: { itemName },
    });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: 'Error updating item' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.item.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting item' });
  }
};
