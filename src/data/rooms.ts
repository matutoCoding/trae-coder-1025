import type { Room, RoomCalendar } from '@/types';

export const rooms: Room[] = [
  {
    id: '1',
    name: '承启楼豪华套房',
    description: '位于土楼核心位置，视野开阔，可俯瞰整个土楼内院。配备古色古香的木质家具，让您感受传统客家文化的魅力。',
    images: [
      'https://picsum.photos/id/1048/750/500',
      'https://picsum.photos/id/1040/750/500',
      'https://picsum.photos/id/1042/750/500'
    ],
    price: 688,
    originalPrice: 888,
    capacity: 2,
    bedType: '1.8米大床房',
    area: 45,
    floor: '三楼',
    facilities: ['独立卫浴', '空调', '免费WiFi', '早餐', '观景窗', '茶具'],
    status: 'available'
  },
  {
    id: '2',
    name: '振成楼标准双床房',
    description: '传统客家土楼建筑风格，双床设计适合朋友或家庭出游。房间温馨舒适，配备现代化设施。',
    images: [
      'https://picsum.photos/id/1031/750/500',
      'https://picsum.photos/id/1019/750/500',
      'https://picsum.photos/id/1029/750/500'
    ],
    price: 488,
    originalPrice: 588,
    capacity: 2,
    bedType: '1.2米双床',
    area: 32,
    floor: '二楼',
    facilities: ['独立卫浴', '空调', '免费WiFi', '早餐', '电视', '吹风机'],
    status: 'available'
  },
  {
    id: '3',
    name: '田螺坑家庭房',
    description: ' spacious 家庭房，适合一家三口入住。房间采用木质装修，充满乡土气息，让您体验地道的客家生活。',
    images: [
      'https://picsum.photos/id/1048/750/500',
      'https://picsum.photos/id/1040/750/500'
    ],
    price: 588,
    originalPrice: 688,
    capacity: 3,
    bedType: '1.8米+1.2米床',
    area: 40,
    floor: '二楼',
    facilities: ['独立卫浴', '空调', '免费WiFi', '三人早餐', '儿童用品', '茶具'],
    status: 'available'
  },
  {
    id: '4',
    name: '怀远楼经济单人房',
    description: '简约舒适的单人房，适合背包客和独行旅客。虽小但五脏俱全，价格实惠。',
    images: [
      'https://picsum.photos/id/1031/750/500'
    ],
    price: 288,
    originalPrice: 358,
    capacity: 1,
    bedType: '1.2米单人床',
    area: 20,
    floor: '一楼',
    facilities: ['独立卫浴', '空调', '免费WiFi', '早餐', '书桌'],
    status: 'booked'
  },
  {
    id: '5',
    name: '和贵楼观景套房',
    description: '顶楼观景套房，可远眺青山绿水，欣赏土楼群的壮丽景色。房间宽敞明亮，装修精致典雅。',
    images: [
      'https://picsum.photos/id/1042/750/500',
      'https://picsum.photos/id/1048/750/500',
      'https://picsum.photos/id/1031/750/500'
    ],
    price: 888,
    originalPrice: 1088,
    capacity: 2,
    bedType: '2米特大床',
    area: 55,
    floor: '四楼',
    facilities: ['独立卫浴', '空调', '免费WiFi', '双人早餐', '观景阳台', '迷你吧', '茶具'],
    status: 'available'
  },
  {
    id: '6',
    name: '裕昌楼温馨家庭套房',
    description: '两室一厅的家庭套房，适合全家出游。配备独立客厅，给您家一般的温馨体验。',
    images: [
      'https://picsum.photos/id/1019/750/500',
      'https://picsum.photos/id/1029/750/500'
    ],
    price: 988,
    originalPrice: 1188,
    capacity: 4,
    bedType: '1.8米+1.5米床',
    area: 65,
    floor: '三楼',
    facilities: ['独立卫浴', '空调', '免费WiFi', '四人早餐', '客厅', '厨房', '儿童玩具'],
    status: 'available'
  }
];

export const generateCalendar = (year: number, month: number): RoomCalendar[] => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const calendar: RoomCalendar[] = [];
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = (month === 1 && day >= 1 && day <= 3) ||
                      (month === 5 && day >= 1 && day <= 5) ||
                      (month === 10 && day >= 1 && day <= 7);
    
    let basePrice = 388;
    if (month >= 7 && month <= 8) basePrice = 588;
    if (month === 10 || month === 2) basePrice = 488;
    if (isWeekend) basePrice += 100;
    if (isHoliday) basePrice += 200;
    
    const random = Math.random();
    let status: 'available' | 'booked' | 'selected' = 'available';
    if (random < 0.3) status = 'booked';
    
    calendar.push({
      date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      status,
      price: basePrice,
      isWeekend,
      isHoliday
    });
  }
  
  return calendar;
};

export const pricingRules = {
  peakSeason: {
    months: [7, 8],
    description: '暑期旺季（7-8月）',
    priceMultiplier: 1.5
  },
  shoulderSeason: {
    months: [2, 4, 5, 9, 10],
    description: '平季（2、4-5、9-10月）',
    priceMultiplier: 1.2
  },
  offSeason: {
    months: [1, 3, 6, 11, 12],
    description: '淡季（1、3、6、11-12月）',
    priceMultiplier: 0.8
  },
  weekendPremium: 100,
  holidayPremium: 200
};
