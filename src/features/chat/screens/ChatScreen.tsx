import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { MessageBubble } from '../components/MessageBubble';
import { ChatInput } from '../components/ChatInput';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { MainStackParamList } from '../../../types/navigation';

type Rt = RouteProp<MainStackParamList, 'Chat'>;

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isMine: boolean;
}

export const ChatScreen: React.FC = () => {
  const route = useRoute<Rt>();
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), text, timestamp: new Date().toISOString(), isMine: true },
    ]);
  };

  return (
    <ScreenWrapper withKeyboardAvoiding>
      <View style={styles.header}>
        <Text style={styles.headerText}>{route.params.driverName}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <MessageBubble text={item.text} timestamp={item.timestamp} isMine={item.isMine} />}
      />
      <ChatInput onSend={handleSend} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  list: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
  },
});
