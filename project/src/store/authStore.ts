import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  bookings: Booking[];
}

export interface Booking {
  id: string;
  from: string;
  to: string;
  date: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addBooking: (booking: Booking) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        // Demo login - in production, this would validate against a backend
        if (email === 'demo@example.com' && password === 'password') {
          set({
            user: {
              id: '1',
              email,
              name: 'Demo User',
              bookings: [],
            },
          });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
      addBooking: (booking) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                bookings: [...state.user.bookings, booking],
              }
            : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);