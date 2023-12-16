import {AppRegistry} from 'react-native';
import {getApps, initializeApp} from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDvOUzOti6cxIM4B4BP7mBVwzdZxCfD-KI',
  authDomain: 'https://news-project1.firebaseio.com/',
  projectId: 'news-project1',
  databaseURL: 'https://news-project1-default-rtdb.firebaseio.com/news',
  storageBucket: 'news-project1.appspot.com',
  messagingSenderId: '425428980343',
  appId: '1:425428980343:android:bce0c855b35d256c9dec72',
};

// Đảm bảo rằng Firebase chỉ khởi tạo một lần
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

// Tiếp tục với các thành phần khác của ứng dụng của bạn
