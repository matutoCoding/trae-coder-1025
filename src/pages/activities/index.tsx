import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Button } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';
import { activities } from '@/data/activities';
import { showToast, showModal } from '@/utils';

const statusMap: Record<string, { text: string; className: string }> = {
  upcoming: { text: '即将开始', className: 'upcoming' },
  ongoing: { text: '进行中', className: 'ongoing' },
  ended: { text: '已结束', className: 'ended' }
};

const filters = [
  { id: 'all', name: '全部' },
  { id: 'upcoming', name: '即将开始' },
  { id: 'ongoing', name: '进行中' },
  { id: 'ended', name: '已结束' }
];

const ActivitiesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredActivities = activeFilter === 'all'
    ? activities
    : activities.filter(a => a.status === activeFilter);

  const handleJoin = async (activity: any) => {
    if (activity.status === 'ended') {
      showToast('该活动已结束', 'none');
      return;
    }

    if (activity.participants >= activity.maxParticipants) {
      showToast('该活动名额已满', 'none');
      return;
    }

    const confirmed = await showModal(
      '确认报名',
      `您确定要报名参加"${activity.title}"吗？\n时间：${activity.date} ${activity.time}\n地点：${activity.location}\n${activity.price > 0 ? `费用：¥${activity.price}/人` : '费用：免费'}`
    );

    if (confirmed) {
      showToast('报名成功！', 'success');
      console.log('[Activities] Joined:', activity);
    }
  };

  return (
    <ScrollView className={styles.container} scrollY>
      <ScrollView
        className={styles.filterTabs}
        scrollX
        enhanced
        showScrollbar={false}
      >
        {filters.map((filter) => (
          <View
            key={filter.id}
            className={classnames(styles.tabItem, { [styles.active]: activeFilter === filter.id })}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.name}
          </View>
        ))}
      </ScrollView>

      <View className={styles.activityList}>
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => {
            const statusInfo = statusMap[activity.status];
            const progress = (activity.participants / activity.maxParticipants) * 100;

            return (
              <View key={activity.id} className={styles.activityCard}>
                <Image
                  className={styles.activityImage}
                  src={activity.image}
                  mode="aspectFill"
                  onError={(e) => console.error('[Activities] Image error', e.detail)}
                />
                <View className={styles.activityContent}>
                  <View className={styles.activityHeader}>
                    <Text className={styles.activityTitle}>{activity.title}</Text>
                    <View className={classnames(styles.activityStatus, styles[statusInfo.className])}>
                      {statusInfo.text}
                    </View>
                  </View>

                  <Text className={styles.activityDesc}>{activity.description}</Text>

                  <View className={styles.activityMeta}>
                    <View className={styles.metaItem}>
                      <Text className={styles.icon}>📅</Text>
                      <Text>{activity.date}</Text>
                    </View>
                    <View className={styles.metaItem}>
                      <Text className={styles.icon}>⏰</Text>
                      <Text>{activity.time}</Text>
                    </View>
                    <View className={styles.metaItem}>
                      <Text className={styles.icon}>📍</Text>
                      <Text>{activity.location}</Text>
                    </View>
                  </View>

                  <View className={styles.activityProgress}>
                    <View
                      className={styles.progressBar}
                      style={{ width: `${progress}%` }}
                    />
                  </View>
                  <Text className={styles.progressText}>
                    已报名 {activity.participants}/{activity.maxParticipants} 人
                  </Text>

                  <View className={styles.activityFooter}>
                    <View className={styles.activityPrice}>
                      {activity.price > 0 ? (
                        <>
                          <Text className={styles.currency}>¥</Text>
                          <Text className={styles.price}>{activity.price}</Text>
                          <Text className={styles.unit}>/人</Text>
                        </>
                      ) : (
                        <Text className={styles.free}>免费</Text>
                      )}
                    </View>
                    <Button
                      className={styles.joinBtn}
                      onClick={() => handleJoin(activity)}
                      disabled={activity.status === 'ended' || activity.participants >= activity.maxParticipants}
                    >
                      {activity.status === 'ended' ? '已结束' :
                       activity.participants >= activity.maxParticipants ? '已满员' : '立即报名'}
                    </Button>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>🎉</Text>
            <Text className={styles.emptyText}>暂无相关活动</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ActivitiesPage;
