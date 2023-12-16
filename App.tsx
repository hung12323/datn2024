// import * as React from 'react';
// import LoginScreen from './Screen/LoginScreen';
// import Login from './Screen/Explore';
// import {Index} from './Screen';
// import haha from './haha';
// import Screen from './Screen';
// import testapi from './testapi';
// import onboading from './onboading';

// function App(): JSX.Element {
//   return <Index />;
// }
// export default haha;
import LoginScreen from './Screen/LoginScreen';
import Login from './Screen/Explore';
import {Index} from './Screen';
import apii from './apii';
import Screen from './Screen';
import testapi from './testapi';
import onboading from './onboading';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {View} from 'react-native';

function App(): JSX.Element {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('Token = ', token);
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);

  return <Index />;
}
export default App;
