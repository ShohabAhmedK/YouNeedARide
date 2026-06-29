import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { NotificationItem, NotificationData } from '../components/NotificationItem';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';

const seedNotifications: NotificationData[] = [
  {
    id: '1',
    type: 'ride',
    title: 'Driver Assigned',
    subtitle: 'Abram Mango is on the way to your pickup location.',
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment Successful',
    subtitle: 'Your payment of $42.00 has been processed.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'reward',
    title: 'Milestone Reward Earned',
    subtitle: 'You unlocked a 50% discount on your next ride.',
    time: 'Today',
    read: true,
  },
  {
    id: '4',
    type: 'document',
    title: 'Document Expiring Soon',
    subtitle: 'Your insurance document expires in 5 days.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '5',
    type: 'promo',
    title: 'Weekend Offer',
    subtitle: 'Get 20% off your next 3 rides this weekend.',
    time: '2 days ago',
    read: true,
  },
];

export const NotificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<NotificationData[]>(seedNotifications);

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePress = (id: string) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  return (
    <ScreenWrapper>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} accessibilityLabel="Go back">
          <Icon name="arrow-back" size={wp('5.5%')} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setNotifications([])}
          accessibilityLabel="Clear all notifications"
        >
          <Icon name="done-all" size={wp('5%')} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={() => handlePress(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="notifications-none" size={wp('14%')} color={colors.textHint} />
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('1%'),
    paddingBottom: hp('1.5%'),
  },
  backButton: {
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: radius.round,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  list: {
    flexGrow: 1,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: wp('5%') + wp('11%') + wp('3.5%'),
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp('15%'),
  },
  emptyText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textHint,
    marginTop: hp('1.5%'),
  },
});
