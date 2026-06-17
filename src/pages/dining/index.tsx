import React, { useState, useCallback } from 'react';
import { View, Text, Image, ScrollView, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import styles from './index.module.scss';
import { diningItems, categoryNames, diningTimes } from '@/data/dining';
import { showToast, showModal } from '@/utils';

const categories = [
  { id: 'all', name: '全部' },
  { id: 'breakfast', name: '早餐' },
  { id: 'lunch', name: '午餐' },
  { id: 'dinner', name: '晚餐' },
  { id: 'snack', name: '小吃' }
];

const DiningPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTime, setSelectedTime] = useState('');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [selectedDate, setSelectedDate] = useState('');

  const filteredItems = activeCategory === 'all'
    ? diningItems
    : diningItems.filter(item => item.category === activeCategory);

  const totalCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, count]) => {
    const item = diningItems.find(i => i.id === id);
    return sum + (item?.price || 0) * count;
  }, 0);

  const handleAddToCart = (id: string) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    showToast('已添加', 'success');
  };

  const handleReserve = async () => {
    if (totalCount === 0) {
      showToast('请先选择菜品', 'none');
      return;
    }

    const timeCategory = activeCategory === 'all' ? 'dinner' : activeCategory;
    const times = diningTimes[timeCategory as keyof typeof diningTimes] || diningTimes.dinner;

    const timeStr = times.join('\n');
    const timeIndex = await showModal(
      '选择用餐时间',
      `请选择用餐时间：\n${timeStr}`,
      { confirmText: '下一步', showCancel: true }
    );

    if (timeIndex) {
      const confirmed = await showModal(
        '确认预订',
        `共 ${totalCount} 份菜品，合计 ¥${totalPrice}\n确认提交预订吗？`
      );

      if (confirmed) {
        showToast('预订成功！', 'success');
        setCart({});
        console.log('[Dining] Reservation made:', { cart, totalPrice });
      }
    }
  };

  return (
    <View className={styles.container}>
      <ScrollView scrollY style={{ paddingBottom: 140 }}>
        <View className={styles.categoryTabs}>
          {categories.map((cat) => (
            <View
              key={cat.id}
              className={classnames(styles.tabItem, { [styles.active]: activeCategory === cat.id })}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </View>
          ))}
        </View>

        <View className={styles.diningList}>
          {filteredItems.map((item) => (
            <View key={item.id} className={styles.diningCard}>
              <Image
                className={styles.foodImage}
                src={item.image}
                mode="aspectFill"
                onError={(e) => console.error('[Dining] Image error', e.detail)}
              />
              <View className={styles.foodInfo}>
                <View className={styles.foodHeader}>
                  <Text className={styles.foodName}>{item.name}</Text>
                  {item.isRecommended && (
                    <View className={styles.recommendTag}>推荐</View>
                  )}
                </View>
                <Text className={styles.foodDesc}>{item.description}</Text>
                <View className={styles.foodFooter}>
                  <View className={styles.foodPrice}>
                    <Text className={styles.currency}>¥</Text>
                    <Text className={styles.price}>{item.price}</Text>
                    <Text className={styles.unit}>/份</Text>
                  </View>
                  <Button
                    className={styles.addBtn}
                    onClick={() => handleAddToCart(item.id)}
                  >
                    +
                  </Button>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className={styles.reserveSection}>
        <View className={styles.totalInfo}>
          <Text className={styles.totalLabel}>已选 {totalCount} 份</Text>
          <Text className={styles.totalPrice}>¥{totalPrice}</Text>
        </View>
        <Button className={styles.reserveBtn} onClick={handleReserve}>
          立即预订
        </Button>
      </View>
    </View>
  );
};

export default DiningPage;
