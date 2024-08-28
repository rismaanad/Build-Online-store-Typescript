"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.updateAdmin = exports.getAdmins = exports.loginAdmin = exports.createAdmin = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const admin = await prisma.admin.create({
            data: { name, email, password: hashedPassword },
        });
        res.status(201).json(admin);
    }
    catch (error) {
        res.status(400).json({ error: 'Error creating admin' });
    }
};
exports.createAdmin = createAdmin;
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (admin && (await bcryptjs_1.default.compare(password, admin.password))) {
            const token = jsonwebtoken_1.default.sign({ adminId: admin.id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            res.json({ token });
        }
        else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};
exports.loginAdmin = loginAdmin;
const getAdmins = async (_req, res) => {
    try {
        const admins = await prisma.admin.findMany();
        res.json(admins);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching admins' });
    }
};
exports.getAdmins = getAdmins;
const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const admin = await prisma.admin.update({
            where: { id: parseInt(id) },
            data: { name, email, password: hashedPassword },
        });
        res.json(admin);
    }
    catch (error) {
        res.status(400).json({ error: 'Error updating admin' });
    }
};
exports.updateAdmin = updateAdmin;
const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.admin.delete({ where: { id: parseInt(id) } });
        res.status(204).end();
    }
    catch (error) {
        res.status(400).json({ error: 'Error deleting admin' });
    }
};
exports.deleteAdmin = deleteAdmin;
