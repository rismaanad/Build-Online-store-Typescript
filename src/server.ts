import express from 'express';
import dotenv from 'dotenv';

import adminRoutes from './routes/adminRoutes';
import itemRoutes from './routes/itemRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/admins', adminRoutes);
app.use('/api/items', itemRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
