export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface Flight {
  _id: string;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  economyPrice: number;
  businessPrice: number;
  economySeats: number;
  businessSeats: number;
}

export interface Booking {
  _id: string;
  userId: string;
  flightId: string;
  seatType: 'economy' | 'business';
  passengers: number;
  totalAmount: number;
  bookingDate: Date;
  paymentStatus: 'pending' | 'completed';
}