import React, { useState, useCallback } from 'react';
import { View, Text, Image, ScrollView, Button } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';
import { experiences, categoryNames } from '@/data/experiences';
import { showToast, showModal } from '@/utils';

const categories = [
  { id: 'all', name: '全部', icon: '🎯' },
  { id: 'folk', name: '客家民俗', icon: '🎭' },
  { id: 'tea', name: '采茶制茶', icon: '🍵' },
  { id: 'education', name: '研学接待', icon: '📚' },
  { id: 'festival', name: '节庆活动', icon: '🎉' }
];

const ExperiencePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState<Record<string, string>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handlePullDownRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      console.log('[Experience] Refresh completed');
    }, 1000);
  }, []);

  const filteredExperiences = activeCategory === 'all'
    ? experiences
    : experiences.filter(e => e.category === activeCategory);

  const handleCardClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDateSelect = (experienceId: string, date: string) => {
    setSelectedDates(prev => ({
      ...prev,
      [experienceId]: prev[experienceId] === date ? '' : date
    }));
  };

  const handleBook = async (experience: any) => {
    const selectedDate = selectedDates[experience.id];
    if (!selectedDate) {
      showToast('请先选择日期', 'none');
      return;
    }

    const confirmed = await showModal(
      '确认预约',
      `您确定要预约"${experience.title}"吗？\n日期：${selectedDate}\n价格：¥${experience.price}/人`
    );

    if (confirmed) {
      showToast('预约成功！', 'success');
      console.log('[Experience] Booked:', { experience, selectedDate });
      setSelectedDates(prev => ({ ...prev, [experience.id]: '' }));
      setExpandedId(null);
    }
  };

  return (
    <ScrollView
      className={styles.container}
      scrollY
      enablePullDownRefresh
      onPullDownRefresh={handlePullDownRefresh}
      refresherTriggered={isRefreshing}
    >
      <View className={styles.header}>
        <Text className={styles.title}>客家文化体验</Text>
        <Text className={styles.subtitle}>感受地道客家风情，体验传统民俗文化</Text>
      </View>

      <ScrollView
        className={styles.categoryTabs}
        scrollX
        enhanced
        showScrollbar={false}
      >
        {categories.map((cat) => (
          <View
            key={cat.id}
            className={classnames(styles.tabItem, { [styles.active]: activeCategory === cat.id })}
            onClick={() => setActiveCategory(cat.id)}
          >
            <Text className={styles.icon}>{cat.icon}</Text>
            <Text>{cat.name}</Text>
          </View>
        ))}
      </ScrollView>

      <View className={styles.experienceList}>
        {filteredExperiences.length > 0 ? (
          filteredExperiences.map((experience) => (
            <View
              key={experience.id}
              className={styles.experienceCard}
              onClick={() => handleCardClick(experience.id)}
            >
              <Image
                className={styles.cardImage}
                src={experience.image}
                mode="aspectFill"
                onError={(e) => console.error('[Experience] Image error', e.detail)}
              />
              <View className={styles.cardContent}>
                <View className={styles.cardHeader}>
                  <Text className={styles.cardTitle}>{experience.title}</Text>
                  <View className={styles.cardCategory}>
                    {categoryNames[experience.category]}
                  </View>
                </View>
                <Text className={styles.cardDesc}>{experience.description}</Text>
                <View className={styles.cardMeta}>
                  <View className={styles.metaItem}>
                    <Text className={styles.icon}>⏱️</Text>
                    <Text>{experience.duration}</Text>
                  </View>
                  <View className={styles.metaItem}>
                    <Text className={styles.icon}>👥</Text>
                    <Text>最多{experience.maxParticipants}人</Text>
                  </View>
                </View>

                {expandedId === experience.id && (
                  <View className={styles.dateSection}>
                    <Text className={styles.dateTitle}>📅 可预约日期</Text>
                    <View className={styles.dateList}>
                      {experience.availableDates.map((date) => (
                        <View
                          key={date}
                          className={classnames(styles.dateItem, {
                            [styles.active]: selectedDates[experience.id] === date
                          })}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDateSelect(experience.id, date);
                          }}
                        >
                          {date}
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                <View className={styles.cardFooter}>
                  <View className={styles.cardPrice}>
                    <Text className={styles.currency}>¥</Text>
                    <Text className={styles.price}>{experience.price}</Text>
                    <Text className={styles.unit}>/人</Text>
                  </View>
                  <Button
                    className={styles.bookBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBook(experience);
                    }}
                  >
                    立即预约
                  </Button>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>🎭</Text>
            <Text className={styles.emptyText}>暂无该分类的体验活动</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ExperiencePage;
