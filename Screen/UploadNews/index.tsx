import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Image} from 'react-native';
import {createNews} from './news';
import Head from '../Head';

const UploadNews = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleChooseImage = () => {};

  const handleCreateNews = () => {
    createNews(title, content, imageUrl);
    setTitle('');
    setContent('');
    setImageUrl('');
  };

  return (
    <View style={styles.container}>
      <Head />
      <View style={styles.imageContainer}>
        {imageUrl && <Image source={{uri: imageUrl}} style={styles.image} />}
        <Button title="Chọn ảnh" onPress={handleChooseImage} />
      </View>
      <TextInput
        style={{marginLeft: 20, borderWidth: 1, width: 350}}
        placeholder="Tiêu đề tin tức"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={{
          marginLeft: 20,
          borderWidth: 1,
          width: 350,
          marginTop: 20,
          height: 200,
        }}
        placeholder="Nội dung tin tức"
        value={content}
        onChangeText={setContent}
      />
      <TextInput
        style={{
          marginLeft: 20,
          borderWidth: 1,
          width: 350,
          marginTop: 20,
        }}
        placeholder="Link URL ảnh"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <View style={{marginTop: 30, height: 250}}>
        <Button title="Đăng tin tức" onPress={handleCreateNews} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default UploadNews;
