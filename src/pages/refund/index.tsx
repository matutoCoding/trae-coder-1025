import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Button, Input, Textarea } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';
import { orders, statusMap, refundPolicy } from '@/data/orders';
import { showToast, showModal } from '@/utils';
import { useStore } from '@/store/useStore';

const refundReasons = [
  '行程变更',
  '天气原因',
  '身体不适',
  '价格太贵',
  '找到更好的选择',
  '其他原因'
];

const RefundPage: React.FC = () => {
  const { updateOrderStatus } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedReason, setSelectedReason] = useState('');
  const [remark, setRemark] = useState('');

  const refundableOrders = orders.filter(o =>
    o.status === 'confirmed' || o.status === 'pending' || o.status === 'refunding'
  );

  const calculateRefundAmount = (order: any) => {
    if (order.status === 'refunding') return order.price;
    return Math.floor(order.price * 0.8);
  };

  const handleApplyRefund = (order: any) => {
    setSelectedOrder(order);
    setSelectedReason('');
    setRemark('');
  };

  const handleSubmitRefund = async () => {
    if (!selectedOrder) return;
    if (!selectedReason) {
      showToast('请选择退订原因', 'none');
      return;
    }

    const confirmed = await showModal(
      '确认退订',
      `您确定要申请退订吗？\n预计退款金额：¥${calculateRefundAmount(selectedOrder)}\n退款将在1-3个工作日内原路返回。`
    );

    if (confirmed) {
      updateOrderStatus(selectedOrder.id, 'refunding');
      showToast('退订申请已提交', 'success');
      console.log('[Refund] Applied:', { orderId: selectedOrder.id, reason: selectedReason, remark });
      setSelectedOrder(null);
    }
  };

  const handleCancelRefund = async (order: any) => {
    const confirmed = await showModal(
      '撤销退订',
      '您确定要撤销退订申请吗？'
    );

    if (confirmed) {
      updateOrderStatus(order.id, 'confirmed');
      showToast('已撤销退订申请', 'success');
    }
  };

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.policyCard}>
        <Text className={styles.policyTitle}>
          <Text className={styles.icon}>📋</Text>
          退订政策
        </Text>
        <View className={styles.policyItem}>
          <Text className={styles.bullet}>•</Text>
          <Text className={styles.text}>
            入住前 {refundPolicy.freeCancelHours} 小时前可免费取消，全额退款
          </Text>
        </View>
        <View className={styles.policyItem}>
          <Text className={styles.bullet}>•</Text>
          <Text className={styles.text}>
            入住前 {refundPolicy.partialCancelHours}-{refundPolicy.freeCancelHours} 小时内取消，退款 {refundPolicy.partialCancelRate * 100}%
          </Text>
        </View>
        <View className={styles.policyItem}>
          <Text className={styles.bullet}>•</Text>
          <Text className={styles.text}>
            入住前 {refundPolicy.partialCancelHours} 小时内取消，不予退款
          </Text>
        </View>
      </View>

      {selectedOrder && (
        <View className={styles.refundForm}>
          <Text className={styles.formTitle}>申请退订</Text>

          <View className={styles.formGroup}>
            <Text className={styles.label}>退订订单</Text>
            <View className={styles.input}>
              <Text>{selectedOrder.title}</Text>
            </View>
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.label}>退订原因</Text>
            <View className={styles.reasonOptions}>
              {refundReasons.map((reason) => (
              <View
                key={reason}
                className={classnames(styles.reasonOption, { [styles.active]: selectedReason === reason })}
                onClick={() => setSelectedReason(reason)}
              >
                {reason}
              </View>
            )}
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.label}>补充说明（选填）</Text>
            <Textarea
              className={styles.textarea}
              placeholder="请输入补充说明..."
              value={remark}
              onInput={(e) => setRemark(e.detail.value)}
              maxlength={200}
            />
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.label}>预计退款金额</Text>
            <Text className={styles.input} style={{ color: '#E65100', fontWeight: 'bold' }}>
              ¥{calculateRefundAmount(selectedOrder)}
            </Text>
          </View>
        </View>
      )}

      <View className={styles.orderList}>
        {refundableOrders.length > 0 ? (
          refundableOrders.map((order) => (
          <View key={order.id} className={styles.orderCard}>
            <View className={styles.orderHeader}>
              <Text className={styles.orderNo}>订单号：{order.orderNo}</Text>
              <Text className={classnames(styles.orderStatus, styles[order.status]}>
                {statusMap[order.status].text}
              </Text>
            </View>

            <View className={styles.orderContent}>
              <Image
                className={styles.orderImage}
                src={order.image}
                mode="aspectFill"
              />
              <View className={styles.orderInfo}>
                <Text className={styles.orderTitle}>{order.title}</Text>
                <Text className={styles.orderDate}>
                  {order.checkInDate || order.date} {order.time || ''}
                </Text>
                <Text className={styles.orderPrice}>¥{order.price}</Text>
              </View>
            </View>

            <View className={styles.orderFooter}>
              <Text className={styles.refundAmount}>
              预计退款：<Text className={styles.amount}>¥{calculateRefundAmount(order)}</Text>
              </Text>
              {order.status === 'refunding' ? (
                <Button
                  className={classnames(styles.refundBtn, styles.secondary)}
                  onClick={() => handleCancelRefund(order)}
                >
                  撤销申请
                </Button>
              ) : (
                <Button
                  className={classnames(styles.refundBtn, styles.primary)}
                  onClick={() => handleApplyRefund(order)}
                >
                  申请退订
                </Button>
              )}
            </View>
          </View>
        ))
      ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>↩️</Text>
            <Text className={styles.emptyText}>暂无可退订的订单</Text>
          </View>
        )}
      </View>

      {selectedOrder && (
        <Button className={styles.submitBtn} onClick={handleSubmitRefund}>
          提交退订申请
        </Button>
      )}
    </ScrollView>
  );
};

export default RefundPage;
