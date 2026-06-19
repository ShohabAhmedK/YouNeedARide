import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { AuthHeader } from '../components/AuthHeader';
import { useForgotPassword } from '../../../api/hooks/useAuthApi';
import { AuthStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

const schema = z.object({
  email: z.string().email('Enter a valid email'),
});

type FormData = z.infer<typeof schema>;

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const forgotPassword = useForgotPassword();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: FormData) => {
    forgotPassword.mutate(data, {
      onSuccess: () => {
        navigation.navigate('OtpVerify', { email: data.email });
      },
    });
  };

  return (
    <ScreenWrapper withKeyboardAvoiding>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <AuthHeader title="Forgot Password" subtitle="Enter your email to receive a reset code" />
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <Input label="Email" placeholder="you@example.com" leftIcon="email" autoCapitalize="none" keyboardType="email-address" value={value} onChangeText={onChange} error={errors.email?.message} />
          )}
        />
        <Button title="Send Reset Code" onPress={handleSubmit(onSubmit)} loading={forgotPassword.isPending} style={styles.button} />
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
