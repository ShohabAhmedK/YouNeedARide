import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';

export type NotificationType = 'ride' | 'payment' | 'reward' | 'document' | 'promo';

export interface NotificationData {
  id: string;
  type: NotificationType;
  title: string;
  subtitle: string;
  time: string;
  read: boolean;
}

interface NotificationItemProps {
  notification: NotificationData;
  onPress: () => void;
  onDelete: () => void;
}

const iconMap: Record<NotificationType, { icon: string; color: string }> = {
  ride: { icon: 'directions-car', color: colors.primary },
  payment: { icon: 'payments', color: colors.accentBlue },
  reward: { icon: 'emoji-events', color: colors.accentYellow },
  document: { icon: 'description', color: colors.error },
  promo: { icon: 'local-offer', color: colors.primary },
};

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onPress, onDelete }) => {
  const swipeableRef = useRef<SwipeableMethods>(null);
  const { icon, color } = iconMap[notification.type];

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      rightThreshold={wp('10%')}
      renderRightActions={() => (
        <TouchableOpacity
          style={styles.deleteAction}
          onPress={() => {
            swipeableRef.current?.close();
            onDelete();
          }}
          accessibilityLabel={'Delete ' + notification.title}
        >
          <Icon name="delete" size={wp('6%')} color={colors.white} />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      )}
    >
      <TouchableOpacity style={styles.row} onPress={onPress} accessibilityLabel={notification.title}>
        <View style={[styles.iconBadge, { backgroundColor: color + '1A' }]}>
          <Icon name={icon} size={wp('5.5%')} color={color} />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.subtitle} numberOfLines={2}>{notification.subtitle}</Text>
          <Text style={styles.time}>{notification.time}</Text>
        </View>
        {!notification.read ? <View style={styles.unreadDot} /> : null}
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('5%'),
  },
  iconBadge: {
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: radius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    marginLeft: wp('3.5%'),
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('0.3%'),
  },
  time: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textHint,
    marginTop: hp('0.5%'),
  },
  unreadDot: {
    width: wp('2.2%'),
    height: wp('2.2%'),
    borderRadius: wp('1.1%'),
    backgroundColor: colors.primary,
    marginLeft: wp('2%'),
    marginTop: hp('0.5%'),
  },
  deleteAction: {
    width: wp('22%'),
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
    color: colors.white,
    marginTop: hp('0.5%'),
  },
});
