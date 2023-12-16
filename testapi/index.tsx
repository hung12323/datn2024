// src/App.js
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import About from './About';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <About />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
