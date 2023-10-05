import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from '../theme/colors';
import HomeScreen from '../screens/HomeScreen';
import {
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoUIKitPrebuiltCallWaitingScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const NativeStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          color: colors.white,
          fontWeight: 'bold',
        },
      }}>
      <NativeStack.Screen name="Home" component={HomeScreen} />
      <NativeStack.Screen
        name="ZegoUIKitPrebuiltCallWaitingScreen"
        component={ZegoUIKitPrebuiltCallWaitingScreen}
      />
      <NativeStack.Screen
        name="ZegoUIKitPrebuiltCallInCallScreen"
        component={ZegoUIKitPrebuiltCallInCallScreen}
      />
    </NativeStack.Navigator>
  );
};

export default MainNavigator;
