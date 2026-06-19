import React from 'react';
import { View, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from '../../../components/Button';
import { MilestoneCard } from './MilestoneCard';
import { LOYALTY_MILESTONE_RESET } from '../../../constants/config';

interface ProgressTabProps {
  rideCount: number;
  canClaim: boolean;
  onClaim: () => void;
  claiming: boolean;
}

export const ProgressTab: React.FC<ProgressTabProps> = ({ rideCount, canClaim, onClaim, claiming }) => (
  <View style={styles.container}>
    <MilestoneCard rideCount={rideCount} target={LOYALTY_MILESTONE_RESET} />
    {canClaim ? (
      <Button title="Claim Now" onPress={onClaim} loading={claiming} style={styles.claimButton} />
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: hp('2%'),
  },
  claimButton: {
    marginTop: hp('2%'),
  },
});
