import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Comment = ({
  name,
  avatarPath,
  commentText,
  likes,
  onLikePress,
  onReplyPress,
  replies,
}) => {
  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReply = () => {
    if (replyText) {
      onReplyPress(replyText);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
      }}>
      <Avatar rounded source={avatarPath} />
      <View style={{marginLeft: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>{name}</Text>
          <TouchableOpacity onPress={onLikePress}>
            <Icon
              name="heart"
              type="font-awesome"
              size={16}
              color="red"
              containerStyle={{marginLeft: 10}}
            />
          </TouchableOpacity>
        </View>
        <Text>{commentText}</Text>
        <TouchableOpacity onPress={() => setShowReplyInput(!showReplyInput)}>
          <Text style={{color: 'blue', marginTop: 5}}>Reply</Text>
        </TouchableOpacity>
        {showReplyInput && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              style={{
                flex: 1,
                height: 40,
                borderWidth: 1,
                marginTop: 5,
                marginRight: 10,
              }}
              placeholder="Reply..."
              value={replyText}
              onChangeText={text => setReplyText(text)}
            />
            <TouchableOpacity onPress={handleReply}>
              <Text style={{color: 'blue', marginTop: 5}}>Send</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={replies}
          renderItem={({item}) => (
            <Comment
              name={item.name}
              avatarPath={item.avatarPath}
              commentText={item.commentText}
              likes={item.likes}
              onLikePress={() => onLikePress(item.id)}
              onReplyPress={replyText => onReplyPress(item.id, replyText)}
              replies={item.replies}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

const App = () => {
  const navigation = useNavigation();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [replyCommentId, setReplyCommentId] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const storedComments = await AsyncStorage.getItem('comments');
      if (storedComments) {
        setComments(JSON.parse(storedComments));
      }
    } catch (error) {
      console.log('Error fetching comments:', error);
    }
  };

  const saveComments = async commentsToSave => {
    try {
      const jsonComments = JSON.stringify(commentsToSave);
      await AsyncStorage.setItem('comments', jsonComments);
    } catch (error) {
      console.log('Error saving comments:', error);
    }
  };

  const handleAddComment = () => {
    if (commentText) {
      const newComment = {
        id: comments.length + 1,
        name: 'Wilson Franci',
        avatarPath: require('../assets/Profile.png'),
        commentText: commentText,
        likes: 0,
        replies: [],
      };

      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      saveComments(updatedComments);
      setCommentText('');
    }
  };

  const handleLikeComment = commentId => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {...comment, likes: comment.likes + 1};
      }
      return comment;
    });

    setComments(updatedComments);
    saveComments(updatedComments);
  };

  const handleReplyComment = (commentId, replyText) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const newReply = {
          id: comment.replies.length + 1,
          name: 'John Doe',
          avatarPath: require('../assets/24.png'),
          commentText: replyText,
          likes: 0,
          replies: [],
        };
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    saveComments(updatedComments);
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', marginTop: 50,marginBottom: 30}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/Icon.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Comments</Text>
      </View>

      <FlatList
        data={comments}
        renderItem={({item}) => (
          <Comment
            name={item.name}
            avatarPath={item.avatarPath}
            commentText={item.commentText}
            likes={item.likes}
            onLikePress={() => handleLikeComment(item.id)}
            onReplyPress={replyText => handleReplyComment(item.id, replyText)}
            replies={item.replies}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Type your comment"
          value={commentText}
          onChangeText={text => setCommentText(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddComment}>
          <Text style={styles.addButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    color: 'black',
    marginLeft: 100,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
