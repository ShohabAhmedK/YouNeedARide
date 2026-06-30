import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Divider } from '../../../components/Divider';
import { SocialLoginButtons } from '../components/SocialLoginButtons';
import { useAuthStore } from '../../../store/authStore';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { AuthStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<AuthStackParamList, 'Login'>;

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const setRider = useAuthStore(s => s.setRider);
  const setToken = useAuthStore(s => s.setToken);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: 'test@test.com', password: '123456' },
  });

  const onSubmit = (data: FormData) => {
    setRider({
      id: 'alpha-rider-1',
      fullName: 'Alpha Rider',
      email: data.email,
      phone: '03118296802',
      savedLocations: [],
      loyaltyRideCount: 0,
      createdAt: new Date().toISOString(),
    });
    setToken('alpha-static-token');
  };

  return (
    <ScreenWrapper withKeyboardAvoiding statusBarStyle="light-content">
      <View
        style={[
          styles.hero,
          { marginTop: -insets.top, paddingTop: insets.top },
        ]}
      >
        <FastImage
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Sign in to your account</Text>
        <Text style={styles.subtitle}>
          Enter your email and password to log in
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <Input
              label="Email"
              placeholder="you@example.com"
              variant="filled"
              autoCapitalize="none"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <Input
              label="Password"
              placeholder="Enter password"
              variant="filled"
              isPassword
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
            />
          )}
        />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>Forgot Password ?</Text>
        </TouchableOpacity>
        <Button
          title="Login"
          onPress={handleSubmit(onSubmit)}
          size="lg"
          style={styles.loginButton}
        />
        <Divider label="Or" style={styles.divider} />
        <SocialLoginButtons />
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.primary,
    height: hp('25%'),
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: wp('38%'),
    height: wp('38%'),
  },
  container: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('4%'),
  },
  title: {
    fontFamily: fontFamily.gilroySemiBold,
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 29,
    letterSpacing: 24 * -0.04,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamily.gilroyMedium,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 12 * -0.04,
    color: colors.textSecondary,
    marginTop: hp('0.8%'),
    marginBottom: hp('2%'),
  },
  forgotText: {
    alignSelf: 'flex-end',
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.primary,
    marginBottom: hp('3%'),
  },
  loginButton: {
    // marginTop: hp('1%'),
  },
  divider: {
    marginVertical: hp('2%'),
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('4%'),
  },
  registerText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  registerLink: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
    color: colors.accentBlue,
  },
});
