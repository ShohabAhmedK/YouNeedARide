import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { FaqItem } from '../components/FaqItem';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';

const faqs = [
  { question: 'How do I request a ride?', answer: 'Set your pickup and destination on the Home screen, review the fare, and tap Request Ride.' },
  { question: 'How is the fare calculated?', answer: 'Fare is based on base fare, distance rate, and a platform fee, shown before you confirm your ride.' },
  { question: 'How does the loyalty program work?', answer: 'Every 50 rides unlocks a discount on your next ride, and the cycle resets after 100 rides.' },
  { question: 'What payment methods are supported?', answer: 'Credit cards, debit cards, and cash depending on availability in your area.' },
];

export const FaqScreen: React.FC = () => (
  <ScreenWrapper>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      {faqs.map((faq, index) => (
        <FaqItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </ScrollView>
  </ScreenWrapper>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('4%'),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: hp('2%'),
  },
});
