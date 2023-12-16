import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(async image => {
        setProfileImage(image.path);
        try {
          await AsyncStorage.setItem('profileImage', image.path);
          console.log('Profile image saved successfully');
        } catch (error) {
          console.log('Error saving profile image:', error);
        }
      })
      .catch(error => {
        console.log('Error selecting profile image:', error);
      });
  };

  const saveProfileData = async () => {
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('fullName', fullName);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('phoneNumber', phoneNumber);
      await AsyncStorage.setItem('bio', bio);
      await AsyncStorage.setItem('website', website);
      console.log('Profile data saved successfully');
    } catch (error) {
      console.log('Error saving profile data:', error);
    }
  };

  const restoreProfileData = async () => {
    try {
      const savedProfileImage = await AsyncStorage.getItem('profileImage');
      const savedUsername = await AsyncStorage.getItem('username');
      const savedFullName = await AsyncStorage.getItem('fullName');
      const savedEmail = await AsyncStorage.getItem('email');
      const savedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
      const savedBio = await AsyncStorage.getItem('bio');
      const savedWebsite = await AsyncStorage.getItem('website');

      if (savedProfileImage !== null) {
        setProfileImage(savedProfileImage);
      }
      if (savedUsername !== null) {
        setUsername(savedUsername);
      }
      if (savedFullName !== null) {
        setFullName(savedFullName);
      }
      if (savedEmail !== null) {
        setEmail(savedEmail);
      }
      if (savedPhoneNumber !== null) {
        setPhoneNumber(savedPhoneNumber);
      }
      if (savedBio !== null) {
        setBio(savedBio);
      }
      if (savedWebsite !== null) {
        setWebsite(savedWebsite);
      }
    } catch (error) {
      console.log('Error restoring profile data:', error);
    }
  };

  const onSaveProfile = () => {
    saveProfileData();
  };

  useEffect(() => {
    restoreProfileData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.image} source={require('../assets/22.png')} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'black'}}>Edit Profile</Text>
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
        <Image source={{uri: profileImage}} style={styles.profileImage} />
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
