import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { AuthHeader } from '../components/AuthHeader';
import { useVerifyOtp } from '../../../api/hooks/useAuthApi';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { AuthStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<AuthStackParamList, 'OtpVerify'>;
type Rt = RouteProp<AuthStackParamList, 'OtpVerify'>;

const OTP_LENGTH = 6;

export const OtpVerifyScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const verifyOtp = useVerifyOtp();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [countdown, setCountdown] = useState(30);
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (text: string, index: number) => {
    const next = [...digits];
    next[index] = text.slice(-1);
    setDigits(next);
    if (text && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otp = digits.join('');
    verifyOtp.mutate(
      { email: route.params.email, otp },
      {
        onSuccess: () => {
          navigation.navigate('SetNewPassword', { email: route.params.email, otp });
        },
      },
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <AuthHeader title="Verify Code" subtitle={'Enter the 6-digit code sent to ' + route.params.email} />
        <View style={styles.otpRow}>
          {digits.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputs.current[index] = ref; }}
              style={styles.otpBox}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              accessibilityLabel={'OTP digit ' + (index + 1)}
            />
          ))}
        </View>
        <TouchableOpacity disabled={countdown > 0} onPress={() => setCountdown(30)}>
          <Text style={styles.resendText}>
            {countdown > 0 ? 'Resend code in ' + countdown + 's' : 'Resend Code'}
          </Text>
        </TouchableOpacity>
        <Button title="Verify" onPress={handleVerify} loading={verifyOtp.isPending} style={styles.button} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('8%'),
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('3%'),
  },
  otpBox: {
    width: wp('12%'),
    height: wp('12%'),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    textAlign: 'center',
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  resendText: {
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.primary,
    marginBottom: hp('3%'),
  },
  button: {
    marginTop: hp('1%'),
  },
});
