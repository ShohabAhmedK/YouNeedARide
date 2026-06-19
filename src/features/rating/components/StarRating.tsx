import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';

interface StarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, onChange }) => (
  <View style={styles.row}>
    {[1, 2, 3, 4, 5].map((value) => (
      <TouchableOpacity key={value} onPress={() => onChange(value)} accessibilityLabel={value + ' star'}>
        <Icon
          name={value <= rating ? 'star' : 'star-border'}
          size={wp('10%')}
          color={colors.accentYellow}
          style={styles.star}
        />
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    marginHorizontal: wp('1%'),
  },
});
