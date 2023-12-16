import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
// Khởi tạo kết nối Firebase

firebase.initializeApp({
  apiKey: 'AIzaSyDvOUzOti6cxIM4B4BP7mBVwzdZxCfD-KI',
  authDomain: 'https://news-project1.firebaseio.com/',
  projectId: 'news-project1',
  storageBucket: 'news-project1.appspot.com',
  messagingSenderId: '425428980343',
  appId: '1:425428980343:android:bce0c855b35d256c9dec72',
});

export default firebase;
