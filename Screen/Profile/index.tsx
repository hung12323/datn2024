import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
// import {Text} from 'react-native-elements';
import ImageCropPicker from 'react-native-image-crop-picker';
const Profile = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);

  const selectProfileImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setProfileImage(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View>
      <Text style={styles.text}>Profile</Text>

      <View style={styles.profile}>
        <TouchableOpacity onPress={selectProfileImage}>
          <Image
            style={styles.image}
            source={require('../../assets/Profile.png')}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.text3}>2165</Text>
          <Text style={styles.text4}>Followers</Text>
        </View>
        <View>
          <Text style={styles.text3}>165</Text>
          <Text style={styles.text4}>Following</Text>
        </View>
        <View>
          <Text style={styles.text3}>21</Text>
          <Text style={styles.text4}>News</Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 20,
          color: 'black',
          marginLeft: 25,
          fontWeight: 'bold',
        }}>
        Wilson Franci
      </Text>
      <Text style={{ marginLeft: 25, marginTop: 5, fontSize: 14 }}>
        Lorem Ipsum is simply dummy text of the {'\n'}
        printing and typesetting industry.
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Editprofile')}>
          <Text style={styles.button}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.button}>Website</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lan}>
        <TouchableOpacity style={{ flexDirection: 'row' }}
          onPress={() => navigation.navigate('Utilities')}>
          <Image
            style={{ height: 30, width: 30 }}
            source={require('../../assets/Utilities.png')}
          />
          <Text style={styles.text1}>Utilities</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lan}>
        <TouchableOpacity style={{ flexDirection: 'row' }}
          onPress={() => navigation.navigate('Feedback')}>
          <Image
            style={{ height: 30, width: 30 }}
            source={require('../../assets/Feedback.png')}
          />
          <Text style={styles.text1}>Feedback</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lan}>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => navigation.navigate('Notification')}
          >
          <Image
            style={{ height: 30, width: 30 }}
            source={require('../../assets/51.png')}
          />
          <Text style={styles.text1}>Notification</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lan}>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => navigation.navigate('Language')}>
          <Image
            style={{ height: 30, width: 30 ,marginLeft:5}}
            source={require('../../assets/language.png')}
          />
          <Text style={styles.text1}>Language</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lan}>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Image
            style={{ height: 25, width: 25, marginLeft: 5 }}
            source={require('../../assets/18.png')}
          />
          <Text style={styles.text1}>Logout</Text>
        </TouchableOpacity>
      </View>
      {profileImage && (
        <Image source={{ uri: profileImage }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    marginTop: 50,
    fontSize: 40,
    fontWeight: '700',
    color: 'black',
    marginLeft: 135,
  },
  image: {
    marginLeft: 25,
    marginTop: 30,
    height: 100,
    width: 100,
  },
  text1: {
    fontSize: 20,
    color: 'black',
    marginLeft: 25,
  },
  text2: {
    marginTop: 50,
    fontSize: 20,

    color: 'black',
    marginLeft: 25,
  },
  profile: {
    flexDirection: 'row',
  },
  text3: {
    marginTop: 50,
    color: 'black',
    fontSize: 18,
    marginLeft: 20,
  },
  text4: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 15,
  },
  button: {
    height: 50,
    width: 150,
    marginLeft: 25,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#1877F2',
    paddingVertical: 15,
    color: 'white',
    borderColor: 'white',
  },
  lan: {
    marginTop: 40,
    marginLeft: 25,
  },
  up: {
    marginLeft: 30,
    // marginTop: 30,
    fontSize: 20,
    color: 'black',
  },
});
export default Profile;
