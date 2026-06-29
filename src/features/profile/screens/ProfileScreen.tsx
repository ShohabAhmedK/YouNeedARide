import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { ProfileMenuItem } from '../components/ProfileMenuItem';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { useAuthStore } from '../../../store/authStore';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'EditProfile'>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const rider = useAuthStore(s => s.rider);
  const logout = useAuthStore(s => s.logout);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleConfirmLogout = () => {
    setLogoutModalVisible(false);
    logout();
  };

  return (
    <ScreenWrapper>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <Icon
            name="arrow-back"
            size={wp('5.5%')}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={[styles.backButton, { backgroundColor: 'transparent' }]} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileCard}>
          {rider?.profilePhotoUrl ? (
            <FastImage
              source={{ uri: rider.profilePhotoUrl }}
              style={styles.avatar}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <View style={[styles.avatar, styles.avatarFallback]}>
              <Text style={styles.avatarInitials}>
                {rider?.fullName?.charAt(0) || '?'}
              </Text>
            </View>
          )}
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{rider?.fullName || 'Rider'}</Text>
            <Text style={styles.phone}>{rider?.phone}</Text>
            <Text style={styles.email}>{rider?.email}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfile')}
            accessibilityLabel="Edit profile"
          >
            <Icon name="edit" size={wp('5%')} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>Settings</Text>
        <ProfileMenuItem
          icon="badge"
          label="Personal Information"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <ProfileMenuItem
          icon="notifications"
          label="Notification"
          onPress={() => navigation.navigate('Notification')}
        />
        <ProfileMenuItem
          icon="account-balance"
          label="Payment Methods"
          onPress={() => {}}
        />
        <ProfileMenuItem
          icon="support-agent"
          label="Help/Support"
          onPress={() => navigation.navigate('Support')}
        />
      </ScrollView>

      <View style={styles.footer}>
        <ProfileMenuItem
          icon="logout"
          label="Logout"
          onPress={() => setLogoutModalVisible(true)}
          destructive
        />
      </View>

      <ConfirmModal
        visible={logoutModalVisible}
        icon="logout"
        title="Logout"
        message="Are you sure you want to logout of your account?"
        confirmLabel="Logout"
        destructive
        onConfirm={handleConfirmLogout}
        onCancel={() => setLogoutModalVisible(false)}
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
  container: {
    paddingHorizontal: wp('6%'),
    paddingBottom: hp('4%'),
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: wp('4%'),
    marginBottom: hp('3%'),
  },
  avatar: {
    width: wp('16%'),
    height: wp('16%'),
    borderRadius: radius.md,
  },
  avatarFallback: {
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
    color: colors.white,
  },
  profileInfo: {
    flex: 1,
    marginLeft: wp('4%'),
  },
  name: {
    fontFamily: fontFamily.gilroySemiBold,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.64,
    color: colors.white,
  },
  phone: {
    fontFamily: fontFamily.gilroyMedium,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: -0.56,
    color: colors.white,
    marginTop: hp('0.5%'),
  },
  email: {
    fontFamily: fontFamily.gilroyMedium,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: -0.56,
    color: colors.white,
    marginTop: hp('0.2%'),
  },
  editButton: {
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: radius.md,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginBottom: hp('1.5%'),
  },
  footer: {
    paddingHorizontal: wp('6%'),
    paddingBottom: hp('2%'),
  },
});
