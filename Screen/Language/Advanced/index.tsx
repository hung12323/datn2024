import React from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import './i18n.config';
import {useTranslation} from 'react-i18next';
import LanguagePicker from './LanguagePicker';
import {StatusBar} from 'react-native';

export default function App() {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <LanguagePicker />
      <Text style={styles.text}>{`${t('HELLO')}!`}</Text>
      <Button title={t('PRESS')} onPress={() => Alert.alert(t('HELLO'))} />
      <StatusBar barStyle={'default'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
});
