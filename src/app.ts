import express from 'express';
import adminRoutes from './routes/adminRoutes';
import itemRoutes from './routes/itemRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());

app.use('/api/admins', adminRoutes);
app.use('/api/items', itemRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use(errorHandler);

export default app;
