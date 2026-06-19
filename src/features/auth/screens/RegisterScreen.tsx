import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { AuthHeader } from '../components/AuthHeader';
import { useRegister } from '../../../api/hooks/useAuthApi';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { AuthStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<AuthStackParamList, 'Register'>;

const schema = z
  .object({
    fullName: z.string().min(2, 'Enter your full name'),
    email: z.string().email('Enter a valid email'),
    phone: z.string().min(7, 'Enter a valid phone number'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const register = useRegister();
  const [agreed, setAgreed] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '', phone: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (data: FormData) => {
    register.mutate(data, {
      onSuccess: () => {
        navigation.navigate('OtpVerify', { email: data.email });
      },
    });
  };

  return (
    <ScreenWrapper withKeyboardAvoiding>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <AuthHeader title="Create Account" subtitle="Sign up to start riding" />
        <Controller
          control={control}
          name="fullName"
          render={({ field: { value, onChange } }) => (
            <Input label="Full Name" placeholder="John Doe" leftIcon="person" value={value} onChangeText={onChange} error={errors.fullName?.message} />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <Input label="Email" placeholder="you@example.com" leftIcon="email" autoCapitalize="none" keyboardType="email-address" value={value} onChangeText={onChange} error={errors.email?.message} />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { value, onChange } }) => (
            <Input label="Phone Number" placeholder="+1 555 000 1234" leftIcon="phone" keyboardType="phone-pad" value={value} onChangeText={onChange} error={errors.phone?.message} />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <Input label="Password" placeholder="Create password" leftIcon="lock" isPassword value={value} onChangeText={onChange} error={errors.password?.message} />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <Input label="Confirm Password" placeholder="Re-enter password" leftIcon="lock" isPassword value={value} onChangeText={onChange} error={errors.confirmPassword?.message} />
          )}
        />
        <TouchableOpacity style={styles.checkboxRow} onPress={() => setAgreed((a) => !a)} accessibilityLabel="Agree to terms">
          <Icon name={agreed ? 'check-box' : 'check-box-outline-blank'} size={wp('5%')} color={agreed ? colors.primary : colors.textHint} />
          <Text style={styles.checkboxText}>I agree to the Terms of Service and Privacy Policy</Text>
        </TouchableOpacity>
        <Button title="Register" onPress={handleSubmit(onSubmit)} loading={register.isPending} disabled={!agreed} style={styles.registerButton} />
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('6%'),
    paddingBottom: hp('4%'),
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  checkboxText: {
    flex: 1,
    marginLeft: wp('2%'),
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  registerButton: {
    marginBottom: hp('2%'),
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  loginLink: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
    color: colors.primary,
  },
});
