import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import Head from '../Head';
import firebase from '../UploadNews/firebase';

function Notification(): JSX.Element {
  const [notificationData, setNotificationData] = useState([]);
  const [newsData, setNewsData] = useState(null);
  const newsRef = firebase.database().ref('data');
  const [refreshing, setRefreshing] = useState(false); // Thêm state refreshing

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const snapshot = await newsRef.once('value');
        const data = snapshot.val();
        setNewsData(data);
      } catch (error) {
        console.log('Error fetching news data:', error);
      }
    };

    fetchNewsData();
  }, []);

  const navigation = useNavigation();

  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } catch (error) {
      console.log('Error requesting user permission:', error);
    }
  };

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('Token:', token);

      const data = {
        token: token,
        title: 'Your title here',
        image: 'URL of your image here'
      };

      // Do something with the data...
    } catch (error) {
      console.log('Error getting token:', error);
    }
  };

  const listenForNewNotification = () => {
    try {
      database()
        .ref('data')
        .on('child_added', (snapshot) => {
          const data = snapshot.val();
          setNotificationData(prevData => [data, ...prevData]); // Thêm thông báo mới vào đầu mảng
        });
    } catch (error) {
      console.log('Error listening for new notification:', error);
    }
  };

  const handleNotificationPress = (notification, title, content, image) => {
    // Xử lý khi nhấp vào thông báo
    navigation.navigate('Detail1', { notification, title, content, image });
  };

  const handleDeleteNotification = (notification) => {
    // Xóa thông báo khỏi danh sách
    setNotificationData(prevData => prevData.filter(item => item !== notification));

    // Thực hiện các hành động khác khi xóa thông báo
    // ...
  };

  const onRefresh = async () => {
    setRefreshing(true); // Bắt đầu refresh
  
    try {
      const snapshot = await newsRef.once('value');
      const data = snapshot.val();
      setNewsData(data);
    } catch (error) {
      console.log('Error fetching news data:', error);
    }

    setRefreshing(false); // Kết thúc refresh
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
    listenForNewNotification();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="gray" />
      <View style={{ flexDirection: 'row' }}>
        <Head />
        <Text
          style={{
            marginTop: 60,
            marginLeft: -210,
            fontSize: 20,
            color: 'black',
            marginBottom: 10,
          }}>
          Notification
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Sử dụng RefreshControl để kích hoạt chức năng refresh
        }
      >
        <View>
          {notificationData.length === 0 ? (
            <Text style={styles.noNotificationText}>Bạn chưa có thông báo nào.</Text>
          ) : (
            notificationData.map((notification, index) => (
              <TouchableOpacity
                style={styles.notificationContainer}
                key={index}
                onPress={() => handleNotificationPress(notification, notification.title, notification.content, notification.image)}
              >
                <Text style={styles.notificationTitle}>{notification.category}</Text>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Image source={{ uri: notification.image }} style={styles.notificationImage} />
                <TouchableOpacity onPress={() => handleDeleteNotification(notification)}>
                  <Text style={{marginTop:7,color:'black'}}>Xóa</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
    notificationContainer: {
    backgroundColor: 'white',
    padding: 16,
    margin: 10,
    borderRadius: 8,
    },
    notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black'
    },
    notificationImage: {
    width: '100%',
    height: 200,
    },
    noNotificationText:{
    // marginHorizontal:130,
    marginLeft:90,
    color:'black',
    marginTop:320,
    fontSize:18
    }
});

export default Notification;