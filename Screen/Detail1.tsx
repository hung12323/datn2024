import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';
import database from '@react-native-firebase/database';
import moment from 'moment';
import Head from './Head';
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native';
import firebase from './UploadNews/firebase';
import { AppContext } from './AppContext';
const Detail1 = ({ route }) => {
  const [newsData, setNewsData] = useState(null);
  const { title, content, image, timestamp, time, image1 } = route.params;
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');
  const [comments, setComments] = useState([]);
  const [likedComments, setLikedComments] = useState([]);
  const navigation = useNavigation();
  const [searchKeyword] = useState('');
  const { emailname } = useContext(AppContext)
  
  const submitComment = () => {
    // Gửi bình luận lên Realtime Database
    database()
      .ref('comments')
      .push()
      .set({
        email: emailname,
        title: title,
        content: comment,
        username: username,
        likes: 0,
        time: time,
        likedBy: [],
      })
      .then(() => {
        console.log('Bình luận đã được lưu thành công vào Firebase.');
        Alert.alert('Bình luận thành công')
        setComment('');
        setUsername('');
      })
      .catch(error => {
        console.log('Lỗi khi lưu bình luận vào Firebase:', error);
      });
  };
 
  useEffect(() => {
    const commentsRef = database().ref('comments');
    commentsRef.on('value', snapshot => {
      const commentsData = snapshot.val();
      if (commentsData) {
        const commentsList = Object.entries(commentsData).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        const filteredComments = commentsList.filter(comment => comment.title === title);
        setComments(filteredComments);

        // Cập nhật danh sách các bình luận đã được người dùng hiện tại like
        const likedCommentsByUser = filteredComments.filter(comment => comment.likedBy && comment.likedBy.includes(username));
        setLikedComments(likedCommentsByUser.map(comment => comment.id));
      } else {
        setComments([]);
        setLikedComments([]);
      }
    });

    return () => commentsRef.off('value');
  }, [title, username]);

  const likeComment = commentId => {
    // Kiểm tra xem người dùng đã like bình luận hay chưa
    const isLiked = likedComments.includes(commentId);

    let updatedLikedComments;

    if (isLiked) {
      // Bỏ like nếu đã like trước đó
      updatedLikedComments = likedComments.filter(id => id !== commentId);
    } else {
      // Like nếu chưa like trước đó
      updatedLikedComments = [...likedComments, commentId];
    }

    database()
      .ref(`comments/${commentId}/likedBy`)
      .set(updatedLikedComments)
      .then(() => {
        console.log(isLiked ? 'Đã bỏ like bình luận thành công.' : 'Đã thích bình luận thành công.');
        updateLikedCommentsState(updatedLikedComments); // Gọi hàm để cập nhật giá trị mới của likedComments
      })
      .catch(error => {
        console.log(isLiked ? 'Lỗi khi bỏ like bình luận:' : 'Lỗi khi thích bình luận:', error);
      });
  };

  const updateLikedCommentsState = newLikedComments => {
    // Cập nhật giá trị mới của likedComments
    setLikedComments(newLikedComments);
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
  const [reply, setReply] = useState('');
  const [replyingCommentId, setReplyingCommentId] = useState(null);
  const [replyingUsername, setReplyingUsername] = useState('');

  const submitReply = (commentId, reply, username, emailname) => {
    database()
      .ref(`comments/${commentId}/replies`)
      .push()
      .set({
        email: emailname,
        content: reply,
        username: username,
      })
      .then(() => {
        console.log('Reply saved successfully to Firebase.');
        setReply('');
        setReplyingCommentId(null); // Thêm dòng này để ẩn các comment reply
        setReplyingUsername('');
      })
      .catch(error => {
        console.log('Error saving reply to Firebase:', error);
      });
  };
  const deleteComment = (commentId) => {
    // Xóa comment khỏi Realtime Database
    database()
      .ref(`comments/${commentId}`)
      .remove()
      .then(() => {
        console.log('Xóa comment thành công.');
      })
      .catch(error => {
        console.log('Lỗi khi xóa comment:', error);
      });
  };


  const [image3Color, setImage3Color] = useState('#3c64a8');
  const [img, setImg] = useState(require('../assets/13.png'));
  // const imageSource = require('../assets/13.png');
  const imageSource = img;

  const handleSaveBookmark = () => {
    const bookmarksRef = firebase.database().ref('bookmark');

    bookmarksRef
      .orderByChild('title')
      .equalTo(title)
      .once('value')
      .then(snapshot => {
        let exists = false;

        snapshot.forEach(childSnapshot => {
          const bookmark = childSnapshot.val();
          if (bookmark.email === emailname) {
            exists = true;
            return;
          }
        });

        if (exists) {
          Alert.alert('Tin tức đã có trong bookmark.');
          setImg(require('../assets/21.png'));
        } else {
          bookmarksRef
            .push()
            .set({
              email: emailname,
              title: title,
              content: content,
              image: image,
              image1: image1,
              time: time
            })
            .then(() => {
              console.log('Tin tức đã lưu thành công vào Firebase.');
              Alert.alert('Thêm vào bookmark.');
              setImg(require('../assets/21.png'));
              // Đổi màu nút thành xanh
            })
            .catch(error => {
              console.log('Lỗi khi lưu tin tức vào Firebase:', error);
            });
        }
      })
      .catch(error => {
        console.log('Lỗi khi truy vấn vào Firebase:', error);
      });
  };
  return (
    <View style={styles.container}>
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
          News Detail
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />

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
        <Text style={{ color: 'black', fontSize: 18, marginHorizontal: 12, textAlign: 'justify' }}>
          {content}
        </Text>
        <Text style={styles.timestamp}>
          {moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
        <View>
          <Text style={{ marginTop: 20 }}>
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
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={styles.image}
                source={require('../assets/Profile.png')}
              />
              <Text style={styles.commentText1}>{comment.email}</Text>


            </View>
            <Text style={styles.commentTime}>{moment(comment.time).format('DD-MM-YYY')}</Text>
            <Text style={styles.commentText}>{comment.content}</Text>
            <View style={styles.likeButton}>
              <TouchableOpacity

                onPress={() => likeComment(comment.id)}>
                <Text style={styles.likeButtonText}>
                  {likedComments.includes(comment.id) ? 'Unlike' : 'Like'} ({comment.likedBy ? comment.likedBy.length : 0})
                </Text>

              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                if (replyingCommentId === comment.id) {
                  setReplyingCommentId(null);
                } else {
                  setReplyingCommentId(comment.id);
                }
              }}>
                <Text style={{ marginLeft: 30 }}>Reply</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteComment(comment.id)}>
                <Image
                  style={{ height: 20, width: 20 }}
                  source={require('../assets/xoa.png')}
                />
              </TouchableOpacity>

            </View>



            {/* Hiển thị danh sách các comment reply */}
            {comment.replies && Object.values(comment.replies).map((reply, index) => (
              <View style={{ marginTop: 10, marginLeft: 20 }} key={index}>
                {replyingCommentId === comment.id ? (
                  <>
                    <Image
                      style={styles.image}
                      source={require('../assets/24.png')}
                    />
                    <Text style={styles.commentText1}>{reply.email}</Text>
                    <Text style={styles.commentTime1}>{moment(comment.time).format('DD-MM-YYY')}</Text>
                  </>
                ) : null}
                {replyingCommentId === comment.id && (
                  <Text style={styles.commentText}>{reply.content}</Text>

                )}

              </View>
            ))}

            {
              replyingCommentId === comment.id && (
                <View>

                  <TextInput
                    style={styles.commentInput}
                    value={reply}
                    onChangeText={setReply}
                    placeholder="Enter your reply"
                  />
                  <TouchableOpacity style={styles.submitButton} onPress={() => {
                    submitReply(comment.id, reply, replyingUsername, emailname);
                    setReplyingCommentId(null);
                  }}>
                    <Text>Submit Reply</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
        ))}
        {/* <TextInput
          style={styles.commentInput}
          placeholder="Your name"
          value={username}
          onChangeText={text => setUsername(text)}
        /> */}
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
                        source={{ uri: newsData[key].image }}
                        style={styles.image1}
                      />

                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: 250,
                          marginBottom: -10,
                        }}>
                        <Image
                          source={{ uri: newsData[key].image1 }}
                          style={{ height: 20, width: 80, marginTop: -2 }}
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
                  style={{ fontWeight: 'bold', color: '#AF2655', fontSize: 23 }}>
                  Phản hồi với App News
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={{ marginTop: 15 }}>
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
            <Text style={{ marginLeft: 20, color: 'black', fontSize: 18 }}>
              Báo tiếng Việt nhiều người xem nhất
            </Text>
            <Text style={{ marginTop: 15 }}>
              -------------------------------------------------------------------------------------------------
            </Text>
            <Text style={{ marginLeft: 20, color: 'black', fontSize: 18 }}>
              Thuộc Bộ Khoa học và Công Nghệ
            </Text>
            <Text style={{ marginLeft: 20, color: 'black', fontSize: 18 }}>
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
            <Text style={{ marginLeft: 20, color: 'black', fontSize: 18 }}>
              Địa chỉ:Tầng 10,Tòa A Phạm Văn ĐỒNG ,Cầu Giấy ,Hà Nội
            </Text>
            <Text style={{ marginLeft: 20, color: 'black', fontSize: 18 }}>
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
      <View style={{ marginLeft: 20 }}>
        <Footer image3Color={image3Color} onpress={handleSaveBookmark} imageSource={imageSource} />
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
    marginTop: 2,
    flexDirection: 'row'
  },
  likeButtonText: {
    color: 'blue',
    marginLeft: 4,
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
  commentTime: {
    marginLeft: 35
  },
  commentTime1: {
    marginLeft: 5
  },
  deleteButton: {
    marginLeft: 200,
    marginBottom: 20,
  }
});

export default Detail1;
