import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import firebase from '../UploadNews/firebase';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Head from '../Head';
const Output = () => {
  const [newsData, setNewsData] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    // Lắng nghe sự thay đổi dữ liệu từ Firebase Realtime Database
    const newsRef = firebase.database().ref('news1');
    newsRef.on('value', snapshot => {
      const data = snapshot.val();
      setNewsData(data);
    });

    // Clean up: Hủy lắng nghe khi component bị unmount
    return () => {
      newsRef.off();
    };
  }, []);
  const navigateToDetail = (title, content, image, time, image1) => {
    // Chuyển đến màn hình chi tiết và truyền dữ liệu tin tức
    navigation.navigate('Detail1', {title, content, image});
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="gray" />
      <View style={{flexDirection: 'row'}}>
        <Head />
        <Text
          style={{
            marginTop: 60,
            marginLeft: -200,
            fontSize: 20,
            color: 'black',
            marginBottom: 10,
          }}>
          Sport
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {newsData && (
          <View>
            {Object.keys(newsData).map(key => (
              <TouchableOpacity
                key={key}
                onPress={() =>
                  navigateToDetail(
                    newsData[key].title,
                    newsData[key].content,
                    newsData[key].image,
                    newsData[key].image1,
                    newsData[key].time,
                  )
                }>
                <View>
                  <Image
                    source={{uri: newsData[key].image}}
                    style={styles.image}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 250,
                      marginBottom: -10,
                    }}>
                    <Image
                      source={{uri: newsData[key].image1}}
                      style={{height: 20, width: 80, marginTop: -2}}
                    />
                    <Text>{newsData[key].time}</Text>
                  </View>
                  <View style={styles.rightItem}>
                    <Text style={styles.title} numberOfLines={2}>
                      {newsData[key].title}
                    </Text>
                    <Text style={styles.description} numberOfLines={4}>
                      {newsData[key].content}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  articleContainer: {
    marginBottom: 1,
    // backgroundColor: 'white',
  },

  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    // marginTop: 20,
    color: 'black',
    marginTop: 10,
  },
  contentContainer: {
    flexGrow: 1,
  },
  rightItem: {
    marginTop: 10,
    flexDirection: 'column',
    marginHorizontal: 20,
    flex: 1,
    marginBottom: -20,
  },
  list: {
    flexDirection: 'row',
  },
  description: {
    marginBottom: 50,
    color: 'black',
    marginEnd: 10,
  },
  image: {
    width: '90%',
    height: 200,
    marginHorizontal: 17,
    marginVertical: 15,
  },
  image1: {
    width: '88%',
    height: 150,
    marginHorizontal: 17,
    marginVertical: 15,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 350,
    marginTop: 20,
    marginHorizontal: 'auto',
    marginLeft: 20,
  },
  Trending: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  head: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  anh1: {
    marginLeft: 30,
    marginTop: 50,
  },
  anh2: {
    marginLeft: 210,
    marginTop: 60,
  },
  text1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  text2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Output;
