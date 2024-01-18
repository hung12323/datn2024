import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from './UploadNews/firebase'; // Import Firebase

const EditProfile = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');

  const selectProfileImage = () => {
    // Các phần xử lý liên quan đến chọn hình ảnh
  };

  const saveProfileData = async () => {
    try {
      // Lưu dữ liệu lên Firebase Realtime Database
      await firebase.database().ref('edprofile').set({
        username,
        fullName,
        email,
        phoneNumber,
        bio,
        website,
      });

      console.log('Profile data saved successfully');
      Alert.alert('Sửa thông tin thành công')
    } catch (error) {
      console.log('Error saving profile data:', error);
    }
  };

  const onSaveProfile = () => {
    saveProfileData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.image} source={require('../assets/22.png')} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: 'black' }}>Edit Profile</Text>
        <TouchableOpacity onPress={onSaveProfile}>
          <Image style={styles.image} source={require('../assets/23.png')} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={selectProfileImage}>
        <Image
          style={styles.profileImage}
          source={require('../assets/Profile.png')}
        />
      </TouchableOpacity>
      {profileImage && (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      )}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <Text style={styles.label}>Email Address*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Text style={styles.label}>Phone Number*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your bio"
        value={bio}
        onChangeText={text => setBio(text)}
      />
      <Text style={styles.label}>Website</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your website"
        value={website}
        onChangeText={text => setWebsite(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  image: {
    width: 20,
    height: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginHorizontal: 120,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default EditProfile;