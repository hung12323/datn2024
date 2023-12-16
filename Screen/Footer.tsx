import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const Footer = () => {
  const navigation = useNavigation();
  const [image1Color, setImage1Color] = useState('gray');
  // const [image2Color, setImage2Color] = useState('gray');
  const [image3Color, setImage3Color] = useState('gray');

  const changeImageColor = imageNumber => {
    const newColor = '#ff0000';
    const newColor1 = '#1877F2';

    switch (imageNumber) {
      case 1:
        if (image1Color === newColor) {
          setImage1Color('gray');
        } else {
          setImage1Color(newColor);
        }
        break;
      case 3:
        if (image3Color === newColor1) {
          setImage3Color('gray');
        } else {
          setImage3Color(newColor1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.image}>
      <TouchableOpacity
        onPress={() => changeImageColor(1)}
        style={styles.container1}>
        <Image
          style={[styles.image1, {tintColor: image1Color}]}
          source={require('../assets/19.png')}
        />
        <Text style={styles.text}>24.5K</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Comment')}
        style={styles.container}>
        <Image style={[styles.image2]} source={require('../assets/20.png')} />
        <Text style={styles.text}>5K</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => changeImageColor(3)}>
        <Image
          style={[styles.image3, {tintColor: image3Color}]}
          source={require('../assets/21.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flexDirection: 'row',
    marginVertical: 30,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 180,
    marginLeft: 10,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 1,
  },
  image1: {
    marginRight: 8,
  },
  image2: {
    marginRight: 8,
  },
  image3: {
    marginRight: 8,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Footer;
