import { db } from '../schema';
import { nanoid } from 'nanoid';

export interface Booking {
  id: string;
  user_id: string;
  flight_id: string;
  booking_date: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'completed' | 'refunded';
}

export class BookingRepository {
  static create(booking: Omit<Booking, 'id' | 'booking_date'>): Booking {
    const id = nanoid();
    const booking_date = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO bookings (id, user_id, flight_id, booking_date, status, payment_status)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      booking.user_id,
      booking.flight_id,
      booking_date,
      booking.status,
      booking.payment_status
    );

    return { id, booking_date, ...booking };
  }

  static findByUser(userId: string): Booking[] {
    const stmt = db.prepare(`
      SELECT b.*, f.from_city, f.to_city, f.departure_time, f.price
      FROM bookings b
      JOIN flights f ON b.flight_id = f.id
      WHERE b.user_id = ?
      ORDER BY b.booking_date DESC
    `);

    return stmt.all(userId) as Booking[];
  }

  static updateStatus(id: string, status: Booking['status']): void {
    const stmt = db.prepare('UPDATE bookings SET status = ? WHERE id = ?');
    stmt.run(status, id);
  }

  static updatePaymentStatus(id: string, status: Booking['payment_status']): void {
    const stmt = db.prepare('UPDATE bookings SET payment_status = ? WHERE id = ?');
    stmt.run(status, id);
  }
}