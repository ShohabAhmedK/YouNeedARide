import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { PaymentMethod } from '../../../types/payment';

interface PaymentMethodCardProps {
  method: PaymentMethod;
  selected: boolean;
  onPress: () => void;
}

const iconMap: Record<PaymentMethod['type'], string> = {
  credit_card: 'credit-card',
  debit_card: 'credit-card',
  cash: 'attach-money',
};

export const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ method, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.card, selected && styles.cardSelected]}
    onPress={onPress}
    accessibilityLabel={method.type + (method.last4 ? ' ending ' + method.last4 : '')}
  >
    <Icon name={iconMap[method.type]} size={wp('6%')} color={selected ? colors.primary : colors.textSecondary} />
    <View style={styles.info}>
      <Text style={styles.label}>
        {method.type === 'cash' ? 'Cash' : (method.brand || 'Card') + ' •••• ' + method.last4}
      </Text>
      {method.isDefault ? <Text style={styles.defaultText}>Default</Text> : null}
    </View>
    {selected ? <Icon name="check-circle" size={wp('5.5%')} color={colors.primary} /> : null}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: wp('4%'),
    marginBottom: hp('1.5%'),
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  info: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  defaultText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textHint,
  },
});
