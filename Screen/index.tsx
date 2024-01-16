import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import OnboadingScreen from './OnboadingScreen';
import LoginScreen from './LoginScreen';
// import Signup from './Signup';
import SignUp from './SignUp';
import Explore from './Explore';
import AppProvider from './AppContext';
// import HomePage from './HomePage';
import HomePage from './HomePage/About';
import Profile from './Profile';
import Trending from './Trending';
// import Bookmark from './Bookmark';
import Bookmark from './Bookmark';
import Head from './Head';
import Footer from './Footer';
import Latest from './Latest';
import Detail1 from './Detail1';
import Editprofile from './Editprofile';
import Comment from './Comment';
import UploadNews from './UploadNews';
import Output from './Output';
import Language from './Language/Advanced';
import Feedback from './Feedback';
import Utilities from './Utilities';
import Notification from './Notification';
import Politics from './Politics';
const Tab = createMaterialBottomTabNavigator();
const StackScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#1877F2"
      inactiveColor="gray"
      barStyle={{backgroundColor: 'white'}}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/11.png')}
              // style={{height: 30, width: 30}}
              resizeMode="stretch"
              style={{tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/12.png')}
              // style={{height: 30, width: 30}}
              resizeMode="stretch"
              style={{tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/13.png')}
              // style={{height: 30, width: 30}}
              resizeMode="stretch"
              style={{tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/14.png')}
              // style={{height: 30, width: 30}}
              resizeMode="stretch"
              style={{tintColor: color}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const Stack = createNativeStackNavigator();
export function Index() {
  return (
    <AppProvider>
      <NavigationContainer>
        {/* <Stack.Navigator> */}
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="OnboadingScreen" component={OnboadingScreen} />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{title: 'Welcome'}}
          />
          {/* <Stack.Screen name="HomePage" component={HomePage} /> */}

          <Stack.Screen name="About" component={StackScreen} />
          {/* <Stack.Screen name="Signup" component={Signup} /> */}
          <Stack.Screen name="SignUp" component={SignUp} />
          {/* <Stack.Screen name="About" component={About} /> */}
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Trending" component={Trending} />
          <Stack.Screen name="Head" component={Head} />
          <Stack.Screen name="Footer" component={Footer} />
          <Stack.Screen name="Latest" component={Latest} />
          <Stack.Screen name="Detail1" component={Detail1} />
          <Stack.Screen name="Editprofile" component={Editprofile} />
          <Stack.Screen name="Language" component={Language} />
          <Stack.Screen name="Comment" component={Comment} />
          <Stack.Screen name="UploadNews" component={UploadNews} />
          <Stack.Screen name="Output" component={Output} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="Utilities" component={Utilities} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Politics" component={Politics} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
