import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';

interface ChatCallButtonsProps {
  onChatPress: () => void;
  phoneNumber?: string;
}

export const ChatCallButtons: React.FC<ChatCallButtonsProps> = ({ onChatPress, phoneNumber }) => (
  <View style={styles.row}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => phoneNumber && Linking.openURL('tel:' + phoneNumber)}
      accessibilityLabel="Call driver"
    >
      <Icon name="call" size={wp('5.5%')} color={colors.primary} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onChatPress} accessibilityLabel="Chat with driver">
      <Icon name="chatbubble-ellipses" size={wp('5.5%')} color={colors.primary} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: wp('3%'),
  },
  button: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
