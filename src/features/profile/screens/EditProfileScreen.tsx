import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Avatar } from '../../../components/Avatar';
import { useAuthStore } from '../../../store/authStore';

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const rider = useAuthStore((s) => s.rider);
  const [fullName, setFullName] = useState(rider?.fullName || '');
  const [phone, setPhone] = useState(rider?.phone || '');

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <ScreenWrapper withKeyboardAvoiding>
      <ScrollView contentContainerStyle={styles.container}>
        <Avatar uri={rider?.profilePhotoUrl} name={rider?.fullName} size="lg" />
        <Input label="Full Name" value={fullName} onChangeText={setFullName} leftIcon="person" style={styles.inputSpacer} />
        <Input label="Phone Number" value={phone} onChangeText={setPhone} leftIcon="phone" keyboardType="phone-pad" />
        <Button title="Save Changes" onPress={handleSave} style={styles.button} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('4%'),
    alignItems: 'center',
  },
  inputSpacer: {
    marginTop: hp('3%'),
  },
  button: {
    width: '100%',
    marginTop: hp('2%'),
  },
});
