import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PaymentModalProps {
  amount: number;
  onClose: () => void;
  onPaymentComplete: () => void;
}

export default function PaymentModal({ amount, onClose, onPaymentComplete }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [upiId, setUpiId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      onPaymentComplete();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Payment Details</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold">Amount: ₹{amount.toLocaleString()}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Payment Method</label>
            <select
              className="w-full p-2 border rounded"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
            </select>
          </div>

          {paymentMethod === 'card' ? (
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Card Number</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Expiry Date</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block mb-2">CVV</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block mb-2">UPI ID</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="username@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded mt-6 hover:bg-blue-700"
          >
            Pay ₹{amount.toLocaleString()}
          </button>
        </form>
      </div>
    </div>
  );
}