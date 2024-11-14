import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './api/routes/auth';
import flightRoutes from './api/routes/flights';
import bookingRoutes from './api/routes/bookings';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});