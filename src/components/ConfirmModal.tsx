import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../theme/colors';
import { fontFamily, fontSize } from '../theme/typography';
import { radius } from '../theme/spacing';
import { heavyShadow } from '../theme/shadows';
import { Button } from './Button';

interface ConfirmModalProps {
  visible: boolean;
  icon?: string;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  icon = 'logout',
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancel',
  destructive,
  onConfirm,
  onCancel,
}) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onCancel} />
      <View style={styles.card}>
        <View style={[styles.iconBadge, destructive && styles.iconBadgeDestructive]}>
          <Icon name={icon} size={wp('7%')} color={destructive ? colors.error : colors.primary} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.actionsRow}>
          <View style={styles.buttonWrapper}>
            <Button title={cancelLabel} variant="outline" onPress={onCancel} style={styles.fullWidthButton} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title={confirmLabel}
              onPress={onConfirm}
              style={destructive ? styles.confirmButtonDestructive : styles.fullWidthButton}
            />
          </View>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  card: {
    width: wp('85%'),
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: wp('6%'),
    alignItems: 'center',
    ...heavyShadow,
  },
  iconBadge: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: radius.round,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },
  iconBadgeDestructive: {
    backgroundColor: colors.error + '1A',
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginBottom: hp('1%'),
  },
  message: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  actionsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: wp('3%'),
  },
  buttonWrapper: {
    flex: 1,
  },
  fullWidthButton: {
    width: '100%',
  },
  confirmButtonDestructive: {
    width: '100%',
    backgroundColor: colors.error,
  },
});
