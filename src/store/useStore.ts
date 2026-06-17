import { create } from 'zustand';
import type { Order, Room, RoomCalendar } from '@/types';

interface BookingState {
  selectedRoom: Room | null;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  calendarData: RoomCalendar[];
  setSelectedRoom: (room: Room | null) => void;
  setCheckInDate: (date: string) => void;
  setCheckOutDate: (date: string) => void;
  setGuests: (count: number) => void;
  setCalendarData: (data: RoomCalendar[]) => void;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

interface UserState {
  isLoggedIn: boolean;
  userInfo: {
    name: string;
    phone: string;
    avatar: string;
  } | null;
  login: (info: { name: string; phone: string; avatar: string }) => void;
  logout: () => void;
}

interface AppState extends BookingState, OrderState, UserState {}

export const useStore = create<AppState>((set, get) => ({
  selectedRoom: null,
  checkInDate: '',
  checkOutDate: '',
  guests: 2,
  calendarData: [],
  orders: [],
  isLoggedIn: true,
  userInfo: {
    name: '客家来客',
    phone: '138****8888',
    avatar: 'https://picsum.photos/id/1005/100/100'
  },

  setSelectedRoom: (room) => set({ selectedRoom: room }),
  setCheckInDate: (date) => set({ checkInDate: date }),
  setCheckOutDate: (date) => set({ checkOutDate: date }),
  setGuests: (count) => set({ guests: count }),
  setCalendarData: (data) => set({ calendarData: data }),

  addOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders]
    })),

  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    })),

  getOrderById: (orderId) => get().orders.find((o) => o.id === orderId),

  login: (info) =>
    set({
      isLoggedIn: true,
      userInfo: info
    }),

  logout: () =>
    set({
      isLoggedIn: false,
      userInfo: null
    })
}));
