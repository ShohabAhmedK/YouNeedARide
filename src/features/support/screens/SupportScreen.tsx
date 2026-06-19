import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Card } from '../../../components/Card';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { MainStackParamList } from '../../../types/navigation';

type Nav = StackNavigationProp<MainStackParamList, 'Faq'>;

export const SupportScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Help Center</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Faq')} accessibilityLabel="View FAQs">
          <Card style={styles.card}>
            <View style={styles.row}>
              <Icon name="quiz" size={wp('6%')} color={colors.primary} />
              <Text style={styles.cardText}>FAQs</Text>
            </View>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity accessibilityLabel="Report an issue">
          <Card style={styles.card}>
            <View style={styles.row}>
              <Icon name="report-problem" size={wp('6%')} color={colors.primary} />
              <Text style={styles.cardText}>Report Issue / Feedback</Text>
            </View>
          </Card>
        </TouchableOpacity>
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
  card: {
    marginBottom: hp('1.5%'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    marginLeft: wp('3%'),
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
});
