import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { RideHistoryCard } from '../components/RideHistoryCard';
import { useRideHistory } from '../../../api/hooks/useRideApi';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'RideDetail'>;

export const RideHistoryScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { data: rides, isLoading } = useRideHistory();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Ride History</Text>
        <FlatList
          data={rides || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RideHistoryCard ride={item} onPress={() => navigation.navigate('RideDetail', { rideId: item.id })} />
          )}
          ListEmptyComponent={!isLoading ? <Text style={styles.empty}>No rides yet</Text> : null}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('3%'),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: hp('2%'),
  },
  empty: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: hp('10%'),
  },
});
