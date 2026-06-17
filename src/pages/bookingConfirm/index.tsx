import React, { useState, useMemo } from 'react';
import { View, Text, Image, ScrollView, Button, Input, Textarea } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import styles from './index.module.scss';
import { formatPrice, getDaysDiff, showToast, showModal } from '@/utils';
import { useStore } from '@/store/useStore';
import { refundPolicy } from '@/data/orders';
import { calculateStayTotal, hasBookedDatesInRange, markDatesAsBooked } from '@/data/rooms';

const paymentMethods = [
  { id: 'wechat', name: '微信支付', desc: '推荐使用', icon: '💚' },
  { id: 'alipay', name: '支付宝', desc: '支付宝快捷支付', icon: '💙' },
  { id: 'card', name: '银行卡', desc: '储蓄卡/信用卡', icon: '💳' }
];

const BookingConfirmPage: React.FC = () => {
  const { selectedRoom, checkInDate, checkOutDate, guests, setGuests, addOrder } = useStore();

  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [idCard, setIdCard] = useState('');
  const [remark, setRemark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('wechat');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const priceCalculation = useMemo(() => {
    if (!selectedRoom || !checkInDate || !checkOutDate) {
      return { total: 0, nights: 0, dailyPrices: [] };
    }
    return calculateStayTotal(selectedRoom.price, checkInDate, checkOutDate);
  }, [selectedRoom, checkInDate, checkOutDate]);

  const { total, nights, dailyPrices } = priceCalculation;
  const originalTotal = selectedRoom ? selectedRoom.originalPrice * nights : 0;
  const discount = originalTotal - total;
  const serviceFee = Math.floor(total * 0.02);
  const totalPrice = total + serviceFee;

  const handleGuestsChange = (delta: number) => {
    const newGuests = guests + delta;
    if (newGuests < 1) return;
    if (selectedRoom && newGuests > selectedRoom.capacity) {
      showToast(`最多入住${selectedRoom.capacity}人`, 'none');
      return;
    }
    setGuests(newGuests);
  };

  const validateForm = () => {
    if (!guestName.trim()) {
      showToast('请输入入住人姓名', 'none');
      return false;
    }
    if (!/^1[3-9]\d{9}$/.test(guestPhone)) {
      showToast('请输入正确的手机号', 'none');
      return false;
    }
    if (!idCard.trim()) {
      showToast('请输入身份证号', 'none');
      return false;
    }
    if (!/^\d{17}[\dXx]$/.test(idCard)) {
      showToast('请输入正确的身份证号', 'none');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (!selectedRoom || !checkInDate || !checkOutDate) return;

    if (hasBookedDatesInRange(checkInDate, checkOutDate)) {
      showToast('所选日期范围内有已预订日期，请重新选择', 'none');
      return;
    }

    const confirmed = await showModal(
      '确认预订',
      `您即将预订 ${selectedRoom.name}\n入住：${checkInDate}\n离店：${checkOutDate}\n共计 ${nights} 晚\n总价：¥${formatPrice(totalPrice)}\n\n确认提交订单吗？`
    );

    if (!confirmed) return;

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const orderNo = 'TL' + Date.now().toString().slice(-10);
      const newOrder = {
        id: Date.now().toString(),
        orderNo,
        type: 'room' as const,
        title: selectedRoom.name,
        image: selectedRoom.images[0],
        checkInDate,
        checkOutDate,
        price: totalPrice,
        status: 'confirmed' as const,
        createTime: new Date().toISOString(),
        guestName,
        guestPhone,
        guests,
        remark
      };

      addOrder(newOrder);
      markDatesAsBooked(checkInDate, checkOutDate);

      console.log('[Booking] Order created:', newOrder);

      showToast('预订成功！', 'success');

      setTimeout(() => {
        Taro.switchTab({
          url: '/pages/mine/index'
        });
      }, 1500);
    } catch (error) {
      showToast('预订失败，请重试', 'none');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedRoom || !checkInDate || !checkOutDate) {
    return (
      <View className={styles.container}>
        <View className={styles.emptyState}>
          <Text className={styles.emptyIcon}>📋</Text>
          <Text className={styles.emptyText}>请先选择客房和入住日期</Text>
          <Button className={styles.backBtn} onClick={() => Taro.navigateBack()}>
            返回选择
          </Button>
        </View>
      </View>
    );
  }

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>
          <Text>🏠</Text>
          预订信息
        </Text>
        <View className={styles.roomCard}>
          <Image
            className={styles.roomImage}
            src={selectedRoom.images[0]}
            mode="aspectFill"
          />
          <View className={styles.roomInfo}>
            <View>
              <Text className={styles.roomName}>{selectedRoom.name}</Text>
              <Text className={styles.roomDesc}>
                {selectedRoom.bedType} · {selectedRoom.area}㎡ · {selectedRoom.floor}
              </Text>
            </View>
            <Text className={styles.roomPrice}>¥{formatPrice(roomPrice)}/晚</Text>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>
          <Text>📅</Text>
          入住日期
        </Text>
        <View className={styles.dateSection}>
          <View className={styles.dateInfo}>
            <Text className={styles.dateLabel}>入住日期</Text>
            <Text className={styles.dateValue}>{checkInDate}</Text>
          </View>
          <Text className={styles.dateArrow}>→</Text>
          <View className={styles.dateInfo}>
            <Text className={styles.dateLabel}>离店日期</Text>
            <Text className={styles.dateValue}>{checkOutDate}</Text>
          </View>
        </View>
        <View className={styles.nightsInfo}>
          <Text className={styles.nightsValue}>{nights}</Text>
          <Text className={styles.nightsLabel}>晚</Text>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>
          <Text>👤</Text>
          入住信息
        </Text>

        <View className={styles.formGroup}>
          <Text className={styles.formLabel}>
            <Text className={styles.required}>*</Text>
            入住人姓名
          </Text>
          <Input
            className={styles.formInput}
            placeholder="请输入入住人真实姓名"
            value={guestName}
            onInput={(e) => setGuestName(e.detail.value)}
            maxlength={20}
          />
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.formLabel}>
            <Text className={styles.required}>*</Text>
            手机号码
          </Text>
          <Input
            className={styles.formInput}
            type="number"
            placeholder="请输入手机号"
            value={guestPhone}
            onInput={(e) => setGuestPhone(e.detail.value)}
            maxlength={11}
          />
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.formLabel}>
            <Text className={styles.required}>*</Text>
            身份证号
          </Text>
          <Input
            className={styles.formInput}
            placeholder="请输入身份证号码"
            value={idCard}
            onInput={(e) => setIdCard(e.detail.value)}
            maxlength={18}
          />
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.formLabel}>
            <Text className={styles.required}>*</Text>
            入住人数
          </Text>
          <View className={styles.guestCounter}>
            <Text className={styles.counterLabel}>入住人数（最多{selectedRoom.capacity}人）</Text>
            <View className={styles.counterControls}>
              <View
                className={classnames(styles.counterBtn, { [styles.disabled]: guests <= 1 })}
                onClick={() => handleGuestsChange(-1)}
              >
                -
              </View>
              <Text className={styles.counterValue}>{guests}</Text>
              <View
                className={classnames(styles.counterBtn, { [styles.disabled]: guests >= selectedRoom.capacity })}
                onClick={() => handleGuestsChange(1)}
              >
                +
              </View>
            </View>
          </View>
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.formLabel}>
            特殊要求（选填）
          </Text>
          <Textarea
            className={styles.textarea}
            placeholder="如有特殊要求请在此说明，如：高楼层、无烟房等"
            value={remark}
            onInput={(e) => setRemark(e.detail.value)}
            maxlength={200}
          />
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>
          <Text>💰</Text>
          价格明细
        </Text>
        <View className={styles.priceBreakdown}>
          {dailyPrices.map((item, idx) => (
            <View key={idx} className={styles.priceItem}>
              <Text className={styles.priceLabel}>{item.date.slice(5)} 入住</Text>
              <Text className={styles.priceValue}>¥{formatPrice(item.price)}</Text>
            </View>
          ))}
          <View className={styles.priceItem}>
            <Text className={styles.priceLabel}>房费小计（{nights}晚）</Text>
            <Text className={styles.priceValue}>¥{formatPrice(total)}</Text>
          </View>
          <View className={styles.priceItem}>
            <Text className={styles.priceLabel}>优惠折扣</Text>
            <Text className={classnames(styles.priceValue, styles.discount)}>-¥{formatPrice(Math.max(0, discount))}</Text>
          </View>
          <View className={styles.priceItem}>
            <Text className={styles.priceLabel}>服务费（2%）</Text>
            <Text className={styles.priceValue}>¥{formatPrice(serviceFee)}</Text>
          </View>
        </View>
        <View className={styles.totalRow}>
          <Text className={styles.totalLabel}>应付总额</Text>
          <Text className={styles.totalValue}>¥{formatPrice(totalPrice)}</Text>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>
          <Text>💳</Text>
          支付方式
        </Text>
        <View className={styles.paymentOptions}>
          {paymentMethods.map((method) => (
            <View
              key={method.id}
              className={classnames(styles.paymentOption, { [styles.active]: paymentMethod === method.id })}
              onClick={() => setPaymentMethod(method.id)}
            >
              <Text className={styles.paymentIcon}>{method.icon}</Text>
              <View className={styles.paymentInfo}>
                <Text className={styles.paymentName}>{method.name}</Text>
                <Text className={styles.paymentDesc}>{method.desc}</Text>
              </View>
              <View className={styles.radioCircle}>
                <View className={styles.radioInner} />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.policyCard}>
        <Text className={styles.policyTitle}>
          <Text>📋</Text>
          退订政策
        </Text>
        <Text className={styles.policyText}>
          • 入住前 {refundPolicy.freeCancelHours} 小时前可免费取消
          {'\n'}
          • 入住前 {refundPolicy.partialCancelHours}-{refundPolicy.freeCancelHours} 小时内取消，退款 {refundPolicy.partialCancelRate * 100}%
          {'\n'}
          • 入住前 {refundPolicy.partialCancelHours} 小时内取消，不予退款
        </Text>
      </View>

      <View className={styles.bottomBar}>
        <View className={styles.totalInfo}>
          <Text className={styles.totalLabelBottom}>应付总额</Text>
          <Text className={styles.totalPriceBottom}>¥{formatPrice(totalPrice)}</Text>
        </View>
        <Button
          className={classnames(styles.submitBtn, { [styles.disabled]: isSubmitting })}
          onClick={handleSubmit}
          loading={isSubmitting}
        >
          {isSubmitting ? '提交中...' : '确认预订'}
        </Button>
      </View>
    </ScrollView>
  );
};

export default BookingConfirmPage;
