import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Avatar } from '../../../components/Avatar';
import { MessageBubble } from '../components/MessageBubble';
import { ChatInput } from '../components/ChatInput';
import { colors } from '../../../theme/colors';
import { fontFamily, fontSize } from '../../../theme/typography';
import { radius } from '../../../theme/spacing';
import { MainStackParamList } from '../../../types/navigation';

type Rt = RouteProp<MainStackParamList, 'Chat'>;

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isMine: boolean;
}

const seedMessages: Message[] = [
  { id: '1', text: 'Hello, when will you arrive?', timestamp: new Date().toISOString(), isMine: true },
  { id: '2', text: 'Hi, I have arrived to your location', timestamp: new Date().toISOString(), isMine: false },
  { id: '3', text: 'OK', timestamp: new Date().toISOString(), isMine: true },
];

export const ChatScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<Rt>();
  const [messages, setMessages] = useState<Message[]>(seedMessages);

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), text, timestamp: new Date().toISOString(), isMine: true },
    ]);
  };

  return (
    <ScreenWrapper withKeyboardAvoiding backgroundColor={colors.primary} statusBarStyle="light-content">
      <View style={styles.header}>
        <TouchableOpacity style={[styles.iconButton,{marginRight:5}]} onPress={() => navigation.goBack()} accessibilityLabel="Go back">
          <Icon name="arrow-back" size={wp('5.5%')} color={colors.textPrimary} />
        </TouchableOpacity>

        <Avatar name={route.params.driverName} size="sm" />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{route.params.driverName}</Text>
          <Text style={styles.headerSubtitle}>View Profile</Text>
        </View>
        <TouchableOpacity style={styles.iconButton} accessibilityLabel="Call driver">
          <Icon name="call" size={wp('5%')} color={colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, styles.lastIconButton]} accessibilityLabel="More options">
          <Icon name="more-vert" size={wp('5.5%')} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.dateSeparator}>
            <Text style={styles.dateSeparatorText}>Today</Text>
          </View>
        }
        renderItem={({ item }) => <MessageBubble text={item.text} timestamp={item.timestamp} isMine={item.isMine} />}
      />
      <ChatInput onSend={handleSend} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  iconButton: {
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: radius.round,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastIconButton: {
    marginLeft: wp('2%'),
  },
  headerInfo: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  headerName: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.white,
  },
  headerSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.white,
    opacity: 0.85,
    marginTop: hp('0.2%'),
  },
  dateSeparator: {
    alignSelf: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.round,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('0.6%'),
    marginBottom: hp('1.5%'),
  },
  dateSeparatorText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  list: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    backgroundColor: colors.white,
    flexGrow: 1,
  },
});
