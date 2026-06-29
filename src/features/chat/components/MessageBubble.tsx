import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { formatRideTime } from '../../../utils/formatDate';

interface MessageBubbleProps {
  text: string;
  timestamp: string;
  isMine: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ text, timestamp, isMine }) => (
  <View style={[styles.row, isMine ? styles.rowMine : styles.rowTheirs]}>
    <View style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleTheirs]}>
      <Text style={[styles.text, isMine ? styles.textMine : styles.textTheirs]}>{text}</Text>
      <View style={styles.metaRow}>
        <Text style={[styles.time, isMine ? styles.timeMine : styles.timeTheirs]}>{formatRideTime(timestamp)}</Text>
        {isMine ? <Icon name="checkmark-done" size={wp('3.5%')} color={colors.white} style={styles.check} /> : null}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    marginVertical: hp('0.6%'),
  },
  rowMine: {
    alignItems: 'flex-end',
  },
  rowTheirs: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: wp('75%'),
    borderRadius: radius.lg,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.2%'),
  },
  bubbleMine: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: radius.sm,
  },
  bubbleTheirs: {
    backgroundColor: colors.backgroundSecondary,
    borderBottomLeftRadius: radius.sm,
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
  },
  textMine: {
    color: colors.white,
  },
  textTheirs: {
    color: colors.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.4%'),
  },
  time: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
  },
  timeMine: {
    color: colors.white,
    opacity: 0.8,
  },
  timeTheirs: {
    color: colors.textHint,
  },
  check: {
    marginLeft: wp('1%'),
    opacity: 0.8,
  },
});
