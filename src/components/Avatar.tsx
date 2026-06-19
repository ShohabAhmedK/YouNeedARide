import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../theme/colors';
import { fontFamily, fontSize } from '../theme/typography';

type Size = 'sm' | 'md' | 'lg';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: Size;
  showOnlineIndicator?: boolean;
}

const sizeMap: Record<Size, number> = {
  sm: wp('10%'),
  md: wp('14%'),
  lg: wp('22%'),
};

const getInitials = (name?: string): string => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({ uri, name, size = 'md', showOnlineIndicator }) => {
  const dimension = sizeMap[size];

  return (
    <View style={{ width: dimension, height: dimension }}>
      {uri ? (
        <FastImage
          source={{ uri }}
          style={[styles.image, { width: dimension, height: dimension, borderRadius: dimension / 2 }]}
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            { width: dimension, height: dimension, borderRadius: dimension / 2 },
          ]}
        >
          <Text style={[styles.initials, { fontSize: dimension * 0.35 }]}>{getInitials(name)}</Text>
        </View>
      )}
      {showOnlineIndicator ? (
        <View style={[styles.onlineDot, { width: dimension * 0.28, height: dimension * 0.28, borderRadius: dimension * 0.14 }]} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#F0F0F0',
  },
  fallback: {
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: fontFamily.semiBold,
    color: colors.primaryDark,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.white,
  },
});
