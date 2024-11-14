import express from 'express';
import { FlightRepository } from '../db/repositories/flightRepository';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Validation schema for searching flights
const searchSchema = z.object({
  query: z.object({
    from: z.string(),
    to: z.string(),
    date: z.string(),
  }),
});

// Route for searching flights
router.get(
  '/search',
  validateRequest(searchSchema),
  async (req, res) => {
    try {
      const { from, to, date } = req.query;
      const flights = FlightRepository.search(
        from as string,
        to as string,
        date as string
      );
      res.json(flights);
    } catch (error) {
      res.status(500).json({ message: 'Error searching flights' });
    }
  }
);

// Route for getting flight details by ID
router.get(
  '/:id',
  authenticateToken,
  async (req, res) => {
    try {
      const flight = FlightRepository.findById(req.params.id);
      if (!flight) {
        return res.status(404).json({ message: 'Flight not found' });
      }
      res.json(flight);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving flight' });
    }
  }
);

// New Route for Creating a Flight
const createFlightSchema = z.object({
  body: z.object({
    from_city: z.string(),
    to_city: z.string(),
    departure_time: z.string(),
    arrival_time: z.string(),
    price: z.number(),
    seats_available: z.number(),
  }),
});

router.post(
  '/create',
  validateRequest(createFlightSchema),
  async (req, res) => {
    try {
      const newFlight = req.body;
      const addedFlight = FlightRepository.create(newFlight);
      res.status(201).json(addedFlight);
    } catch (error) {
      res.status(500).json({ message: 'Error creating flight' });
    }
  }
);

export default router;
FlightRepository.create(){
  {
    "from_city": "Chennai",
    "to_city": "Kerala",
    "departure_time": "2024-12-15T09:00:00Z",  // Example departure time in ISO format
    "arrival_time": "2024-12-15T11:00:00Z",    // Example arrival time in ISO format
    "price": 200.00,
    "seats_available": 100
  }  
}
FlightRepository.create(){
  {
    "from_city": "Chennai",
    "to_city": "Dubai",
    "departure_time": "2024-12-15T09:00:00Z",  // Example departure time in ISO format
    "arrival_time": "2024-12-15T11:00:00Z",    // Example arrival time in ISO format
    "price": 200.00,
    "seats_available": 100
  }  
}
