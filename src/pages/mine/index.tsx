import React, { useMemo } from 'react';
import { View, Text, Image, ScrollView, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { useStore } from '@/store/useStore';
import { showToast, showModal } from '@/utils';

const orderTabs = [
  { icon: '📝', label: '待确认', status: 'pending' },
  { icon: '✅', label: '已确认', status: 'confirmed' },
  { icon: '🏆', label: '已完成', status: 'completed' },
  { icon: '↩️', label: '退款', status: 'refunding' }
];

const menuItems = [
  { icon: '📍', text: '我的收藏', path: '' },
  { icon: '🎫', text: '优惠券', path: '' },
  { icon: '👤', text: '个人信息', path: '' },
  { icon: '📞', text: '联系客服', path: '' },
  { icon: '⚙️', text: '设置', path: '' }
];

const quickLinks = [
  { icon: '🍜', text: '餐饮预订', path: '/pages/dining/index' },
  { icon: '🎉', text: '活动安排', path: '/pages/activities/index' },
  { icon: '↩️', text: '退订处理', path: '/pages/refund/index' },
  { icon: '📊', text: '收益统计', path: '/pages/statistics/index' }
];

const MinePage: React.FC = () => {
  const { userInfo, orders, logout } = useStore();

  const pendingCount = useMemo(() => orders.filter(o => o.status === 'pending').length, [orders]);
  const confirmedCount = useMemo(() => orders.filter(o => o.status === 'confirmed').length, [orders]);
  const completedCount = useMemo(() => orders.filter(o => o.status === 'completed').length, [orders]);
  const refundingCount = useMemo(() => orders.filter(o => o.status === 'refunding').length, [orders]);

  const handleOrderTabClick = (status: string) => {
    console.log('[Mine] Order tab clicked:', status);
  };

  const handleMenuClick = (item: any) => {
    if (item.path) {
      Taro.navigateTo({ url: item.path });
    } else {
      showToast('功能开发中...', 'none');
    }
  };

  const handleQuickLinkClick = (path: string) => {
    Taro.navigateTo({ url: path });
  };

  const handleLogout = async () => {
    const confirmed = await showModal('退出登录', '确定要退出登录吗？');
    if (confirmed) {
      logout();
      showToast('已退出登录', 'success');
    }
  };

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.userHeader}>
        <View className={styles.userInfo}>
          <Image
            className={styles.avatar}
            src={userInfo?.avatar || 'https://picsum.photos/id/1005/100/100'}
            mode="aspectFill"
          />
          <View className={styles.userDetails}>
            <Text className={styles.userName}>{userInfo?.name || '游客'}</Text>
            <Text className={styles.userPhone}>{userInfo?.phone || '未登录'}</Text>
          </View>
        </View>
        <View className={styles.statsRow}>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{orders.length}</Text>
            <Text className={styles.statLabel}>全部订单</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{pendingCount + confirmedCount}</Text>
            <Text className={styles.statLabel}>待入住</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>5</Text>
            <Text className={styles.statLabel}>收藏</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>3</Text>
            <Text className={styles.statLabel}>优惠券</Text>
          </View>
        </View>
      </View>

      <View className={styles.orderSection}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>我的订单</Text>
          <Text className={styles.sectionMore}>查看全部 ›</Text>
        </View>
        <View className={styles.orderTabs}>
          {orderTabs.map((tab, idx) => (
            <View
              key={idx}
              className={styles.orderTab}
              onClick={() => handleOrderTabClick(tab.status)}
            >
              <Text className={styles.tabIcon}>{tab.icon}</Text>
              <Text className={styles.tabLabel}>{tab.label}</Text>
              {idx === 0 && pendingCount > 0 && (
                <View className={styles.tabBadge}>{pendingCount}</View>
              )}
            </View>
          ))}
        </View>
      </View>

      <View className={styles.quickLinks}>
        {quickLinks.map((link, idx) => (
          <View
            key={idx}
            className={styles.quickLink}
            onClick={() => handleQuickLinkClick(link.path)}
          >
            <Text className={styles.linkIcon}>{link.icon}</Text>
            <Text className={styles.linkText}>{link.text}</Text>
          </View>
        ))}
      </View>

      <View className={styles.menuSection}>
        {menuItems.map((item, idx) => (
          <View
            key={idx}
            className={styles.menuItem}
            onClick={() => handleMenuClick(item)}
          >
            <Text className={styles.menuIcon}>{item.icon}</Text>
            <Text className={styles.menuText}>{item.text}</Text>
            <Text className={styles.menuArrow}>›</Text>
          </View>
        ))}
      </View>

      <Button className={styles.logoutBtn} onClick={handleLogout}>
        退出登录
      </Button>
    </ScrollView>
  );
};

export default MinePage;
