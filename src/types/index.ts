export interface Room {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  originalPrice: number;
  capacity: number;
  bedType: string;
  area: number;
  floor: string;
  facilities: string[];
  status: 'available' | 'booked' | 'maintenance';
}

export interface RoomCalendar {
  date: string;
  status: 'available' | 'booked' | 'selected';
  price: number;
  isWeekend: boolean;
  isHoliday: boolean;
}

export interface Introduction {
  id: string;
  title: string;
  content: string;
  images: string[];
  category: 'history' | 'architecture' | 'culture' | 'surrounding';
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'folk' | 'tea' | 'education' | 'festival';
  duration: string;
  price: number;
  maxParticipants: number;
  availableDates: string[];
}

export interface DiningItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  isRecommended: boolean;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  price: number;
  status: 'upcoming' | 'ongoing' | 'ended';
}

export interface Order {
  id: string;
  orderNo: string;
  type: 'room' | 'dining' | 'experience' | 'activity';
  title: string;
  image: string;
  checkInDate?: string;
  checkOutDate?: string;
  date?: string;
  time?: string;
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunding' | 'refunded';
  createTime: string;
  guestName?: string;
  guestPhone?: string;
  guests?: number;
  remark?: string;
}

export interface Review {
  id: string;
  orderId: string;
  guestName: string;
  avatar: string;
  rating: number;
  content: string;
  images: string[];
  createTime: string;
  reply?: string;
  replyTime?: string;
}

export interface StatisticsData {
  date: string;
  revenue: number;
  bookings: number;
  occupancyRate: number;
}

export interface MonthlyStatistics {
  month: string;
  totalRevenue: number;
  totalBookings: number;
  avgOccupancyRate: number;
}

export interface SurroundingSpot {
  id: string;
  name: string;
  description: string;
  image: string;
  distance: string;
  duration: string;
  ticketPrice: string;
}
