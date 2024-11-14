import Database from 'better-sqlite3';
import { z } from 'zod';

const db = new Database('iron-wings.db');

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Schema definitions
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
  created_at: z.string().datetime(),
});

export const flightSchema = z.object({
  id: z.string(),
  from_city: z.string(),
  to_city: z.string(),
  departure_time: z.string().datetime(),
  arrival_time: z.string().datetime(),
  price: z.number(),
  seats_available: z.number(),
});

export const bookingSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  flight_id: z.string(),
  booking_date: z.string().datetime(),
  status: z.enum(['upcoming', 'completed', 'cancelled']),
  payment_status: z.enum(['pending', 'completed', 'refunded']),
});

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS flights (
    id TEXT PRIMARY KEY,
    from_city TEXT NOT NULL,
    to_city TEXT NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    seats_available INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    flight_id TEXT NOT NULL,
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT CHECK(status IN ('upcoming', 'completed', 'cancelled')) NOT NULL,
    payment_status TEXT CHECK(payment_status IN ('pending', 'completed', 'refunded')) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (flight_id) REFERENCES flights(id) ON DELETE CASCADE
  );

  -- Indexes for better query performance
  CREATE INDEX IF NOT EXISTS idx_flights_cities ON flights(from_city, to_city);
  CREATE INDEX IF NOT EXISTS idx_flights_departure ON flights(departure_time);
  CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
  CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
`);

export { db };