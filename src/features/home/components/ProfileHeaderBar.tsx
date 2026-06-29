import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Avatar } from '../../../components/Avatar';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';

interface ProfileHeaderBarProps {
  name?: string;
  photoUrl?: string;
  onPress: () => void;
}

export const ProfileHeaderBar: React.FC<ProfileHeaderBarProps> = ({ name, photoUrl, onPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.hero, { paddingTop: insets.top + hp('2%') }]}>
      <TouchableOpacity style={styles.row} onPress={onPress} accessibilityLabel="View profile">
        <Avatar uri={photoUrl} name={name} size="md" />
        <View style={styles.textColumn}>
          <Text style={styles.name} numberOfLines={1}>{name || 'Rider'}</Text>
          <Text style={styles.link}>View Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: wp('6%'),
    paddingBottom: hp('1%'),
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textColumn: {
    marginLeft: wp('4%'),
    flex: 1,
  },
  name: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.white,
  },
  link: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.white,
    opacity: 0.85,
    marginTop: hp('0.3%'),
  },
});
