import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  seatType: { type: String, enum: ['economy', 'business'], required: true },
  passengers: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' }
});

export default mongoose.model('Booking', bookingSchema);