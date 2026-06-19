import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Modal } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../theme/colors';
import { fontFamily, fontSize } from '../theme/typography';

interface LoaderProps {
  visible: boolean;
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ visible, message }) => {
  if (!visible) return null;
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <ActivityIndicator size="large" color={colors.primary} />
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: colors.white,
    borderRadius: wp('3%'),
    padding: wp('6%'),
    alignItems: 'center',
    minWidth: wp('40%'),
  },
  message: {
    marginTop: wp('3%'),
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
});
