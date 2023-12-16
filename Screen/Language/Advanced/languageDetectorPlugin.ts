import AsyncStorage from '@react-native-async-storage/async-storage';
import {LanguageDetectorAsyncModule} from 'i18next';

const STORE_LANGUAGE_KEY = 'settings.lang';

export const languageDetectorPlugin: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: callback => {
    try {
      AsyncStorage.getItem(STORE_LANGUAGE_KEY).then(language => {
        if (language) {
          return callback(language);
        } else {
          return callback('en');
        }
      });
    } catch (error) {
      console.log('Error reading language', error);
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {}
  },
};
