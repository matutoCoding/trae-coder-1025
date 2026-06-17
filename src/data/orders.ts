import type { Order } from '@/types';

export const orders: Order[] = [
  {
    id: '1',
    orderNo: 'TL202606170001',
    type: 'room',
    title: '承启楼豪华套房',
    image: 'https://picsum.photos/id/1048/300/200',
    checkInDate: '2026-06-18',
    checkOutDate: '2026-06-20',
    price: 1376,
    status: 'confirmed',
    createTime: '2026-06-15 14:30:00',
    guestName: '张先生',
    guestPhone: '138****8888',
    guests: 2,
    remark: '希望安排安静的房间'
  },
  {
    id: '2',
    orderNo: 'TL202606170002',
    type: 'room',
    title: '振成楼标准双床房',
    image: 'https://picsum.photos/id/1031/300/200',
    checkInDate: '2026-06-16',
    checkOutDate: '2026-06-18',
    price: 976,
    status: 'completed',
    createTime: '2026-06-10 09:15:00',
    guestName: '李女士',
    guestPhone: '139****6666',
    guests: 2,
    remark: ''
  },
  {
    id: '3',
    orderNo: 'TL202606170003',
    type: 'dining',
    title: '客家晚餐套餐',
    image: 'https://picsum.photos/id/326/300/200',
    date: '2026-06-18',
    time: '18:30',
    price: 256,
    status: 'pending',
    createTime: '2026-06-16 16:45:00',
    guestName: '王先生',
    guestPhone: '137****5555',
    guests: 4,
    remark: '不吃辣'
  },
  {
    id: '4',
    orderNo: 'TL202606170004',
    type: 'experience',
    title: '采茶体验+手工制茶',
    image: 'https://picsum.photos/id/1044/300/200',
    date: '2026-06-19',
    time: '08:00',
    price: 512,
    status: 'confirmed',
    createTime: '2026-06-14 11:20:00',
    guestName: '陈小姐',
    guestPhone: '136****4444',
    guests: 2,
    remark: '想多了解一些茶文化'
  },
  {
    id: '5',
    orderNo: 'TL202606170005',
    type: 'activity',
    title: '端午节客家龙舟会',
    image: 'https://picsum.photos/id/1018/300/200',
    date: '2026-06-19',
    time: '14:00',
    price: 752,
    status: 'confirmed',
    createTime: '2026-06-12 15:30:00',
    guestName: '刘先生一家',
    guestPhone: '135****3333',
    guests: 4,
    remark: ''
  },
  {
    id: '6',
    orderNo: 'TL202606170006',
    type: 'room',
    title: '怀远楼经济单人房',
    image: 'https://picsum.photos/id/1031/300/200',
    checkInDate: '2026-06-20',
    checkOutDate: '2026-06-22',
    price: 576,
    status: 'refunding',
    createTime: '2026-06-15 08:00:00',
    guestName: '赵先生',
    guestPhone: '134****2222',
    guests: 1,
    remark: '临时有事，需要退订'
  },
  {
    id: '7',
    orderNo: 'TL202606170007',
    type: 'room',
    title: '和贵楼观景套房',
    image: 'https://picsum.photos/id/1042/300/200',
    checkInDate: '2026-06-21',
    checkOutDate: '2026-06-23',
    price: 1776,
    status: 'cancelled',
    createTime: '2026-06-08 10:00:00',
    guestName: '孙女士',
    guestPhone: '133****1111',
    guests: 2,
    remark: '行程变更'
  },
  {
    id: '8',
    orderNo: 'TL202606170008',
    type: 'experience',
    title: '客家美食制作',
    image: 'https://picsum.photos/id/292/300/200',
    date: '2026-06-17',
    time: '15:00',
    price: 384,
    status: 'completed',
    createTime: '2026-06-10 14:20:00',
    guestName: '周先生',
    guestPhone: '132****9999',
    guests: 3,
    remark: ''
  },
  {
    id: '9',
    orderNo: 'TL202606170009',
    type: 'dining',
    title: '早餐套餐×2份',
    image: 'https://picsum.photos/id/292/300/200',
    date: '2026-06-18',
    time: '08:00',
    price: 50,
    status: 'pending',
    createTime: '2026-06-17 18:00:00',
    guestName: '吴女士',
    guestPhone: '131****8888',
    guests: 2,
    remark: ''
  },
  {
    id: '10',
    orderNo: 'TL202606170010',
    type: 'room',
    title: '裕昌楼温馨家庭套房',
    image: 'https://picsum.photos/id/1019/300/200',
    checkInDate: '2026-07-10',
    checkOutDate: '2026-07-15',
    price: 4940,
    status: 'pending',
    createTime: '2026-06-16 20:00:00',
    guestName: '郑先生一家',
    guestPhone: '130****7777',
    guests: 4,
    remark: '暑期家庭出游'
  }
];

export const statusMap = {
  pending: { text: '待确认', color: '#FF9800' },
  confirmed: { text: '已确认', color: '#4CAF50' },
  completed: { text: '已完成', color: '#1976D2' },
  cancelled: { text: '已取消', color: '#9E9E9E' },
  refunding: { text: '退款中', color: '#FF5722' },
  refunded: { text: '已退款', color: '#9E9E9E' }
};

export const typeMap = {
  room: { text: '客房预订', icon: '🏠' },
  dining: { text: '餐饮预订', icon: '🍜' },
  experience: { text: '文化体验', icon: '🎭' },
  activity: { text: '活动参与', icon: '🎉' }
};

export const refundPolicy = {
  freeCancelHours: 48,
  partialCancelHours: 24,
  freeCancelRate: 1.0,
  partialCancelRate: 0.5,
  noShowRate: 0
};
