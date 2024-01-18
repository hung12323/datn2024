import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  RefreshControl
} from 'react-native';
import firebase from './UploadNews/firebase';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Head from './Head';
const Trending = () => {
  const [newsData, setNewsData] = useState(null);
  const navigation = useNavigation();
  const [image1Color, setImage1Color] = useState('gray');
  const [image3Color, setImage3Color] = useState('gray');
  const newsRef = firebase.database().ref('news');
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
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
    navigation.navigate('Detail1', { title, content, image,time,image1 });
  };
  // const handleSaveBookmark = (newsKey) => {
  //   // Thực hiện lưu tin tức vào trang bookmark
  //   const bookmarkRef = firebase.database().ref('bookmark').child(newsKey);
  //   bookmarkRef.set(newsData[newsKey]);
  //   console.log('Lưu tin tức vào trang bookmark: ', newsKey);
  //   changeImageColor(3);

  // };
  // const changeImageColor = imageNumber => {
  //   const newColor = '#ff0000';
  //   const newColor1 = '#1877F2';

  //   switch (imageNumber) {
  //     case 1:
  //       if (image1Color === newColor) {
  //         setImage1Color('gray');
  //       } else {
  //         setImage1Color(newColor);
  //       }
  //       break;
  //     case 3:
  //       if (image3Color === newColor1) {
  //         setImage3Color('gray');
  //       } else {
  //         setImage3Color(newColor1);
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // };
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
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="gray" />
      <View style={{flexDirection: 'row'}}>
        <Head />
        <Text
          style={{
            marginTop: 60,
            marginLeft: -210,
            fontSize: 20,
            color: 'black',
            marginBottom: 10,
          }}>
          Trending
        </Text>
      </View>
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Sử dụng RefreshControl để kích hoạt chức năng refresh
        } contentContainerStyle={styles.contentContainer}>
        {newsData && (
          <View>
            {Object.keys(newsData).reverse().map(key => (
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
              <View>
                  <Image
                    source={{uri: newsData[key].image}}
                    style={styles.image}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 230,
                      marginBottom: -10
                    }}>
                    <Image
                      source={{uri: newsData[key].image1}}
                      style={{height: 20, width: 80, marginTop: -2,marginRight:10}}
                    />
                    <Text>{newsData[key].time}</Text>
                    {/* <TouchableOpacity onPress={() => handleSaveBookmark(key)}>
                        <Image
                          style={[styles.image3, { tintColor: image3Color }]}
                          source={require('../assets/21.png')}
                        />
                      </TouchableOpacity> */}
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
  image3: {
    marginLeft: 10
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

export default Trending;
