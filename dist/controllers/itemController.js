"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.getItems = exports.createItem = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createItem = async (req, res) => {
    const { adminId, itemName } = req.body;
    try {
        const item = await prisma.item.create({
            data: { adminId: parseInt(adminId), itemName },
        });
        res.status(201).json(item);
    }
    catch (error) {
        res.status(400).json({ error: 'Error creating item' });
    }
};
exports.createItem = createItem;
const getItems = async (_req, res) => {
    try {
        const items = await prisma.item.findMany();
        res.json(items);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching items' });
    }
};
exports.getItems = getItems;
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { itemName } = req.body;
    try {
        const item = await prisma.item.update({
            where: { id: parseInt(id) },
            data: { itemName },
        });
        res.json(item);
    }
    catch (error) {
        res.status(400).json({ error: 'Error updating item' });
    }
};
exports.updateItem = updateItem;
const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.item.delete({ where: { id: parseInt(id) } });
        res.status(204).end();
    }
    catch (error) {
        res.status(400).json({ error: 'Error deleting item' });
    }
};
exports.deleteItem = deleteItem;
