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

const Bookmark = () => {
  const [newsData, setNewsData] = useState(null);
  const navigation = useNavigation();
  const [searchKeyword, setSearchKeyword] = useState('');
  useEffect(() => {
    const newsRef = firebase.database().ref('news');
    newsRef.on('value', snapshot => {
      const data = snapshot.val();
      setNewsData(data);
    });

    return () => {
      newsRef.off();
    };
  }, []);
  const navigateToDetail = (title, content, image, time, image1) => {
    navigation.navigate('Detail1', {title, content, image});
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
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="gray" />
      <View style={{marginTop: 70}}>
        <Text
          style={{
            fontSize: 25,
            color: 'black',
            fontWeight: 'bold',
            marginLeft: 20,
          }}>
          BookMark
        </Text>
      </View>
      <View style={styles.search}>
        <TouchableOpacity>
          <Image
            style={{marginLeft: 5}}
            source={require('../../assets/4.png')}
          />
        </TouchableOpacity>
        <TextInput
          style={{marginLeft: 10}}
          placeholder="Search"
          value={searchKeyword}
          onChangeText={text => setSearchKeyword(text)}
        />
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
                    source={{uri: newsData[key].image}}
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
                        source={{uri: newsData[key].image1}}
                        style={{height: 20, width: 80, marginTop: -5}}
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
});

export default Bookmark;
