import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const sigUpTestFn = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User Created ' + email, password);
        navigation.navigate('LoginScreen');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken, user } = await GoogleSignin.signIn();

      console.log(user);
      // Alert.alert('Success login');
      navigation.navigate('About');
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '425428980343-vcjgrk946irajihkct8htkr59d3idjfj.apps.googleusercontent.com',
    });
  }, [])
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.text}> Hello!</Text>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            marginLeft: 20,
            marginTop: 10,
            // marginBottom: 70,
          }}>
          Signup to get Started
        </Text>
        <Text style={{ marginTop: 50, marginLeft: 20 }}>Username*</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Tên đăng nhập"
        />
        <Text style={{ marginLeft: 20 }}>Mật khẩu*</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Mật khẩu"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>

            <Image
              style={[styles.icon, { marginLeft: 250 }]}
              source={showPassword ? require('../../assets/8_hide.png') : require('../../assets/8.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={rememberMe}
            onValueChange={handleCheckboxChange}
            tintColors={{ true: '#1877F2', false: 'gray' }}
            boxType="circle"
            lineWidth={1}
          />
          <Text style={styles.label}>Remember me </Text>
          <Text style={{ color: '#1877F2', marginLeft: 100 }}>
            Forgot the password ?
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={sigUpTestFn}>
          <Text style={styles.buttonText}>Đăng Ký</Text>
        </TouchableOpacity>


        <Text style={styles.orText}>or continue with</Text>

        <View style={styles.socialButtonContainer}>
          <TouchableOpacity onPress={onFacebookButtonPress}>
            <View style={styles.socialButton}>
              <Image
                style={styles.socialIcon}
                source={require('../../assets/9.png')}
              />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={onGoogleButtonPress}>
            <View style={styles.socialButton}>
              <Image
                style={styles.socialIcon}
                source={require('../../assets/10.png')}
              />
              <Text style={styles.socialButtonText}>Google</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Already have an account ?</Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.signInButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 140,
  },
  container: {},
  text: {
    color: '#1877F2',
    fontSize: 50,
    fontWeight: '700',
    marginLeft: 10,
  },
  subtitle: {
    color: 'black',
    fontSize: 20,
    marginLeft: 20,
    marginTop: 10,
  },

  input: {
    height: 40,
    width: 370,
    marginHorizontal: 16,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 10,
    marginLeft: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: 370,
    marginHorizontal: 16,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 10,
    marginLeft: 20,
  },
  passwordIcon: {
    marginLeft: 250,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  button: {
    height: 40,
    margin: 4,
    backgroundColor: '#1877F2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 16,
    marginLeft: 20,
    marginTop: 15,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  orText: {
    color: 'gray',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
  },
  socialButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    height: 40,
    width: 150,
    margin: 4,
    backgroundColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 16,
    marginLeft: 10,
    flexDirection: 'row',
  },
  socialIcon: {
    marginRight: 10,
  },
  socialButtonText: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 18,
  },
  signInContainer: {
    flexDirection: 'row',
    marginBottom: 100,
  },
  signInText: {
    marginTop: 17,
  },
  signInButton: {
    margin: 4,
    marginHorizontal: 16,
    marginLeft: 20,
    marginTop: 15,
  },
  signInButtonText: {
    fontWeight: 'bold',
    color: '#1877F2',
    fontSize: 18,
  },
  label: {
    marginLeft: 2,
    color: 'black',
  },
  icon: {
    height: 25,
    width: 30
  }
});
