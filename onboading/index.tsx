// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import database from '@react-native-firebase/database';

// import Head from './Head';
// import Footer from './Footer';

// const Detail1 = ({route}) => {
//   const {title, content, image} = route.params;
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState([]);

//   const submitComment = () => {
//     // Gửi bình luận lên Realtime Database
//     database()
//       .ref('comments')
//       .push()
//       .set({
//         title: title,
//         content: comment,
//         likes: 0, // Khởi tạo số lượng lượt thích ban đầu là 0
//       })
//       .then(() => {
//         console.log('Bình luận đã được lưu thành công vào Firebase.');
//         setComment(''); // Xóa nội dung bình luận sau khi đã gửi
//       })
//       .catch(error => {
//         console.log('Lỗi khi lưu bình luận vào Firebase:', error);
//       });
//   };

//   const likeComment = commentId => {
//     // Tăng số lượng lượt thích của bình luận lên 1
//     database()
//       .ref(`comments/${commentId}/likes`)
//       .transaction(likes => (likes || 0) + 1)
//       .then(() => {
//         console.log('Đã thích bình luận thành công.');
//       })
//       .catch(error => {
//         console.log('Lỗi khi thích bình luận:', error);
//       });
//   };

//   useEffect(() => {
//     const commentsRef = database().ref('comments');
//     commentsRef.on('value', snapshot => {
//       const commentsData = snapshot.val();
//       if (commentsData) {
//         const commentsList = Object.entries(commentsData).map(
//           ([key, value]) => ({
//             id: key,
//             ...value,
//           }),
//         );
//         // Lọc các bình luận dựa trên tiêu đề của bài viết
//         const filteredComments = commentsList.filter(
//           comment => comment.title === title,
//         );
//         setComments(filteredComments);
//       } else {
//         setComments([]);
//       }
//     });

//     return () => commentsRef.off('value');
//   }, [title]);

//   return (
//     <View style={styles.container}>
//       <View style={{flexDirection: 'row'}}>
//         <Head />
//         <Text
//           style={{
//             marginTop: 60,
//             marginLeft: -210,
//             fontSize: 20,
//             color: 'black',
//             marginBottom: 10,
//           }}>
//           News Detail
//         </Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.contentContainer}>
//         <Image source={{uri: image}} style={{width: '100%', height: 200}} />
//         <Text
//           style={{
//             marginHorizontal: 10,
//             fontWeight: 'bold',
//             color: 'black',
//             fontSize: 20,
//             marginBottom: 20,
//           }}>
//           {title}
//         </Text>
//         <Text style={{color: 'black', fontSize: 18, marginHorizontal: 12}}>
//           {content}
//         </Text>

//         {/* Hiển thị danh sách bình luận */}
//         {comments.map((comment, index) => (
//           <View key={index} style={styles.commentContainer}>
//             <Text style={styles.commentText}>{comment.content}</Text>
//             <TouchableOpacity
//               style={styles.likeButton}
//               onPress={() => likeComment(comment.id)}>
//               <Text style={styles.likeButtonText}>Like ({comment.likes})</Text>
//             </TouchableOpacity>
//           </View>
//         ))}
//       </ScrollView>
//       <TextInput
//         style={styles.commentInput}
//         placeholder="Enter your comment"
//         value={comment}
//         onChangeText={text => setComment(text)}
//       />
//       <TouchableOpacity style={styles.submitButton} onPress={submitComment}>
//         <Text style={styles.submitButtonText}>Submit</Text>
//       </TouchableOpacity>
//       <View style={{marginLeft: 20}}>
//         <Footer />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   contentContainer: {
//     flexGrow: 1,
//   },
//   commentInput: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 5,
//     marginTop: 10,
//     marginHorizontal: 10,
//     padding: 5,
//   },
//   submitButton: {
//     backgroundColor: 'blue',
//     borderRadius: 5,
//     marginTop: 10,
//     marginHorizontal: 10,
//     padding: 10,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   commentContainer: {
//     backgroundColor: '#f2f2f2',
//     borderRadius: 5,
//     marginTop: 10,
//     marginHorizontal: 10,
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   commentText: {
//     flex: 1,
//     color: 'black',
//     fontSize: 16,
//   },
//   likeButton: {
//     backgroundColor: 'blue',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   likeButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default Detail1;