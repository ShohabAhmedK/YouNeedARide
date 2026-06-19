import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
      <Text style={[styles.time, isMine ? styles.timeMine : styles.timeTheirs]}>{formatRideTime(timestamp)}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    marginVertical: hp('0.5%'),
  },
  rowMine: {
    alignItems: 'flex-end',
  },
  rowTheirs: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: wp('75%'),
    borderRadius: radius.md,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
  },
  bubbleMine: {
    backgroundColor: colors.primary,
  },
  bubbleTheirs: {
    backgroundColor: colors.backgroundSecondary,
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
  },
  textMine: {
    color: colors.white,
  },
  textTheirs: {
    color: colors.textPrimary,
  },
  time: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    marginTop: hp('0.3%'),
  },
  timeMine: {
    color: colors.white,
    opacity: 0.7,
  },
  timeTheirs: {
    color: colors.textHint,
  },
});
