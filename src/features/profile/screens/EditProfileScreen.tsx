import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Avatar } from '../../../components/Avatar';
import { useAuthStore } from '../../../store/authStore';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const rider = useAuthStore(s => s.rider);
  const [fullName, setFullName] = useState(rider?.fullName || '');
  const [email, setEmail] = useState(rider?.email || '');
  const [phone, setPhone] = useState(rider?.phone || '');

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <ScreenWrapper withKeyboardAvoiding>
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
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={[styles.backButton, { backgroundColor: 'transparent' }]} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ alignSelf: 'center' }}>
          <Avatar
            uri={rider?.profilePhotoUrl}
            name={rider?.fullName}
            size="lg"
          />
        </View>
        <TouchableOpacity
          style={styles.changePhotoButton}
          accessibilityLabel="Change photo"
        >
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>

        <Input
          variant="filled"
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.fieldSpacer}
        />
        <Input
          variant="filled"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.fieldSpacer}
        />

        <View style={styles.phoneRow}>
          <View style={styles.countryCode}>
            <Text style={styles.flag}>🇺🇸</Text>
            <Text style={styles.countryCodeText}>+1</Text>
            <Icon
              name="expand-more"
              size={wp('4.5%')}
              color={colors.textSecondary}
            />
          </View>
          <View style={styles.phoneDivider} />
          <TextInput
            style={styles.phoneInput}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone Number"
            placeholderTextColor={colors.textHint}
            keyboardType="phone-pad"
            accessibilityLabel="Phone Number"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Save Changes" onPress={handleSave} />
      </View>
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
    paddingTop: hp('2%'),
    paddingBottom: hp('4%'),
    // alignItems: 'center',
  },
  changePhotoButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.round,
    width: '80%',
    paddingVertical: hp('1.6%'),
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
    alignSelf: 'center',
    alignItems: 'center',
  },
  changePhotoText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.md,
    color: colors.white,
  },
  fieldSpacer: {
    width: '100%',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.md,
    height: hp('5.5%'),
    paddingHorizontal: wp('4%'),
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: fontSize.md,
    marginRight: wp('1.5%'),
  },
  countryCodeText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginRight: wp('1%'),
  },
  phoneDivider: {
    width: 1,
    height: '60%',
    backgroundColor: colors.border,
    marginHorizontal: wp('3%'),
  },
  phoneInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  footer: {
    paddingHorizontal: wp('6%'),
    paddingBottom: hp('2%'),
  },
});
