import express from 'express';
import { BookingRepository } from '../db/repositories/bookingRepository';
import { FlightRepository } from '../db/repositories/flightRepository';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

const createBookingSchema = z.object({
  body: z.object({
    flight_id: z.string(),
    payment_details: z.object({
      card_number: z.string(),
      expiry: z.string(),
      cvc: z.string(),
    }),
  }),
});

router.post(
  '/',
  authenticateToken,
  validateRequest(createBookingSchema),
  async (req, res) => {
    try {
      const { flight_id } = req.body;
      const user_id = req.user!.id;

      const flight = FlightRepository.findById(flight_id);
      if (!flight) {
        return res.status(404).json({ message: 'Flight not found' });
      }

      if (flight.seats_available < 1) {
        return res.status(400).json({ message: 'No seats available' });
      }

      // Process payment (mock)
      // In production, integrate with a real payment provider

      const booking = BookingRepository.create({
        user_id,
        flight_id,
        status: 'upcoming',
        payment_status: 'completed',
      });

      FlightRepository.updateSeats(flight_id, flight.seats_available - 1);

      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ message: 'Error creating booking' });
    }
  }
);

router.get(
  '/user',
  authenticateToken,
  async (req, res) => {
    try {
      const bookings = BookingRepository.findByUser(req.user!.id);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving bookings' });
    }
  }
);

router.patch(
  '/:id/cancel',
  authenticateToken,
  async (req, res) => {
    try {
      const booking = BookingRepository.updateStatus(req.params.id, 'cancelled');
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: 'Error cancelling booking' });
    }
  }
);