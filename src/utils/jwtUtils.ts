import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const generateToken = (admin: { id: number; email: string }) => {
    const payload = {
        id: admin.id,
        email: admin.email,
    };

    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};