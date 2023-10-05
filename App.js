import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import {ZegoCallInvitationDialog} from '@zegocloud/zego-uikit-prebuilt-call-rn';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <ZegoCallInvitationDialog />
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
