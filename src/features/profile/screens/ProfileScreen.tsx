import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Avatar } from '../../../components/Avatar';
import { ProfileMenuItem } from '../components/ProfileMenuItem';
import { useAuthStore } from '../../../store/authStore';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'EditProfile'>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const rider = useAuthStore((s) => s.rider);
  const logout = useAuthStore((s) => s.logout);

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} accessibilityLabel="Edit profile photo">
            <Avatar uri={rider?.profilePhotoUrl} name={rider?.fullName} size="lg" />
            <View style={styles.editBadge}>
              <Icon name="edit" size={wp('3.5%')} color={colors.white} />
            </View>
          </TouchableOpacity>
          <Text style={styles.name}>{rider?.fullName}</Text>
          <Text style={styles.email}>{rider?.email}</Text>
          <Text style={styles.phone}>{rider?.phone}</Text>
        </View>
        <ProfileMenuItem icon="person" label="Personal Information" onPress={() => navigation.navigate('EditProfile')} />
        <ProfileMenuItem icon="notifications" label="Notifications" onPress={() => {}} />
        <ProfileMenuItem icon="payment" label="Payment Methods" onPress={() => {}} />
        <ProfileMenuItem icon="help" label="Help/Support" onPress={() => navigation.navigate('Support')} />
        <ProfileMenuItem icon="logout" label="Logout" onPress={logout} destructive />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('4%'),
  },
  header: {
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: wp('6%'),
    height: wp('6%'),
    borderRadius: wp('3%'),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  name: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginTop: hp('1.5%'),
  },
  email: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: hp('0.3%'),
  },
  phone: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});
