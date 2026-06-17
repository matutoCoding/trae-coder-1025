import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView, Button } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import classnames from 'classnames';
import dayjs from 'dayjs';
import styles from './index.module.scss';
import { rooms, generateCalendar, pricingRules } from '@/data/rooms';
import type { Room, RoomCalendar } from '@/types';
import { formatPrice, getDaysDiff, showToast } from '@/utils';
import { useStore } from '@/store/useStore';

const bannerImages = [
  'https://picsum.photos/id/1018/750/400',
  'https://picsum.photos/id/1015/750/400',
  'https://picsum.photos/id/1036/750/400'
];

const quickEntries = [
  { icon: '🍜', text: '餐饮预订', path: '/pages/dining/index' },
  { icon: '🎉', text: '活动安排', path: '/pages/activities/index' },
  { icon: '↩️', text: '退订处理', path: '/pages/refund/index' },
  { icon: '📊', text: '收益统计', path: '/pages/statistics/index' }
];

const filters = [
  { id: 'all', name: '全部' },
  { id: 'price-low', name: '价格从低到高' },
  { id: 'price-high', name: '价格从高到低' },
  { id: 'double', name: '大床房' },
  { id: 'twin', name: '双床房' },
  { id: 'family', name: '家庭房' }
];

const BookingPage: React.FC = () => {
  const { selectedRoom, setSelectedRoom, checkInDate, checkOutDate, setCheckInDate, setCheckOutDate } = useStore();
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [calendarData, setCalendarData] = useState<RoomCalendar[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadCalendar();
  }, [currentMonth]);

  useEffect(() => {
    filterRooms();
  }, [activeFilter]);

  useDidShow(() => {
    console.log('[Booking] Page shown');
  });

  const loadCalendar = useCallback(() => {
    const year = currentMonth.year();
    const month = currentMonth.month() + 1;
    const basePrice = rooms[0]?.price || 388;
    const data = generateCalendar(year, month, basePrice);
    setCalendarData(data);
    console.log('[Booking] Calendar loaded', { year, month, count: data.length });
  }, [currentMonth]);

  const filterRooms = useCallback(() => {
    let result = [...rooms];
    
    switch (activeFilter) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'double':
        result = result.filter(r => r.bedType.includes('大床'));
        break;
      case 'twin':
        result = result.filter(r => r.bedType.includes('双床'));
        break;
      case 'family':
        result = result.filter(r => r.capacity >= 3);
        break;
      default:
        break;
    }
    
    setFilteredRooms(result);
  }, [activeFilter]);

  const handlePrevMonth = () => {
    setCurrentMonth(prev => prev.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => prev.add(1, 'month'));
  };

  const handleDateSelect = (day: RoomCalendar) => {
    if (day.status === 'booked') {
      showToast('该日期已被预订', 'none');
      return;
    }

    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(day.date);
      setCheckOutDate('');
    } else if (checkInDate && !checkOutDate) {
      if (dayjs(day.date).isBefore(dayjs(checkInDate))) {
        setCheckInDate(day.date);
      } else if (dayjs(day.date).isSame(dayjs(checkInDate))) {
        showToast('退房日期不能与入住日期相同', 'none');
      } else {
        setCheckOutDate(day.date);
      }
    }
  };

  const handleRoomClick = (room: Room) => {
    if (room.status === 'booked') {
      showToast('该房间已被预订', 'none');
      return;
    }
    setSelectedRoom(room);
    Taro.navigateTo({
      url: '/pages/roomDetail/index?id=' + room.id
    });
  };

  const handleBookClick = (room: Room, e: React.MouseEvent) => {
    e.stopPropagation();
    if (room.status === 'booked') {
      showToast('该房间已被预订', 'none');
      return;
    }
    if (!checkInDate || !checkOutDate) {
      showToast('请先选择入住和退房日期', 'none');
      return;
    }
    setSelectedRoom(room);
    Taro.navigateTo({
      url: '/pages/bookingConfirm/index'
    });
  };

  const handleEntryClick = (path: string) => {
    Taro.navigateTo({ url: path });
  };

  const handlePullDownRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      loadCalendar();
      filterRooms();
      setIsRefreshing(false);
      Taro.stopPullDownRefresh();
      showToast('刷新成功', 'success');
    }, 1000);
  };

  useEffect(() => {
    Taro.eventCenter.on('pulldownrefresh', handlePullDownRefresh);
    return () => {
      Taro.eventCenter.off('pulldownrefresh', handlePullDownRefresh);
    };
  }, [loadCalendar, filterRooms]);

  const renderCalendarDays = () => {
    const firstDay = currentMonth.startOf('month').day();
    const days: React.ReactNode[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} className={classnames(styles.dayCell, styles.empty)} />);
    }

    calendarData.forEach((day) => {
      const isSelected = day.date === checkInDate || day.date === checkOutDate;
      const isInRange = checkInDate && checkOutDate && 
        dayjs(day.date).isAfter(dayjs(checkInDate)) && 
        dayjs(day.date).isBefore(dayjs(checkOutDate));

      days.push(
        <View
          key={day.date}
          className={classnames(
            styles.dayCell,
            styles[day.status],
            { [styles.selected]: isSelected },
            { [styles.selectedRange]: isInRange }
          )}
          onClick={() => handleDateSelect(day)}
        >
          <Text className={styles.dayNumber}>{dayjs(day.date).date()}</Text>
          <Text className={styles.dayPrice}>{day.price}</Text>
          {day.isHoliday && <View className={styles.dayTag}>假</View>}
          {day.isWeekend && !day.isHoliday && <View className={styles.dayTag}>休</View>}
        </View>
      );
    });

    return days;
  };

  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate || !selectedRoom) return 0;
    const days = getDaysDiff(checkInDate, checkOutDate);
    return days * selectedRoom.price;
  };

  return (
    <ScrollView 
      className={styles.container} 
      scrollY 
      enablePullDownRefresh
      onPullDownRefresh={handlePullDownRefresh}
      refresherTriggered={isRefreshing}
    >
      <View className={styles.bannerSection}>
        <Swiper
          className={styles.banner}
          autoplay
          interval={3000}
          circular
          indicatorDots
          indicatorColor="rgba(255,255,255,0.5)"
          indicatorActiveColor="#B8860B"
        >
          {bannerImages.map((img, idx) => (
            <SwiperItem key={idx}>
              <Image className={styles.bannerImage} src={img} mode="aspectFill" />
            </SwiperItem>
          ))}
        </Swiper>

        <View className={styles.quickEntry}>
          {quickEntries.map((entry, idx) => (
            <View
              key={idx}
              className={styles.entryItem}
              onClick={() => handleEntryClick(entry.path)}
            >
              <Text className={styles.entryIcon}>{entry.icon}</Text>
              <Text className={styles.entryText}>{entry.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.pricingCard}>
        <Text className={styles.pricingTitle}>📅 淡旺季定价规则</Text>
        <View className={styles.pricingItems}>
          <View className={styles.pricingItem}>
            <Text className={styles.pricingLabel}>暑期旺季</Text>
            <Text className={styles.pricingValue}>7-8月 · 1.5倍</Text>
          </View>
          <View className={styles.pricingItem}>
            <Text className={styles.pricingLabel}>平季</Text>
            <Text className={styles.pricingValue}>2、4-5、9-10月 · 1.2倍</Text>
          </View>
          <View className={styles.pricingItem}>
            <Text className={styles.pricingLabel}>淡季</Text>
            <Text className={styles.pricingValue}>1、3、6、11-12月 · 0.8倍</Text>
          </View>
        </View>
      </View>

      <View className={styles.calendarSection}>
        <View className={styles.calendarHeader}>
          <Text className={styles.calendarMonth}>
            {currentMonth.format('YYYY年MM月')}
          </Text>
          <View className={styles.calendarNav}>
            <Button className={styles.navBtn} onClick={handlePrevMonth}>‹</Button>
            <Button className={styles.navBtn} onClick={handleNextMonth}>›</Button>
          </View>
        </View>

        <View className={styles.weekDays}>
          {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
            <Text key={day} className={styles.weekDay}>{day}</Text>
          ))}
        </View>

        <View className={styles.daysGrid}>
          {renderCalendarDays()}
        </View>

        <View className={styles.selectedInfo}>
          <View>
            <Text className={styles.selectedDates}>
              {checkInDate ? (
                <>
                  <Text className={styles.highlight}>{checkInDate}</Text>
                  <Text> 至 </Text>
                  <Text className={styles.highlight}>{checkOutDate || '请选择'}</Text>
                </>
              ) : (
                <Text>请选择入住日期</Text>
              )}
            </Text>
          </View>
          {checkInDate && checkOutDate && (
            <Text className={styles.selectedDays}>
              共 {getDaysDiff(checkInDate, checkOutDate)} 晚
            </Text>
          )}
        </View>
      </View>

      <ScrollView
        className={styles.filterSection}
        scrollX
        enhanced
        showScrollbar={false}
      >
        <View className={styles.filterScroll}>
          {filters.map((filter) => (
            <View
              key={filter.id}
              className={classnames(styles.filterTag, { [styles.active]: activeFilter === filter.id })}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
            </View>
          ))}
        </View>
      </ScrollView>

      <View className={styles.roomList}>
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <View
              key={room.id}
              className={styles.roomCard}
              onClick={() => handleRoomClick(room)}
            >
              <Image
                className={styles.roomImage}
                src={room.images[0]}
                mode="aspectFill"
                onError={(e) => console.error('[Booking] Image load error', e.detail)}
              />
              <View className={styles.roomInfo}>
                <View className={styles.roomHeader}>
                  <Text className={styles.roomName}>{room.name}</Text>
                  <View className={classnames(styles.roomStatus, styles[room.status])}>
                    {room.status === 'available' ? '可预订' : '已订满'}
                  </View>
                </View>
                <Text className={styles.roomDesc}>{room.description}</Text>
                <View className={styles.roomTags}>
                  {room.facilities.slice(0, 3).map((facility, idx) => (
                    <View key={idx} className={styles.roomTag}>{facility}</View>
                  ))}
                </View>
                <View className={styles.roomFooter}>
                  <View className={styles.roomPrice}>
                    <Text className={styles.currency}>¥</Text>
                    <Text className={styles.price}>{room.price}</Text>
                    <Text className={styles.unit}>/晚</Text>
                    <Text className={styles.originalPrice}>¥{room.originalPrice}</Text>
                  </View>
                  <Button
                    className={styles.bookBtn}
                    onClick={(e) => handleBookClick(room, e as any)}
                    disabled={room.status === 'booked'}
                  >
                    立即预订
                  </Button>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>🏠</Text>
            <Text className={styles.emptyText}>暂无符合条件的房间</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default BookingPage;
