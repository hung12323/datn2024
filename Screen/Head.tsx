import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Head = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.head}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image style={styles.anh1} source={require('../assets/Icon.png')} />
      </TouchableOpacity>
      <Image style={styles.anh2} source={require('../assets/6.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    marginBottom: 10,
    // marginTop: 40,
  },
  anh1: {
    marginLeft: 20,
    marginTop: 50,
  },
  anh2: {
    marginLeft: 310,
    marginTop: 60,
  },
});

export default Head;
