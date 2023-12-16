import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import firebase from '../UploadNews/firebase';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Latest: React.FC = () => {
  const [newsData, setNewsData] = useState(null);
  const navigation = useNavigation();
  const [searchKeyword] = useState('');
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
    navigation.navigate('Detail1', {title, content, image});
  };
  const filterNews = () => {
    if (!searchKeyword) {
      return newsData;
    }
  };
  const [buttonStates, setButtonStates] = useState({
    button1: 'save ',
    button2: 'save',
    button3: 'save',
  });
  const [buttonBackground, setButtonBackground] = useState({
    button1: 'blue',
    button2: 'blue',
    button3: 'blue',
  });
  const [buttonText, setButtonText] = useState({
    button1: 'white',
    button2: 'white',
    button3: 'white',
  });

  useEffect(() => {
    loadButtonStates();
  }, []);

  const loadButtonStates = async () => {
    try {
      const storedButtonStates = await AsyncStorage.getItem('buttonStates');
      if (storedButtonStates !== null) {
        setButtonStates(JSON.parse(storedButtonStates));
      }
    } catch (error) {
      console.log('Error loading button states:', error);
    }
  };

  const saveButtonStates = async () => {
    try {
      await AsyncStorage.setItem('buttonStates', JSON.stringify(buttonStates));
    } catch (error) {
      console.log('Error saving button states:', error);
    }
  };

  const changeName = buttonId => {
    setButtonStates(prevButtonStates => {
      const updatedButtonStates = {...prevButtonStates};
      if (prevButtonStates[buttonId] === 'Save') {
        updatedButtonStates[buttonId] = 'Saved';
        setButtonBackground(prevButtonBackground => ({
          ...prevButtonBackground,
          [buttonId]: '#1877F2', // Màu nền khi chuyển sang trạng thái saved
        }));
        setButtonText(prevButtonText => ({
          ...prevButtonText,
          [buttonId]: 'white', // Màu chữ khi chuyển sang trạng thái saved
        }));
      } else {
        updatedButtonStates[buttonId] = 'Save';
        setButtonBackground(prevButtonBackground => ({
          ...prevButtonBackground,
          [buttonId]: 'white', // Màu nền khi chuyển sang trạng thái save
        }));
        setButtonText(prevButtonText => ({
          ...prevButtonText,
          [buttonId]: '#1877F2', // Màu chữ khi chuyển sang trạng thái save
        }));
      }
      return updatedButtonStates;
    });
  };
  useEffect(() => {
    saveButtonStates();
  }, [buttonStates]);

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Explore</Text>
      <View style={styles.topic}>
        <Text style={styles.text4}>Topic</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Trending')}>
          <Text style={{color: 'black', marginLeft: 240, fontSize: 13}}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button1}>
        <Image style={{height:80,width:80,marginLeft: 18,
    margin: 15,}} source={require('../../assets/football.png')} />
        <View>
          <Text style={styles.text2}>Sport</Text>
          <Text style={styles.text3}>
            Get energizing workout {'\n'}
            moves, healthy recipes...
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button2, {backgroundColor: buttonBackground.button1}]}
          onPress={() => changeName('button1')}>
          <Text style={[styles.buttonText, {color: buttonText.button1}]}>
            {buttonStates.button1}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button1}>
        <Image style={styles.anh} source={require('../../assets/17.png')} />
        <View>
          <Text style={styles.text2}>World</Text>
          <Text style={styles.text3}>
            The application of scientific {'\n'}
            knowledge to the practi...
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: buttonBackground.button2}]}
          onPress={() => changeName('button2')}>
          <Text style={[styles.buttonText, {color: buttonText.button2}]}>
            {buttonStates.button2}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button1}>
        <Image style={styles.anh} source={require('../../assets/16.png')} />
        <View>
          <Text style={styles.text2}>Art</Text>
          <Text style={styles.text3}>
            Art is a diverse range of {'\n'}
            human activity, and result...
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button3, {backgroundColor: buttonBackground.button3}]}
          onPress={() => changeName('button3')}>
          <Text style={[styles.buttonText, {color: buttonText.button3}]}>
            {buttonStates.button3}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text4}>Popular Topic</Text>
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
                <View style={styles.list}>
                  <Image
                    source={{uri: newsData[key].image}}
                    style={styles.image}
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
                  <View style={styles.rightItem}>
                    <Text style={styles.title} numberOfLines={2}>
                      {newsData[key].title}
                    </Text>
                    <Text style={styles.description} numberOfLines={3}>
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
  articleContainer: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black',
    marginHorizontal: 20,
  },
  description: {
    flex: 1,
    color: 'black',
    marginEnd: 10,
    marginHorizontal: 20,
  },
  image: {
    width: '90%',
    height: 180,
    marginHorizontal: 20,
    marginVertical: 20,
    // marginHorizontal: 'auto',
  },
  text1: {
    marginTop: 50,
    marginLeft: 20,
    fontSize: 40,
    color: 'black',
    fontWeight: '700',
  },
  topic: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  button1: {
    flexDirection: 'row',
  },
  anh: {
    marginLeft: 25,
    margin: 15,
  },
  text2: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    fontWeight: 'bold',
  },
  text3: {
    color: 'black',
    marginTop: 5,
  },
  text4: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#1877F2',
    padding: 10,
    borderRadius: 5,
    height: 40,
    width: 70,
    marginLeft: 17,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    backgroundColor: '#1877F2',
    padding: 10,
    borderRadius: 5,
    height: 40,
    width: 70,
    marginLeft: 40,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button3: {
    backgroundColor: '#1877F2',
    padding: 10,
    borderRadius: 5,
    height: 40,
    width: 70,
    marginLeft: 23,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Latest;
