import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from '../../../components/Card';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { formatRideDate } from '../../../utils/formatDate';
import { formatCurrency } from '../../../utils/formatFare';

interface HistoryEntry {
  id: string;
  cycleCompletedAt: string;
  totalSaved: number;
}

interface HistoryTabProps {
  history: HistoryEntry[];
}

export const HistoryTab: React.FC<HistoryTabProps> = ({ history }) => (
  <FlatList
    data={history}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.container}
    ListEmptyComponent={<Text style={styles.empty}>No completed cycles yet</Text>}
    renderItem={({ item }) => (
      <Card style={styles.card}>
        <Text style={styles.date}>Cycle completed {formatRideDate(item.cycleCompletedAt)}</Text>
        <Text style={styles.saved}>Saved {formatCurrency(item.totalSaved)}</Text>
      </Card>
    )}
  />
);

const styles = StyleSheet.create({
  container: {
    paddingTop: hp('2%'),
  },
  card: {
    marginBottom: hp('1.5%'),
  },
  date: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  saved: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.md,
    color: colors.primary,
    marginTop: hp('0.5%'),
  },
  empty: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: hp('6%'),
  },
});
