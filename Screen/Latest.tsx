import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Head from './Head';
import firebase from './UploadNews/firebase';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
const Latest = () => {
  const [newsData, setNewsData] = useState(null);
  const navigation = useNavigation();
  const [image1Color, setImage1Color] = useState('gray');
  const [image3Color, setImage3Color] = useState('gray');
  useEffect(() => {
    // Lắng nghe sự thay đổi dữ liệu từ Firebase Realtime Database
    const newsRef = firebase.database().ref('news');
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
  const handleSaveBookmark = (newsKey) => {
    // Thực hiện lưu tin tức vào trang bookmark
    const bookmarkRef = firebase.database().ref('bookmark').child(newsKey);
    bookmarkRef.set(newsData[newsKey]);
    console.log('Lưu tin tức vào trang bookmark: ', newsKey);
    changeImageColor(3);

  };
  const changeImageColor = imageNumber => {
    const newColor = '#ff0000';
    const newColor1 = '#1877F2';

    switch (imageNumber) {
      case 1:
        if (image1Color === newColor) {
          setImage1Color('gray');
        } else {
          setImage1Color(newColor);
        }
        break;
      case 3:
        if (image3Color === newColor1) {
          setImage3Color('gray');
        } else {
          setImage3Color(newColor1);
        }
        break;
      default:
        break;
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="gray" />
      <Head />
      <View style={styles.text2}>
        <Text
          style={{
            color: 'black',
            fontSize: 22,
            fontWeight: 'bold',
            marginLeft: 20,
          }}>
          Latest
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Latest')}>
          <Text
            style={{
              color: 'black',
              marginLeft: 235,
              fontSize: 13,
            }}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.text1}>
        <TouchableOpacity style={{marginHorizontal: 17}}>
          <Text style={{color: 'black', fontSize: 15, marginLeft: 5}}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginHorizontal: 27}}>
          <Text
            style={{color: 'black', fontSize: 15}}
            onPress={() => navigation.navigate('Output')}>
            Sports
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginHorizontal: 27}}>
          <Text style={{color: 'black', fontSize: 15}}>Politics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginHorizontal: 27}}>
          <Text style={{color: 'black', fontSize: 15}}>Bussiness</Text>
        </TouchableOpacity>
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
                    newsData[key].time,
                    newsData[key].image1,
                  )
                }>
                <View style={styles.list}>
                  <Image
                    source={{uri: newsData[key].image}}
                    style={styles.image}
                  />
                  <View style={styles.rightItem}>
                    <Text style={styles.title} numberOfLines={2}>
                      {newsData[key].title}
                    </Text>
                    <Text style={styles.description} numberOfLines={4}>
                      {newsData[key].content}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: -70,
                        marginBottom: -40,
                      }}>
                      <Image
                        source={{uri: newsData[key].image1}}
                        style={{height: 20, width: 80, marginTop: -5}}
                      />
                      <Text style={styles.description1}>
                        {newsData[key].time}
                      </Text>
                      <TouchableOpacity onPress={() => handleSaveBookmark(key)}>
                        <Image
                          style={[styles.image3, { tintColor: image3Color }]}
                          source={require('../assets/21.png')}
                        />
                      </TouchableOpacity>
                    </View>
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
  articleContainer: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 1,
    color: 'black',
  },
  image3: {
    marginLeft: 20
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 10,
  },
  description: {
    flex: 1,
    marginBottom: 80,
    color: 'black',
    marginEnd: 10,
  },
  rightItem: {
    marginTop: 10,
    flexDirection: 'column',
    marginHorizontal: 1,
    flex: 1,
    marginBottom: -20,
  },
  description1: {
    marginBottom: 80,
    marginTop: -3,
    color: 'gray',
    marginLeft: 10,
  },
  placeholderImage: {
    width: 180,
    height: 150,
    backgroundColor: 'gray',
    marginHorizontal: 17,
    marginVertical: 15,
  },
  image: {
    width: 180,
    height: 150,
    marginHorizontal: 17,
    marginVertical: 15,
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

export default Latest;
