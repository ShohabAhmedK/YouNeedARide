import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../theme/colors';
import { fontFamily, fontSize } from '../theme/typography';
import { radius } from '../theme/spacing';
import { heavyShadow } from '../theme/shadows';
import { PaymentMethod } from '../types/payment';

interface PaymentMethodSheetProps {
  visible: boolean;
  onClose: () => void;
  methods: PaymentMethod[];
  selectedId?: string;
  onSelect: (method: PaymentMethod) => void;
}

const getLabel = (method: PaymentMethod): string => {
  if (method.type === 'cash') return 'Cash';
  return method.brand || (method.type === 'credit_card' ? 'Credit Card' : 'Debit Card');
};

const getSubtitle = (method: PaymentMethod): string | undefined => {
  if (method.type === 'cash' || !method.last4) return undefined;
  return (method.type === 'credit_card' ? 'Credit' : 'Debit') + ' •••• ' + method.last4;
};

const PaymentBadge: React.FC<{ method: PaymentMethod }> = ({ method }) => {
  if (method.type === 'cash') {
    return (
      <View style={[styles.badge, styles.cashBadge]}>
        <Icon name="payments" size={wp('5%')} color={colors.primary} />
      </View>
    );
  }
  if (method.brand?.toLowerCase() === 'visa') {
    return (
      <View style={[styles.badge, styles.visaBadge]}>
        <Text style={styles.visaText}>VISA</Text>
      </View>
    );
  }
  return (
    <View style={[styles.badge, styles.cardBadge]}>
      <View style={styles.mastercardCircleRed} />
      <View style={styles.mastercardCircleYellow} />
    </View>
  );
};

export const PaymentMethodSheet: React.FC<PaymentMethodSheetProps> = ({
  visible,
  onClose,
  methods,
  selectedId,
  onSelect,
}) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Select Payment Method</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose} accessibilityLabel="Close">
            <Icon name="close" size={wp('5%')} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {methods.map((method) => {
          const selected = method.id === selectedId;
          const subtitle = getSubtitle(method);
          return (
            <TouchableOpacity
              key={method.id}
              style={[styles.option, selected && styles.optionSelected]}
              onPress={() => onSelect(method)}
              accessibilityLabel={getLabel(method)}
            >
              <PaymentBadge method={method} />
              <View style={styles.optionInfo}>
                <Text style={styles.optionLabel}>{getLabel(method)}</Text>
                {subtitle ? <Text style={styles.optionSubtitle}>{subtitle}</Text> : null}
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.handle} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('2.5%'),
    paddingBottom: hp('3%'),
    ...heavyShadow,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  closeButton: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: radius.round,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.lg,
    padding: wp('4%'),
    marginBottom: hp('1.5%'),
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  optionInfo: {
    marginLeft: wp('3%'),
  },
  optionLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  optionSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textHint,
    marginTop: hp('0.2%'),
  },
  badge: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: radius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cashBadge: {
    backgroundColor: colors.primaryLight,
  },
  cardBadge: {
    backgroundColor: colors.white,
    flexDirection: 'row',
  },
  mastercardCircleRed: {
    width: wp('4.2%'),
    height: wp('4.2%'),
    borderRadius: wp('2.1%'),
    backgroundColor: '#EB001B',
    marginRight: -wp('1.6%'),
  },
  mastercardCircleYellow: {
    width: wp('4.2%'),
    height: wp('4.2%'),
    borderRadius: wp('2.1%'),
    backgroundColor: '#F79E1B',
    opacity: 0.9,
  },
  visaBadge: {
    backgroundColor: colors.backgroundSecondary,
  },
  visaText: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xs,
    color: '#1A1F71',
  },
  handle: {
    alignSelf: 'center',
    width: wp('30%'),
    height: hp('0.5%'),
    borderRadius: radius.round,
    backgroundColor: colors.textPrimary,
    marginTop: hp('1%'),
  },
});
