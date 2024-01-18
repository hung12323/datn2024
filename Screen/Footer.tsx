import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer = (props) => {
  const navigation = useNavigation();
  const [image1Color, setImage1Color] = useState('gray');
  const { image3Color, onpress, imageSource } = props;

  return (
    <View style={styles.image}>
      <TouchableOpacity style={styles.container1}>
        <Image style={[styles.image1, { tintColor: image1Color }]} source={require('../assets/19.png')} />
        <Text style={styles.text}>23.5K</Text>
      </TouchableOpacity>

      {/* Các phần giao diện khác */}
      <TouchableOpacity onPress={onpress}>
        <Image style={[styles.image3, { tintColor: image3Color }]} source={imageSource} />
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
    marginLeft: 250,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Footer;