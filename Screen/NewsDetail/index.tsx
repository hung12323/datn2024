import React from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import Head from '../Head';
import Footer from '../Footer';
const NewsDetail: React.FC = ({route}) => {
  const {url} = route.params;

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        <Head />
        <Text
          style={{
            marginTop: 60,
            marginLeft: -210,
            fontSize: 20,
            color: 'black',
          }}>
          NewsDetail
        </Text>
      </View>

      <WebView source={{uri: url}} />
      <View style={{marginLeft: 20}}>
        <Footer />
      </View>
    </View>
  );
};

export default NewsDetail;
