import firebase from './firebase';

export const createNews = async (title, content, imageUrl) => {
  try {
    const newsRef = firebase.database().ref('news');

    const newNewsRef = newsRef.push();

    await newNewsRef.set({
      title,
      content,
      imageUrl,
    });

    console.log('Đăng tin tức thành công!');
  } catch (error) {
    console.error('Lỗi khi đăng tin tức:', error);
  }
};
