import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';
import {
  dailyStatistics,
  monthlyStatistics,
  summaryData,
  revenueByType,
  roomTypeStatistics,
  topGuestSources,
  peakSeasonForecast
} from '@/data/statistics';
import { formatPrice } from '@/utils';

const StatisticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'day' | 'month'>('day');
  const [activeSection, setActiveSection] = useState<'revenue' | 'room' | 'source'>('revenue');

  const chartData = activeTab === 'day' ? dailyStatistics.slice(-10) : monthlyStatistics;
  const maxRevenue = Math.max(...chartData.map(d => 'revenue' in d ? d.revenue : d.totalRevenue));
  const maxBookings = Math.max(...chartData.map(d => 'bookings' in d ? d.bookings : d.totalBookings));

  const getBarHeight = (value: number, max: number) => {
    return `${(value / max) * 250 + 20}rpx`;
  };

  const sectionTabs = [
    { key: 'revenue', label: '收入构成' },
    { key: 'room', label: '房型统计' },
    { key: 'source', label: '客源分布' }
  ];

  const renderAnalysisContent = () => {
    switch (activeSection) {
      case 'revenue':
        return (
          <View className={styles.statList}>
            {revenueByType.map((item) => (
              <View key={item.type} className={styles.statItem}>
                <View className={styles.statInfo}>
                  <Text className={styles.statName}>{item.type}</Text>
                  <View className={styles.statBar}>
                    <View
                      className={styles.statBarFill}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </View>
                  <Text className={styles.statSub}>占比 {item.percentage}%</Text>
                </View>
                <Text className={styles.statValue}>¥{formatPrice(item.amount)}</Text>
              </View>
            ))}
          </View>
        );
      case 'room':
        return (
          <View className={styles.statList}>
            {roomTypeStatistics.map((item) => (
              <View key={item.name} className={styles.statItem}>
                <View className={styles.statInfo}>
                  <Text className={styles.statName}>{item.name}</Text>
                  <View className={styles.statBar}>
                    <View
                      className={styles.statBarFill}
                      style={{ width: `${(item.bookings / 35) * 100}%` }}
                    />
                  </View>
                  <Text className={styles.statSub}>预订 {item.bookings} 间夜</Text>
                </View>
                <Text className={styles.statValue}>¥{formatPrice(item.revenue)}</Text>
              </View>
            ))}
          </View>
        );
      case 'source':
        return (
          <View className={styles.statList}>
            {topGuestSources.map((item) => (
              <View key={item.source} className={styles.statItem}>
                <View className={styles.statInfo}>
                  <Text className={styles.statName}>{item.source}</Text>
                  <View className={styles.statBar}>
                    <View
                      className={styles.statBarFill}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </View>
                  <Text className={styles.statSub}>占比 {item.percentage}%</Text>
                </View>
                <Text className={styles.statValue}>{item.count} 人</Text>
              </View>
            ))}
          </View>
        );
    }
  };

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.summaryCard}>
        <Text className={styles.summaryTitle}>
          <Text>📊</Text>
          经营概览
        </Text>
        <View className={styles.summaryGrid}>
          <View className={styles.summaryItem}>
            <Text className={styles.summaryValue}>¥{formatPrice(summaryData.todayRevenue)}</Text>
            <Text className={styles.summaryLabel}>今日收入</Text>
          </View>
          <View className={styles.summaryItem}>
            <Text className={styles.summaryValue}>{summaryData.todayBookings}</Text>
            <Text className={styles.summaryLabel}>今日预订</Text>
          </View>
          <View className={styles.summaryItem}>
            <Text className={styles.summaryValue}>{summaryData.todayOccupancy}%</Text>
            <Text className={styles.summaryLabel}>入住率</Text>
          </View>
        </View>
      </View>

      <View className={styles.quickStats}>
        <View className={styles.quickStatCard}>
          <Text className={styles.quickStatLabel}>本月收入</Text>
          <Text className={classnames(styles.quickStatValue, styles.primary)}>
            ¥{formatPrice(summaryData.monthRevenue)}
          </Text>
          <Text className={styles.quickStatTrend}>↑ 12.5%</Text>
        </View>
        <View className={styles.quickStatCard}>
          <Text className={styles.quickStatLabel}>本月预订</Text>
          <Text className={styles.quickStatValue}>{summaryData.monthBookings} 间</Text>
          <Text className={styles.quickStatTrend}>↑ 8.3%</Text>
        </View>
        <View className={styles.quickStatCard}>
          <Text className={styles.quickStatLabel}>本年收入</Text>
          <Text className={classnames(styles.quickStatValue, styles.primary)}>
            ¥{formatPrice(summaryData.yearRevenue)}
          </Text>
          <Text className={styles.quickStatTrend}>↑ 15.2%</Text>
        </View>
        <View className={styles.quickStatCard}>
          <Text className={styles.quickStatLabel}>平均评分</Text>
          <Text className={styles.quickStatValue}>
            {summaryData.avgRating} ⭐
          </Text>
          <Text className={styles.quickStatTrend}>{summaryData.totalReviews} 条评价</Text>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text>📈</Text>
            收入趋势
          </Text>
          <View className={styles.tabs}>
            <Text
              className={classnames(styles.tab, { [styles.tabActive]: activeTab === 'day' })}
              onClick={() => setActiveTab('day')}
            >
              近10天
            </Text>
            <Text
              className={classnames(styles.tab, { [styles.tabActive]: activeTab === 'month' })}
              onClick={() => setActiveTab('month')}
            >
              近6月
            </Text>
          </View>
        </View>

        <View className={styles.chartContainer}>
          <View className={styles.chartBars}>
            {chartData.map((item, index) => {
              const revenue = 'revenue' in item ? item.revenue : item.totalRevenue;
              const bookings = 'bookings' in item ? item.bookings : item.totalBookings;
              const label = 'date' in item ? item.date : item.month;

              return (
                <View
                  key={index}
                  className={styles.chartBar}
                  style={{ height: getBarHeight(revenue, maxRevenue) }}
                >
                  <Text className={styles.chartBarValue}>
                    {revenue >= 1000 ? `${(revenue / 1000).toFixed(1)}k` : revenue}
                  </Text>
                  <Text className={styles.chartBarLabel}>{label}</Text>
                </View>
              );
            })}
          </View>

          <View className={styles.legend}>
            <View className={styles.legendItem}>
              <View className={classnames(styles.legendDot, styles.revenue)} />
              <Text>收入</Text>
            </View>
            <View className={styles.legendItem}>
              <View className={classnames(styles.legendDot, styles.bookings)} />
              <Text>预订量</Text>
            </View>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text>📋</Text>
            数据分析
          </Text>
          <View className={styles.tabs}>
            {sectionTabs.map((tab) => (
              <Text
                key={tab.key}
                className={classnames(styles.tab, { [styles.tabActive]: activeSection === tab.key })}
                onClick={() => setActiveSection(tab.key as any)}
              >
                {tab.label}
              </Text>
            ))}
          </View>
        </View>
        {renderAnalysisContent()}
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text>🔮</Text>
            旺季预测
          </Text>
        </View>
        <View className={styles.forecastList}>
          {peakSeasonForecast.map((item) => (
            <View key={item.month} className={styles.forecastItem}>
              <Text className={styles.forecastMonth}>{item.month}</Text>
              <View className={styles.forecastBars}>
                <View className={styles.forecastBarRow}>
                  <Text className={styles.forecastBarLabel}>收入</Text>
                  <View className={styles.forecastBar}>
                    <View
                      className={classnames(styles.forecastBarFill, styles.revenue)}
                      style={{ width: `${(item.expectedRevenue / 320000) * 100}%` }}
                    />
                  </View>
                  <Text className={classnames(styles.forecastValue, styles.revenue)}>
                    ¥{formatPrice(item.expectedRevenue)}
                  </Text>
                </View>
                <View className={styles.forecastBarRow}>
                  <Text className={styles.forecastBarLabel}>预订</Text>
                  <View className={styles.forecastBar}>
                    <View
                      className={classnames(styles.forecastBarFill, styles.bookings)}
                      style={{ width: `${(item.expectedBookings / 260) * 100}%` }}
                    />
                  </View>
                  <Text className={classnames(styles.forecastValue, styles.bookings)}>
                    {item.expectedBookings} 间
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text>⏰</Text>
            待处理事项
          </Text>
        </View>
        <View className={styles.metricGrid}>
          <View className={styles.metricCard}>
            <Text className={styles.metricValue}>{summaryData.pendingOrders}</Text>
            <Text className={styles.metricLabel}>待确认订单</Text>
          </View>
          <View className={styles.metricCard}>
            <Text className={styles.metricValue}>{summaryData.pendingRefunds}</Text>
            <Text className={styles.metricLabel}>待处理退款</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default StatisticsPage;
