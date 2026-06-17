import { create } from 'zustand';
import type { Order, Room, RoomCalendar } from '@/types';
import { orders as mockOrders } from '@/data/orders';

const STORAGE_KEY = 'tulou_homestay_orders';

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

const loadOrders = (): Order[] => {
  try {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    }
  } catch (e) {
    console.warn('[Store] Failed to load orders from storage:', e);
  }
  return [...mockOrders];
};

const saveOrders = (orders: Order[]) => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }
  } catch (e) {
    console.warn('[Store] Failed to save orders to storage:', e);
  }
};

export const useStore = create<AppState>((set, get) => ({
  selectedRoom: null,
  checkInDate: '',
  checkOutDate: '',
  guests: 2,
  calendarData: [],
  orders: loadOrders(),
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
    set((state) => {
      const newOrders = [order, ...state.orders];
      saveOrders(newOrders);
      return { orders: newOrders };
    }),

  updateOrderStatus: (orderId, status) =>
    set((state) => {
      const newOrders = state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      );
      saveOrders(newOrders);
      return { orders: newOrders };
    }),

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
