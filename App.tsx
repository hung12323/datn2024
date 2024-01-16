// import React, { useEffect, useState } from 'react';
// import { View, Alert } from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// import database from '@react-native-firebase/database';
// import { Index } from './Screen';

// function App(): JSX.Element {
//   const [notificationData, setNotificationData] = useState(null);

//   async function requestUserPermission() {
//     try {
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;
 
//       if (enabled) {
//         console.log('Authorization status:', authStatus);
//       }
//     } catch (error) {
//       console.log('Error requesting user permission:', error);
//     }
//   }


//   const getToken = async () => {
//     try {
//       const token = await messaging().getToken();
//       console.log('Token:', token);

//       const data = {
//         token: token,
//         title: 'Your title here',
//         image: 'URL of your image here'
//       };


//     } catch (error) {
//       console.log('Error getting token:', error);
//     }
//   };

//   const listenForNewNotification = () => {
//     try {
//       database()
//         .ref('data')
//         .on('child_added', (snapshot) => {
//           const data = snapshot.val();
//           setNotificationData(data);
//           showAlert(data.title, data.image);
//         });
//     } catch (error) {
//       console.log('Error listening for new notification:', error);
//     }
//   };

//   const showAlert = (title, image) => {
//     Alert.alert(title,  '', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
//     // You can customize the alert as per your requirement
//   };

//   useEffect(() => {
//     requestUserPermission();
//     getToken();
//     listenForNewNotification();
//   }, []);

//   return <Index notificationData={notificationData} />;
// }

// export default App;




// import React, { useEffect, useState } from 'react';
// import { View } from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// import database from '@react-native-firebase/database';
// import { Index } from './Screen';

// function App(): JSX.Element {
//   const [notificationData, setNotificationData] = useState(null);

//   async function requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//     }
//   }

//   const saveDataToFirebase = async (data) => {
//     try {
//       await database().ref('data').push(data);
//       // console.log('Data saved to Firebase:', data);
//     } catch (error) {
//       console.log('Error saving data to Firebase:', error);
//     }
//   };

//   const getToken = async () => {
//     try {
//       const token = await messaging().getToken();
//       console.log('Token:', token);

//       const data = {
//         token: token,
//         title: 'Your title here',
//         image: 'URL of your image here'
//       };

//       saveDataToFirebase(data);
//     } catch (error) {
//       console.log('Error getting token:', error);
//     }
//   };

//   const listenForNewNotification = () => {
//     database()
//       .ref('data')
//       .on('child_added', (snapshot) => {
//         const data = snapshot.val();
//         setNotificationData(data);
//       });
//   };

//   useEffect(() => {
//     requestUserPermission();
//     getToken();
//     listenForNewNotification();
//   }, []);

//   return <Index notificationData={notificationData} />;
// }

// export default App;

// import * as React from 'react';
// import LoginScreen from './Screen/LoginScreen';
// import Login from './Screen/Explore';
// import {Index} from './Screen';
// import haha from './haha';
// import Screen from './Screen';
// import testapi from './testapi';
// import onboading from './onboading';

// function App(): JSX.Element {
// return <Index />;
// }
// export default haha;

import { Index } from './Screen';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

function App(): JSX.Element {
const requestUserPermission = async () => {
const authStatus = await messaging().requestPermission();
const enabled =
authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
authStatus === messaging.AuthorizationStatus.PROVISIONAL;

if (enabled) {
  console.log('Authorization status:', authStatus);
}
};

const getToken = async () => {
const token = await messaging().getToken();
console.log('Token = ', token);
};

const setBackgroundMessageHandler = async () => {
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
console.log('Received background message:', remoteMessage);
// Handle the background message here
});
};

useEffect(() => {
const initializeApp = async () => {
await requestUserPermission();
await getToken();
await setBackgroundMessageHandler();
};

initializeApp();
}, []);

return <Index />;
}

export default App;