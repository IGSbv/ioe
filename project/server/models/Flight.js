import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  flightNumber: { type: String, required: true },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  duration: { type: String, required: true },
  economyPrice: { type: Number, required: true },
  businessPrice: { type: Number, required: true },
  economySeats: { type: Number, required: true },
  businessSeats: { type: Number, required: true }
});

export default mongoose.model('Flight', flightSchema);