import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { AuthHeader } from '../components/AuthHeader';
import { useResetPassword } from '../../../api/hooks/useAuthApi';
import { AuthStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<AuthStackParamList, 'SetNewPassword'>;
type Rt = RouteProp<AuthStackParamList, 'SetNewPassword'>;

const schema = z
  .object({
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export const SetNewPasswordScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const resetPassword = useResetPassword();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const onSubmit = (data: FormData) => {
    resetPassword.mutate(
      { email: route.params.email, otp: route.params.otp, newPassword: data.newPassword },
      {
        onSuccess: () => {
          navigation.navigate('Login');
        },
      },
    );
  };

  return (
    <ScreenWrapper withKeyboardAvoiding>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <AuthHeader title="Set New Password" subtitle="Your old password will be invalidated" />
        <Controller
          control={control}
          name="newPassword"
          render={({ field: { value, onChange } }) => (
            <Input label="New Password" placeholder="Enter new password" leftIcon="lock" isPassword value={value} onChangeText={onChange} error={errors.newPassword?.message} />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <Input label="Confirm Password" placeholder="Re-enter password" leftIcon="lock" isPassword value={value} onChangeText={onChange} error={errors.confirmPassword?.message} />
          )}
        />
        <Button title="Update Password" onPress={handleSubmit(onSubmit)} loading={resetPassword.isPending} style={styles.button} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('8%'),
  },
  button: {
    marginTop: hp('1%'),
  },
});
