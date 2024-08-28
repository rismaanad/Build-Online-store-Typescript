import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const createAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: 'Error creating admin' });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

export const getAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await prisma.admin.findMany();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching admins' });
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.update({
      where: { id: parseInt(id) },
      data: { name, email, password: hashedPassword },
    });
    res.json(admin);
  } catch (error) {
    res.status(400).json({ error: 'Error updating admin' });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.admin.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Error deleting admin' });
  }
};
