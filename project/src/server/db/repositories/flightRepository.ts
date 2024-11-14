import { db } from '../schema';
import { nanoid } from 'nanoid';

export interface Flight {
  id: string;
  from_city: string;  
  to_city: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  seats_available: number;
}

export class FlightRepository {
  static create(flight: Omit<Flight, 'id'>): Flight {
    const id = nanoid();
    const stmt = db.prepare(`
      INSERT INTO flights (id, from_city, to_city, departure_time, arrival_time, price, seats_available)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      flight.from_city,
      flight.to_city,
      flight.departure_time,
      flight.arrival_time,
      flight.price,
      flight.seats_available
    );

    return { id, ...flight };
  }

  static search(from: string, to: string, date: string): Flight[] {
    const stmt = db.prepare(`
      SELECT * FROM flights
      WHERE from_city LIKE ?
      AND to_city LIKE ?
      AND DATE(departure_time) = DATE(?)
      AND seats_available > 0
      ORDER BY departure_time ASC
    `);

    return stmt.all(`%${from}%`, `%${to}%`, date) as Flight[];
  }

  static findById(id: string): Flight | undefined {
    const stmt = db.prepare('SELECT * FROM flights WHERE id = ?');
    return stmt.get(id) as Flight | undefined;
  }

  static updateSeats(id: string, seats: number): void {
    const stmt = db.prepare('UPDATE flights SET seats_available = ? WHERE id = ?');
    stmt.run(seats, id);
  }
}