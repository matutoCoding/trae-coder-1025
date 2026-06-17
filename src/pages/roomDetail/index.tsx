import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, Image, ScrollView, Swiper, SwiperItem, Button } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import classnames from 'classnames';
import styles from './index.module.scss';
import { rooms, generateCalendar, pricingRules, calculateStayTotal, hasBookedDatesInRange } from '@/data/rooms';
import { formatPrice, getDaysDiff, showToast } from '@/utils';
import { useStore } from '@/store/useStore';
import type { RoomCalendar, Room } from '@/types';

const facilityIcons: Record<string, string> = {
  '独立卫浴': '🚿',
  '空调': '❄️',
  '免费WiFi': '📶',
  '早餐': '🍳',
  '观景窗': '🪟',
  '茶具': '🍵',
  '电视': '📺',
  '吹风机': '💨',
  '三人早餐': '🍳',
  '儿童用品': '🧸',
  '书桌': '🪑',
  '观景阳台': '🌅',
  '迷你吧': '🍷',
  '客厅': '🛋️',
  '厨房': '🍳',
  '儿童玩具': '🧸',
  '四人早餐': '🍳'
};

const RoomDetailPage: React.FC = () => {
  const router = useRouter();
  const { selectedRoom, setSelectedRoom, setCheckInDate, setCheckOutDate, setGuests } = useStore();
  const roomId = router.params.id;

  const [room, setRoom] = useState<Room | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [calendar, setCalendar] = useState<RoomCalendar[]>([]);
  const [currentMonth, setCurrentMonth] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });
  const [checkInDate, setCheckInDateLocal] = useState('');
  const [checkOutDate, setCheckOutDateLocal] = useState('');

  const loadCalendar = useCallback((year: number, month: number, basePrice: number) => {
    const cal = generateCalendar(year, month, basePrice);
    setCalendar(cal);
  }, []);

  useEffect(() => {
    const foundRoom = rooms.find(r => r.id === roomId) || rooms[0];
    setRoom(foundRoom);
    setSelectedRoom(foundRoom);
    loadCalendar(currentMonth.year, currentMonth.month, foundRoom.price);
  }, [roomId, currentMonth, loadCalendar, setSelectedRoom]);

  const handlePrevMonth = () => {
    let { year, month } = currentMonth;
    month--;
    if (month < 1) {
      month = 12;
      year--;
    }
    setCurrentMonth({ year, month });
  };

  const handleNextMonth = () => {
    let { year, month } = currentMonth;
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
    setCurrentMonth({ year, month });
  };

  const handleDateClick = (date: RoomCalendar) => {
    if (date.status === 'booked') {
      showToast('该日期已被预订', 'none');
      return;
    }

    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDateLocal(date.date);
      setCheckOutDateLocal('');
    } else if (checkInDate && !checkOutDate) {
      if (date.date <= checkInDate) {
        setCheckInDateLocal(date.date);
        setCheckOutDateLocal('');
        return;
      }

      if (hasBookedDatesInRange(checkInDate, date.date)) {
        showToast('所选日期范围内有已预订日期', 'none');
        return;
      }

      setCheckOutDateLocal(date.date);
    }
  };

  const getDayClass = (date: RoomCalendar) => {
    const classes = [styles.dayCell];

    if (date.date === checkInDate) {
      classes.push(styles.checkIn);
    } else if (date.date === checkOutDate) {
      classes.push(styles.checkOut);
    } else if (checkInDate && checkOutDate && date.date > checkInDate && date.date < checkOutDate) {
      classes.push(styles.inRange);
    } else if (date.status === 'booked') {
      classes.push(styles.booked);
    } else {
      classes.push(styles.available);
    }

    return classnames(classes);
  };

  const priceCalculation = useMemo(() => {
    if (!checkInDate || !checkOutDate || !room) {
      return { total: 0, nights: 0, dailyPrices: [] };
    }
    return calculateStayTotal(room.price, checkInDate, checkOutDate);
  }, [checkInDate, checkOutDate, room]);

  const handleBookNow = () => {
    if (!checkInDate || !checkOutDate) {
      showToast('请选择入住和离店日期', 'none');
      return;
    }

    if (hasBookedDatesInRange(checkInDate, checkOutDate)) {
      showToast('所选日期范围内有已预订日期', 'none');
      return;
    }

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);
    setGuests(2);

    Taro.navigateTo({
      url: '/pages/bookingConfirm/index'
    });
  };

  const handleContact = () => {
    Taro.makePhoneCall({
      phoneNumber: '400-123-4567'
    });
  };

  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

  if (!room) {
    return (
      <View className={styles.container}>
        <View className={styles.empty}>
          <Text className={styles.emptyIcon}>🏠</Text>
          <Text className={styles.emptyText}>加载中...</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.container}>
      <Swiper
        className={styles.imageSwiper}
        current={currentImage}
        onChange={(e) => setCurrentImage(e.detail.current)}
        autoplay
        circular
      >
        {room.images.map((img: string, idx: number) => (
          <SwiperItem key={idx}>
            <Image className={styles.swiperImage} src={img} mode="aspectFill" />
          </SwiperItem>
        ))}
      </Swiper>
      <View className={styles.swiperIndicator}>
        {currentImage + 1}/{room.images.length}
      </View>

      <ScrollView scrollY>
        <View className={styles.infoCard}>
          <View className={styles.roomHeader}>
            <View>
              <Text className={styles.roomName}>{room.name}</Text>
              <View className={styles.roomTags}>
                <Text className={styles.tag}>{room.bedType}</Text>
                <Text className={styles.tag}>{room.area}㎡</Text>
                <Text className={styles.tag}>{room.floor}</Text>
              </View>
            </View>
          </View>

          <View className={styles.priceSection}>
            <Text className={styles.currentPrice}>¥{formatPrice(room.price)}</Text>
            <Text className={styles.priceUnit}>/晚</Text>
            <Text className={styles.originalPrice}>¥{formatPrice(room.originalPrice)}</Text>
            <Text className={styles.discountTag}>
              {Math.round((room.price / room.originalPrice) * 10)}折
            </Text>
          </View>

          <View className={styles.roomInfoGrid}>
            <View className={styles.infoItem}>
              <Text className={styles.infoIcon}>👥</Text>
              <Text className={styles.infoLabel}>入住人数</Text>
              <Text className={styles.infoValue}>{room.capacity}人</Text>
            </View>
            <View className={styles.infoItem}>
              <Text className={styles.infoIcon}>🛏️</Text>
              <Text className={styles.infoLabel}>床型</Text>
              <Text className={styles.infoValue}>{room.bedType}</Text>
            </View>
            <View className={styles.infoItem}>
              <Text className={styles.infoIcon}>📐</Text>
              <Text className={styles.infoLabel}>面积</Text>
              <Text className={styles.infoValue}>{room.area}㎡</Text>
            </View>
          </View>

          <View className={styles.description}>
            <Text className={styles.sectionTitle}>
              <Text>📝</Text>
              房间介绍
            </Text>
            <Text className={styles.descriptionText}>{room.description}</Text>
          </View>

          <View className={styles.facilities}>
            <Text className={styles.sectionTitle}>
              <Text>🛠️</Text>
              房间设施
            </Text>
            <View className={styles.facilityGrid}>
              {room.facilities.map((facility: string) => (
                <View key={facility} className={styles.facilityItem}>
                  <Text className={styles.facilityIcon}>{facilityIcons[facility] || '✅'}</Text>
                  <Text className={styles.facilityName}>{facility}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className={styles.calendarSection}>
          <View className={styles.calendarHeader}>
            <Text className={styles.calendarTitle}>
              <Text>📅</Text>
              选择日期
            </Text>
            <View className={styles.monthSelector}>
              <View className={styles.monthBtn} onClick={handlePrevMonth}>‹</View>
              <Text className={styles.monthText}>{currentMonth.year}年{currentMonth.month}月</Text>
              <View className={styles.monthBtn} onClick={handleNextMonth}>›</View>
            </View>
          </View>

          <View className={styles.calendarWeekdays}>
            {weekdays.map((day, idx) => (
              <Text
                key={day}
                className={classnames(styles.weekday, { [styles.weekend]: idx === 0 || idx === 6 })}
              >
                {day}
              </Text>
            ))}
          </View>

          <View className={styles.calendarDays}>
            {Array.from({ length: new Date(currentMonth.year, currentMonth.month - 1, 1).getDay() }).map((_, idx) => (
              <View key={`empty-${idx}`} />
            ))}
            {calendar.map((date) => (
              <View
                key={date.date}
                className={getDayClass(date)}
                onClick={() => handleDateClick(date)}
              >
                {date.isHoliday && <View className={styles.holidayMark} />}
                <Text>{new Date(date.date).getDate()}</Text>
                <Text className={styles.dayPrice}>¥{date.price}</Text>
              </View>
            ))}
          </View>

          <View className={styles.calendarLegend}>
            <View className={styles.legendItem}>
              <View className={classnames(styles.legendDot, styles.available)} />
              <Text>可订</Text>
            </View>
            <View className={styles.legendItem}>
              <View className={classnames(styles.legendDot, styles.booked)} />
              <Text>已订</Text>
            </View>
            <View className={styles.legendItem}>
              <View className={classnames(styles.legendDot, styles.selected)} />
              <Text>已选</Text>
            </View>
          </View>
        </View>

        <View className={styles.pricingSection}>
          <Text className={styles.sectionTitle}>
            <Text>💰</Text>
            淡旺季定价
          </Text>
          <View className={styles.pricingList}>
            <View className={styles.pricingItem}>
              <View>
                <Text className={styles.pricingSeason}>{pricingRules.peakSeason.description}</Text>
                <Text className={styles.pricingMonths}>{pricingRules.peakSeason.months.map(m => `${m}月`).join('、')}</Text>
              </View>
              <Text className={styles.pricingMultiplier}>×{pricingRules.peakSeason.priceMultiplier}</Text>
            </View>
            <View className={styles.pricingItem}>
              <View>
                <Text className={styles.pricingSeason}>{pricingRules.shoulderSeason.description}</Text>
                <Text className={styles.pricingMonths}>{pricingRules.shoulderSeason.months.map(m => `${m}月`).join('、')}</Text>
              </View>
              <Text className={styles.pricingMultiplier}>×{pricingRules.shoulderSeason.priceMultiplier}</Text>
            </View>
            <View className={styles.pricingItem}>
              <View>
                <Text className={styles.pricingSeason}>{pricingRules.offSeason.description}</Text>
                <Text className={styles.pricingMonths}>{pricingRules.offSeason.months.map(m => `${m}月`).join('、')}</Text>
              </View>
              <Text className={styles.pricingMultiplier}>×{pricingRules.offSeason.priceMultiplier}</Text>
            </View>
            <View className={styles.pricingItem}>
              <View>
                <Text className={styles.pricingSeason}>周末加价</Text>
                <Text className={styles.pricingMonths}>周五、周六</Text>
              </View>
              <Text className={styles.pricingMultiplier}>+¥{pricingRules.weekendPremium}</Text>
            </View>
            <View className={styles.pricingItem}>
              <View>
                <Text className={styles.pricingSeason}>节假日加价</Text>
                <Text className={styles.pricingMonths}>春节、五一、国庆</Text>
              </View>
              <Text className={styles.pricingMultiplier}>+¥{pricingRules.holidayPremium}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className={styles.bottomBar}>
        <View className={styles.selectedInfo}>
          {checkInDate && checkOutDate ? (
            <>
              <Text className={styles.selectedDates}>
                {checkInDate.slice(5)} 至 {checkOutDate.slice(5)}
                （{priceCalculation.nights}晚）
              </Text>
              <Text className={styles.selectedPrice}>¥{formatPrice(priceCalculation.total)}</Text>
            </>
          ) : (
            <>
              <Text className={styles.selectedDates}>请选择入住日期</Text>
              <Text className={styles.selectedPrice}>¥{formatPrice(room?.price || 0)}起</Text>
            </>
          )}
        </View>
        <View className={styles.actionBtns}>
          <Button className={styles.contactBtn} onClick={handleContact}>
            📞 咨询
          </Button>
          <Button
            className={classnames(styles.bookBtn, { [styles.disabled]: !checkInDate || !checkOutDate })}
            onClick={handleBookNow}
          >
            立即预订
          </Button>
        </View>
      </View>
    </View>
  );
};

export default RoomDetailPage;
