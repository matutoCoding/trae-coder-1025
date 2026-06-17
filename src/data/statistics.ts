import type { StatisticsData, MonthlyStatistics } from '@/types';

export const dailyStatistics: StatisticsData[] = [
  { date: '06-01', revenue: 2580, bookings: 3, occupancyRate: 45 },
  { date: '06-02', revenue: 1860, bookings: 2, occupancyRate: 30 },
  { date: '06-03', revenue: 3200, bookings: 4, occupancyRate: 60 },
  { date: '06-04', revenue: 4100, bookings: 5, occupancyRate: 75 },
  { date: '06-05', revenue: 3680, bookings: 4, occupancyRate: 65 },
  { date: '06-06', revenue: 5200, bookings: 6, occupancyRate: 90 },
  { date: '06-07', revenue: 4800, bookings: 5, occupancyRate: 80 },
  { date: '06-08', revenue: 2900, bookings: 3, occupancyRate: 50 },
  { date: '06-09', revenue: 3100, bookings: 3, occupancyRate: 55 },
  { date: '06-10', revenue: 4500, bookings: 5, occupancyRate: 75 },
  { date: '06-11', revenue: 5800, bookings: 6, occupancyRate: 95 },
  { date: '06-12', revenue: 6200, bookings: 7, occupancyRate: 100 },
  { date: '06-13', revenue: 5500, bookings: 6, occupancyRate: 90 },
  { date: '06-14', revenue: 3800, bookings: 4, occupancyRate: 65 },
  { date: '06-15', revenue: 4200, bookings: 5, occupancyRate: 70 },
  { date: '06-16', revenue: 5100, bookings: 6, occupancyRate: 85 },
  { date: '06-17', revenue: 4900, bookings: 5, occupancyRate: 80 }
];

export const monthlyStatistics: MonthlyStatistics[] = [
  { month: '1月', totalRevenue: 68500, totalBookings: 72, avgOccupancyRate: 38 },
  { month: '2月', totalRevenue: 125600, totalBookings: 128, avgOccupancyRate: 65 },
  { month: '3月', totalRevenue: 82400, totalBookings: 86, avgOccupancyRate: 45 },
  { month: '4月', totalRevenue: 98700, totalBookings: 98, avgOccupancyRate: 52 },
  { month: '5月', totalRevenue: 115200, totalBookings: 112, avgOccupancyRate: 60 },
  { month: '6月', totalRevenue: 135600, totalBookings: 130, avgOccupancyRate: 68 }
];

export const summaryData = {
  todayRevenue: 4900,
  todayBookings: 5,
  todayOccupancy: 80,
  monthRevenue: 135600,
  monthBookings: 130,
  monthOccupancy: 68,
  yearRevenue: 626000,
  yearBookings: 626,
  avgRating: 4.8,
  totalReviews: 156,
  pendingOrders: 12,
  pendingRefunds: 3
};

export const revenueByType = [
  { type: '客房收入', amount: 98500, percentage: 72.6 },
  { type: '餐饮收入', amount: 22800, percentage: 16.8 },
  { type: '体验活动', amount: 10500, percentage: 7.7 },
  { type: '其他收入', amount: 3800, percentage: 2.9 }
];

export const roomTypeStatistics = [
  { name: '豪华套房', bookings: 28, revenue: 42000 },
  { name: '标准双床房', bookings: 35, revenue: 38500 },
  { name: '家庭房', bookings: 22, revenue: 28600 },
  { name: '经济单人房', bookings: 30, revenue: 18000 },
  { name: '观景套房', bookings: 10, revenue: 15000 },
  { name: '家庭套房', bookings: 5, revenue: 12000 }
];

export const topGuestSources = [
  { source: '广东省', count: 45, percentage: 34.6 },
  { source: '福建省', count: 28, percentage: 21.5 },
  { source: '浙江省', count: 18, percentage: 13.8 },
  { source: '上海市', count: 15, percentage: 11.5 },
  { source: '北京市', count: 12, percentage: 9.2 },
  { source: '其他地区', count: 12, percentage: 9.2 }
];

export const peakSeasonForecast = [
  { month: '7月', expectedRevenue: 280000, expectedBookings: 240 },
  { month: '8月', expectedRevenue: 320000, expectedBookings: 260 },
  { month: '9月', expectedRevenue: 180000, expectedBookings: 150 },
  { month: '10月', expectedRevenue: 250000, expectedBookings: 200 }
];
