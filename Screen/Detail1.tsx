import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import database from '@react-native-firebase/database';
import moment from 'moment';
import Head from './Head';
import Footer from './Footer';
import {useNavigation} from '@react-navigation/native';
import firebase from './UploadNews/firebase';

const Detail1 = ({route}) => {
  const [newsData, setNewsData] = useState(null);
  const {title, content, image, timestamp} = route.params;
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');
  const [comments, setComments] = useState([]);
  const navigation = useNavigation();
  const [searchKeyword] = useState('');
  const submitComment = () => {
    // Gửi bình luận lên Realtime Database
    database()
      .ref('comments')
      .push()
      .set({
        title: title,
        content: comment,
        username: username,
        likes: 0,
      })
      .then(() => {
        console.log('Bình luận đã được lưu thành công vào Firebase.');
        setComment('');
        setUsername('');
      })
      .catch(error => {
        console.log('Lỗi khi lưu bình luận vào Firebase:', error);
      });
  };

  const likeComment = commentId => {
    // Tăng số lượng lượt thích của bình luận lên 1
    database()
      .ref(`comments/${commentId}/likes`)
      // .transaction(likes => (likes || 1) + 1)
      .transaction(likes => likes || 1)
      .then(() => {
        console.log('Đã thích bình luận thành công.');
      })
      .catch(error => {
        console.log('Lỗi khi thích bình luận:', error);
      });
  };
  useEffect(() => {
    const newsRef = firebase.database().ref('news2');
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
  useEffect(() => {
    const commentsRef = database().ref('comments');
    commentsRef.on('value', snapshot => {
      const commentsData = snapshot.val();
      if (commentsData) {
        const commentsList = Object.entries(commentsData).map(
          ([key, value]) => ({
            id: key,
            ...value,
          }),
        );
        const filteredComments = commentsList.filter(
          comment => comment.title === title,
        );
        setComments(filteredComments);
      } else {
        setComments([]);
      }
    });

    return () => commentsRef.off('value');
  }, [title]);

  return (
    <View style={styles.container}>
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
          News Detail
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={{uri: image}} style={{width: '100%', height: 200}} />

        <Text
          style={{
            marginHorizontal: 10,
            fontWeight: 'bold',
            color: 'black',
            fontSize: 20,
            marginBottom: 20,
          }}>
          {title}
        </Text>
        <Text style={{color: 'black', fontSize: 18, marginHorizontal: 12}}>
          {content}
        </Text>
        <Text style={styles.timestamp}>
          {moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
        <View>
          <Text style={{marginTop: 20}}>
            --------------------------------------------------------------------------------------------------
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              color: 'black',
              fontSize: 20,
            }}>
            Comments
          </Text>
        </View>
        {comments.map((comment, index) => (
          <View key={index} style={styles.commentContainer}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.image}
                source={require('../assets/Profile.png')}
              />
              <Text style={styles.commentText1}>{comment.username}</Text>
              <Text style={styles.commentText}>{comment.content}</Text>
            </View>

            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => likeComment(comment.id)}>
              <Text style={styles.likeButtonText}>Like ({comment.likes})</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TextInput
          style={styles.commentInput}
          placeholder="Your name"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.commentInput}
          placeholder="Enter your comment"
          value={comment}
          onChangeText={text => setComment(text)}
        />

        <TouchableOpacity style={styles.submitButton} onPress={submitComment}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        <View>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 30,
              fontWeight: 'bold',
              marginTop: 20,
              color: 'black',
            }}>
            Gợi Ý
          </Text>
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
                        newsData[key].image1,
                        newsData[key].time,
                      )
                    }>
                    <View>
                      <View style={styles.rightItem}>
                        <Text style={styles.title} numberOfLines={2}>
                          {newsData[key].title}
                        </Text>
                        <Text style={styles.description} numberOfLines={3}>
                          {newsData[key].content}
                        </Text>
                      </View>
                      <Image
                        source={{uri: newsData[key].image}}
                        style={styles.image1}
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
                      <Text>
                        -------------------------------------------------------------------------------------------------
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <View>
              <TouchableOpacity
                style={{
                  marginLeft: 20,
                  width: 350,
                  height: 50,
                  backgroundColor: '#FFAD84',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                }}
                onPress={() => navigation.navigate('Feedback')}>
                <Text
                  style={{fontWeight: 'bold', color: '#AF2655', fontSize: 23}}>
                  Phản hồi với App News
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={{marginTop: 15}}>
              -------------------------------------------------------------------------------------------------
            </Text>
            <Text
              style={{
                marginTop: 15,
                marginLeft: 20,
                color: 'black',
                fontWeight: 'bold',
                fontSize: 21,
              }}>
              Báo điện tử App News
            </Text>
            <Text style={{marginLeft: 20, color: 'black', fontSize: 18}}>
              Báo tiếng Việt nhiều người xem nhất
            </Text>
            <Text style={{marginTop: 15}}>
              -------------------------------------------------------------------------------------------------
            </Text>
            <Text style={{marginLeft: 20, color: 'black', fontSize: 18}}>
              Thuộc Bộ Khoa học và Công Nghệ
            </Text>
            <Text style={{marginLeft: 20, color: 'black', fontSize: 18}}>
              Số giấy phép:890/TVH-BTTTT ngày 12/5/2023
            </Text>
            <Text
              style={{
                marginLeft: 20,
                color: 'black',
                fontSize: 18,
                marginTop: 10,
              }}>
              Tổng biên tập:Trương Văn Hưng
            </Text>
            <Text style={{marginLeft: 20, color: 'black', fontSize: 18}}>
              Địa chỉ:Tầng 10,Tòa A Phạm Văn ĐỒNG ,Cầu Giấy ,Hà Nội
            </Text>
            <Text style={{marginLeft: 20, color: 'black', fontSize: 18}}>
              Điện Thoại :0338268517
            </Text>
            <Text
              style={{
                marginLeft: 20,
                color: 'black',
                fontSize: 18,
                marginTop: 10,
              }}>
              Toàn bộ bản quyền thuốc APP News
            </Text>
          </ScrollView>
        </View>
      </ScrollView>
      <View style={{marginLeft: 20}}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  image2: {
    width: '88%',
    height: 150,
    marginHorizontal: 17,
    marginVertical: 15,
  },

  description: {
    flex: 1,
    color: 'black',
    marginEnd: 10,
    marginHorizontal: 20,
    marginTop: 10,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black',
    marginHorizontal: 20,
  },
  timestamp: {
    fontSize: 15,
    color: 'gray',
    marginTop: 15,
    textAlign: 'right',
    marginRight: 20,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 5,
  },
  submitButton: {
    backgroundColor: '#3c64a8',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    marginLeft: 15,
  },
  image1: {
    width: '90%',
    height: 180,
    marginHorizontal: 20,
    marginVertical: 20,
    // marginHorizontal: 'auto',
    marginTop: 40,
  },
  commentText1: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    fontWeight: '700',
    marginLeft: 5,
  },
  likeButton: {
    marginTop: 5,
  },
  likeButtonText: {
    color: 'blue',
  },
  image: {
    height: 25,
    width: 25,
  },
  rightItem: {
    flexDirection: 'column',
    marginHorizontal: 1,
    flex: 1,
    marginBottom: -20,
  },
});

export default Detail1;
