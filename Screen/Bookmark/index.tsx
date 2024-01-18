import React, { useEffect, useState ,useContext} from 'react';
import firebase from '../UploadNews/firebase';
import { useNavigation } from '@react-navigation/native';
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
import { AppContext } from '../AppContext';
const Bookmark = () => {
  const [newsData, setNewsData] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const newsRef = firebase.database().ref('bookmark');
  const [refreshing, setRefreshing] = useState(false);
  const {emailname}=useContext(AppContext)
  useEffect(() => {
    // const bookmarksRef = firebase.database().ref('bookmark');
    // bookmarksRef.on('value', snapshot => {
    //   const data = snapshot.val();
    
    //   if (data) {
    //     const bookmarkedNews = Object.entries(data).map(([key, value]) => ({
    //       key,
    //       ...value,
    //     }));
    //     setBookmarks(bookmarkedNews);
    //   } else {
    //     setBookmarks([]);
    //   }
    // });

    // // Clean up: Hủy lắng nghe khi component bị unmount
    // return () => {
    //   bookmarksRef.off();
    // };
    const fetchData = () => {
      const bookmarksRef = firebase.database().ref('bookmark');
      bookmarksRef
        .orderByChild('email')
        .equalTo(emailname)
        .on('value', snapshot => {
          const items = [];
          snapshot.forEach(childSnapshot => {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            items.push(item);
          });
          setBookmarks(items);
        });
    };

    fetchData();

    // Clean up the listener when component unmounts
    return () => {
      const bookmarksRef = firebase.database().ref('bookmark');
      bookmarksRef.off();
    };
  }, []);
  useEffect(() => {
    setFilteredBookmarks(filterBookmarks());
  }, [bookmarks, searchKeyword]);

  const filterBookmarks = () => {
    if (!searchKeyword) {
      return bookmarks;
    }

    const filteredBookmarks = bookmarks.filter(bookmark => {
      const title = bookmark.title.toLowerCase();
      return title.includes(searchKeyword.toLowerCase());
    });

    return filteredBookmarks;
  };
  const navigation = useNavigation();

  const navigateToDetail = (title, content, image, image1, time) => {
    navigation.navigate('Detail1', { title, content, image });
  };

  const handleRemoveBookmark = (bookmarkKey) => {
    const bookmarksRef = firebase.database().ref('bookmark');
    bookmarksRef.child(bookmarkKey).remove();
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
  return (

    <View style={styles.container}>
      <StatusBar backgroundColor="gray" />
      <View style={{ marginTop: 40, marginLeft: -20 }}>
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
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Sử dụng RefreshControl để kích hoạt chức năng refresh
        }>
        {/* {filteredBookmarks.length > 0 ? (
          filteredBookmarks.map((bookmark, index) => ( */}
       {filteredBookmarks.length > 0 ? (
          filteredBookmarks.reverse().map((bookmark, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigateToDetail(bookmark.title, bookmark.content, bookmark.image, bookmark.image1, bookmark.time)
              }>
              <View style={styles.list}>
                {bookmark.image && (
                  <Image
                    source={{ uri: bookmark.image }}
                    style={styles.image}
                  />
                )}
                <View style={styles.rightItem}>
                  <Text style={styles.title} numberOfLines={2}>{bookmark.title} </Text>
                  <Text style={styles.description} numberOfLines={5}>{bookmark.content}</Text>
                  <View style={{
                    flexDirection: 'row',
                    marginTop: -70,
                    marginBottom: -40,
                  }}>
                    <Image
                      source={{ uri: bookmark.image1 }}
                      style={{ height: 20, width: 80, marginTop: -5 }}
                    />
                    <Text style={styles.description1}>
                      {bookmark.time}
                    </Text>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveBookmark(bookmark.key)}>
                      <Image
                        style={styles.image3}
                        source={require('../../assets/21.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

              </View>

            </TouchableOpacity>
          ))
        ) : (
          <Text>No bookmarks found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },

  image: {
    width: 180,
    height: 150,
    marginHorizontal: 17,
    marginVertical: 15,
    // marginRight:10
    marginLeft: 1
  },
  rightItem: {
    marginTop: 10,
    flexDirection: 'column',
    marginHorizontal: 1,
    flex: 1,
    marginBottom: -20,
  },
  image3: {
    marginLeft: 20
  },
  description1: {
    marginBottom: 80,
    marginTop: -3,
    color: 'gray',
    marginLeft: 10,
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
  description: {
    marginBottom: 80,
    color: 'black',
  },
  removeButton: {

  },
  removeButtonText: {
    color: 'black',

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
    marginLeft: 1,
    marginBottom: 10
  },
  list: {
    flexDirection: 'row',
    // marginTop: -40
  },
});

export default Bookmark;