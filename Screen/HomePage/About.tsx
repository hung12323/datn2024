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
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const [newsData, setNewsData] = useState(null);
  const navigation = useNavigation();
  const [searchKeyword, setSearchKeyword] = useState('');
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
    navigation.navigate('Detail1', { title, content, image });
  };
  const filterNews = () => {
    if (!searchKeyword) {
      return newsData;
    }

    const filteredNews = Object.keys(newsData).filter(key => {
      const title = newsData[key].title.toLowerCase();
      return title.includes(searchKeyword.toLowerCase());
    });

    return filteredNews.reduce((filteredData, key) => {
      filteredData[key] = newsData[key];
      return filteredData;
    }, {});
  };
  const [singleNews, setSingleNews] = useState(null);

  const getSingleNews = async () => {
    const newsRef = firebase.database().ref('news');
    const snapshot = await newsRef.once('value');
    const data = snapshot.val();

    // Lấy một tin tức từ dữ liệu
    const news3 = 'news12';
    const news = data[news3];
    setSingleNews(news);
  };

  useEffect(() => {
    getSingleNews();
  }, []);
  const handlePress = () => {
    navigation.navigate('Detail1', {
      image: singleNews.image,
      title: singleNews.title,
      content: singleNews.content,
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="gray" />
      {/* <Head /> */}
      <TouchableOpacity style={styles.head}>
        <Image
          style={styles.anh1}
          source={require('../../assets/Vector.png')}
        />
        <Image style={styles.anh2} source={require('../../assets/5.png')} />
      </TouchableOpacity>
      <View style={styles.search}>
        <TouchableOpacity>
          <Image
            style={{ marginLeft: 5 }}
            source={require('../../assets/4.png')}
          />
        </TouchableOpacity>
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder="Search"
          value={searchKeyword}
          onChangeText={text => setSearchKeyword(text)}
        />
      </View>
      <View style={styles.Trending}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 20,
          }}>
          Trending
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Trending')}>
          <Text style={{ color: 'black', marginLeft: 230, fontSize: 13 }}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {singleNews ? (
          <TouchableOpacity onPress={handlePress}>
            <View>
              {singleNews.image && (
                <Image
                  source={{ uri: singleNews.image }}
                  style={{
                    width: '88%',
                    height: 200,
                    marginHorizontal: 17,
                    marginVertical: 15,
                  }}
                />
              )}
              <Text style={styles.title1} numberOfLines={2}>
                {singleNews.title}
              </Text>
              <Text style={styles.content1} numberOfLines={2}>
                {singleNews.content}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <View style={styles.text2}>
        <Text
          style={{
            color: 'black',
            fontSize: 22,
            fontWeight: 'bold',
            marginLeft: 25,
          }}>
          Latest
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Latest')}>
          <Text style={{ color: 'black', marginLeft: 240, fontSize: 13 }}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.text1}>
        <TouchableOpacity style={{ marginHorizontal: 17 }}>
          <Text style={{ color: 'black', fontSize: 15 }}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginHorizontal: 27 }}
          onPress={() => navigation.navigate('Output')}>
          <Text style={{ color: 'black', fontSize: 15 }}>Sports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 27 }}>
          <Text style={{ color: 'black', fontSize: 15 }}>Politics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 27 }}>
          <Text style={{ color: 'black', fontSize: 15 }}>Bussiness</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {newsData && (
          <View>
            {Object.keys(filterNews()).map(key => (
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
                    source={{ uri: newsData[key].image }}
                    style={styles.image}
                  />
                  <View style={styles.rightItem}>
                    <Text style={styles.title} numberOfLines={2}>
                      {newsData[key].title}
                    </Text>
                    <Text style={styles.description} numberOfLines={5}>
                      {newsData[key].content}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: -70,
                        marginBottom: -40,
                      }}>
                      <Image
                        source={{ uri: newsData[key].image1 }}
                        style={{ height: 20, width: 80, marginTop: -5 }}
                      />
                      <Text style={styles.description1}>
                        {newsData[key].time}
                      </Text>
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
    marginTop: 1,
    marginBottom: 5,
  },
  title1: {
    fontSize: 17,
    fontWeight: 'bold',
    marginHorizontal: 17,
    color: 'black',
  },
  contentContainer: {
    flexGrow: 1,
  },
  rightItem: {
    marginTop: 10,
    flexDirection: 'column',
    marginHorizontal: 1,
    flex: 1,
    marginBottom: -20,
  },
  list: {
    flexDirection: 'row',
    // marginTop: -40
  },
  description: {
    marginBottom: 80,
    color: 'black',
  },
  description1: {
    marginBottom: 80,
    marginTop: -3,
    color: 'gray',
    marginLeft: 10,
  },
  image: {
    width: 180,
    height: 150,
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
  content1: {
    marginHorizontal: 17,
    color: 'black',
  },
});

export default HomePage;
