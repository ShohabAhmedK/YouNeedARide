import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Button } from '../../../components/Button';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { AuthStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<AuthStackParamList, 'RoleSelect'>;

type Role = 'rider' | 'driver';

export const RoleSelectScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [role, setRole] = useState<Role>('rider');

  const handleContinue = () => {
    navigation.replace('Login');
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>How will you use the app?</Text>
        <TouchableOpacity
          style={[styles.card, role === 'rider' && styles.cardSelected]}
          onPress={() => setRole('rider')}
          accessibilityLabel="I'm a Rider"
        >
          <Icon name="person" size={wp('8%')} color={role === 'rider' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.cardText, role === 'rider' && styles.cardTextSelected]}>I'm a Rider</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, role === 'driver' && styles.cardSelected]}
          onPress={() => setRole('driver')}
          accessibilityLabel="I'm a Driver"
        >
          <Icon name="directions-car" size={wp('8%')} color={role === 'driver' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.cardText, role === 'driver' && styles.cardTextSelected]}>I'm a Driver</Text>
        </TouchableOpacity>
        <Button title="Continue" onPress={handleContinue} style={styles.continueButton} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('6%'),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
    color: colors.textPrimary,
    marginBottom: hp('4%'),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: wp('5%'),
    marginBottom: hp('2%'),
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  cardText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    marginLeft: wp('4%'),
  },
  cardTextSelected: {
    color: colors.primaryDark,
  },
  continueButton: {
    marginTop: hp('4%'),
  },
});
