import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    title: 'Lorem Ipsum is simplydummy',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: require('../assets/2.png'),
    bg: 'white',
  },
  {
    title: 'Lorem Ipsum is simplydummy',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: require('../assets/1.png'),
    bg: 'white',
  },
  {
    title: 'Lorem Ipsum is simplydummy',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image: require('../assets/3.png'),
    bg: 'white',
  },
];

type Item = (typeof data)[0];

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 540,
    marginVertical: 12,
    marginTop: 1,
  },
  text: {
    color: 'gray',
    textAlign: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
  },
  doneButton: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({item}: {item: Item}) => {
    return (
      <View style={[styles.slide, {backgroundColor: item.bg}]}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const handleDone = () => {
    navigation.navigate('LoginScreen'); // Điều hướng đến màn hình chính sau khi hoàn thành Onboarding
  };
  const renderDoneButton = () => {
    return (
      <View style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Get Started</Text>
      </View>
    );
  };
  const renderNextButton = () => {
    return (
      <View style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        data={data}
        renderItem={renderItem}
        onDone={handleDone}
        dotStyle={{backgroundColor: 'gray'}}
        activeDotStyle={{backgroundColor: '#4285F4'}}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
      />
    </View>
  );
};

export default OnboardingScreen;
