import React, { useState, useCallback } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';
import { introductions, surroundingSpots, reviews } from '@/data/introduction';
import { generateStars } from '@/utils';

const tabs = [
  { id: 'history', name: '历史', icon: '📜' },
  { id: 'architecture', name: '建筑', icon: '🏛️' },
  { id: 'culture', name: '文化', icon: '🎭' },
  { id: 'surrounding', name: '周边', icon: '🗺️' }
];

const scoreItems = [
  { label: '环境', value: '4.9' },
  { label: '服务', value: '4.8' },
  { label: '位置', value: '4.7' },
  { label: '性价比', value: '4.8' }
];

const IntroductionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handlePullDownRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      console.log('[Introduction] Refresh completed');
    }, 1000);
  }, []);

  const currentIntroduction = introductions.find(i => i.category === activeTab);

  const handleSpotClick = (spot: any) => {
    console.log('[Introduction] Spot clicked', spot.name);
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
        <Image
          className={styles.headerImage}
          src="https://picsum.photos/id/1018/750/500"
          mode="aspectFill"
          onError={(e) => console.error('[Introduction] Header image error', e.detail)}
        />
        <View className={styles.headerOverlay}>
          <Text className={styles.headerTitle}>福建土楼民宿</Text>
          <Text className={styles.headerSubtitle}>世界文化遗产 · 客家文化瑰宝</Text>
        </View>
      </View>

      <View className={styles.scoreSection}>
        <View className={styles.scoreHeader}>
          <Text className={styles.scoreNumber}>4.8</Text>
          <View className={styles.scoreInfo}>
            <Text className={styles.scoreLabel}>综合评分</Text>
            <Text className={styles.scoreStars}>{generateStars(4.8)}</Text>
            <Text className={styles.scoreCount}>156条真实评价</Text>
          </View>
        </View>
        <View className={styles.scoreItems}>
          {scoreItems.map((item, idx) => (
            <View key={idx} className={styles.scoreItem}>
              <Text className={styles.itemLabel}>{item.label}</Text>
              <Text className={styles.itemValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.tabBar}>
        {tabs.map((tab) => (
          <View
            key={tab.id}
            className={classnames(styles.tabItem, { [styles.active]: activeTab === tab.id })}
            onClick={() => setActiveTab(tab.id)}
          >
            <Text>{tab.icon} {tab.name}</Text>
          </View>
        ))}
      </View>

      <View className={styles.contentSection}>
        {currentIntroduction && (
          <View className={styles.introCard}>
            <Text className={styles.cardTitle}>
              <Text className={styles.icon}>{tabs.find(t => t.id === activeTab)?.icon}</Text>
              {currentIntroduction.title}
            </Text>
            <Image
              className={styles.cardImage}
              src={currentIntroduction.images[0]}
              mode="aspectFill"
            />
            <Text className={styles.cardContent}>{currentIntroduction.content}</Text>
            {currentIntroduction.images.length > 1 && (
              <View className={styles.imageGallery}>
                {currentIntroduction.images.slice(1).map((img, idx) => (
                  <Image
                    key={idx}
                    className={styles.galleryImage}
                    src={img}
                    mode="aspectFill"
                  />
                ))}
              </View>
            )}
          </View>
        )}

        {activeTab === 'surrounding' && (
          <>
            <Text className={styles.sectionTitle}>
              <Text className={styles.icon}>📍</Text>
              周边景点
            </Text>
            <View className={styles.spotList}>
              {surroundingSpots.map((spot) => (
                <View
                  key={spot.id}
                  className={styles.spotCard}
                  onClick={() => handleSpotClick(spot)}
                >
                  <Image
                    className={styles.spotImage}
                    src={spot.image}
                    mode="aspectFill"
                  />
                  <View className={styles.spotInfo}>
                    <Text className={styles.spotName}>{spot.name}</Text>
                    <Text className={styles.spotDesc}>{spot.description}</Text>
                    <View className={styles.spotMeta}>
                      <Text className={styles.spotDistance}>
                        🚗 {spot.distance} · {spot.duration}
                      </Text>
                      <Text className={styles.spotPrice}>{spot.ticketPrice}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        <Text className={styles.sectionTitle}>
          <Text className={styles.icon}>💬</Text>
          客人评价 ({reviews.length})
        </Text>

        <View className={styles.reviewList}>
          {reviews.map((review) => (
            <View key={review.id} className={styles.reviewCard}>
              <View className={styles.reviewHeader}>
                <Image
                  className={styles.reviewAvatar}
                  src={review.avatar}
                  mode="aspectFill"
                />
                <View className={styles.reviewInfo}>
                  <Text className={styles.reviewerName}>{review.guestName}</Text>
                  <Text className={styles.reviewRating}>
                    {generateStars(review.rating)}
                  </Text>
                </View>
                <Text className={styles.reviewDate}>{review.createTime}</Text>
              </View>
              <Text className={styles.reviewContent}>{review.content}</Text>
              {review.images.length > 0 && (
                <View className={styles.reviewImages}>
                  {review.images.map((img, idx) => (
                    <Image
                      key={idx}
                      className={styles.reviewImage}
                      src={img}
                      mode="aspectFill"
                    />
                  ))}
                </View>
              )}
              {review.reply && (
                <View className={styles.reviewReply}>
                  <Text className={styles.replyTitle}>📝 民宿回复</Text>
                  <Text className={styles.replyContent}>{review.reply}</Text>
                  {review.replyTime && (
                    <Text className={styles.replyTime}>{review.replyTime}</Text>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default IntroductionPage;
