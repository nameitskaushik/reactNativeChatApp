import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import firestore from '@react-native-firebase/firestore';
import useAuth from '../store/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../theme/colors';

const HomeScreen = ({navigation}) => {
  const user = useAuth(state => state.user);
  const setUser = useAuth(state => state.setUser);

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    initService();
    getUsers();
  }, [user]);

  const getUsers = async () => {
    const usersDocs = await firestore()
      .collection('users')
      .where('email', '!=', user.email)
      .get();
    const users = [];
    usersDocs.forEach(userDoc => {
      users.push({
        id: userDoc.id,
        ...userDoc.data(),
      });
    });
    setContacts(users);
  };

  const AppId = '275891832';
  const AppSign =
    'df640127fe42a2ea596911fd0197d5032c027eab801dd24fc663df3260285c30';

  const initService = async () => {
    ZegoUIKitPrebuiltCallService.init(
      275891832,
      'df640127fe42a2ea596911fd0197d5032c027eab801dd24fc663df3260285c30',
      user.id,
      user.username,
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.wav',
          outgoingCallFileName: 'zego_outgoing.wav',
        },
        notifyWhenAppRunningInBackgroundOrQuit: true,
        isIOSSandboxEnvironment: true,
        androidNotificationConfig: {
          channelID: 'zego_video_call',
          channelName: 'zego_video_call',
        },
        requireConfig: data => {
          return {
            onHangUp: duration => {
              console.log('########CallWithInvitation onHangUp', duration);
              navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
            },
          };
        },
      },
    );
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
    ZegoUIKitPrebuiltCallService.uninit();
    navigation.reset({
      index: 0,
      routes: [{name: 'Auth'}],
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({item}) => (
          <View style={styles.contact}>
            <Text style={styles.username}>{item.username}</Text>
            <View style={styles.actionBtns}>
              <ZegoSendCallInvitationButton
                invitees={[{userID: item.id, userName: item.username}]}
                isVideoCall={false}
                resourceID={'reactNativeChatApp_Data'}
                color={colors.primary}
              />
              <ZegoSendCallInvitationButton
                invitees={[{userID: item.id, userName: item.username}]}
                isVideoCall={true}
                resourceID={'reactNativeChatApp'}
                color={colors.primary}
              />
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicato={false}
        contentContainerStyle={styles.flatlistContentContainer}
      />
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  actionBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contact: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  flatlistContentContainer: {
    width: width,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
