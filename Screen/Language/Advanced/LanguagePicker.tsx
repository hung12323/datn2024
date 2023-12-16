import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, View, Text, Pressable, StyleSheet} from 'react-native';

const LanguageItem = ({
  name,
  label,
  onPress,
}: {
  name: string;
  label: string;
  onPress: () => void;
}) => (
  <Pressable key={name} style={styles.button} onPress={onPress}>
    <Text style={styles.textStyle}>{label}</Text>
  </Pressable>
);

const LanguagePicker = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {i18n} = useTranslation();

  const languages = [
    {name: 'de', label: 'Deutsch'},
    {name: 'en', label: 'English'},
    {name: 'fr', label: 'Français'},
    {name: 'be', label: 'Беларуская'},
    {name: 'es', label: 'Español'},
    {name: 'vi', label: 'Vietnamese'},
  ];

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {languages.map(lang => (
              <LanguageItem
                {...lang}
                key={lang.name}
                onPress={() => {
                  i18n.changeLanguage(lang.name);
                  setModalVisible(!modalVisible);
                }}
              />
            ))}
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>{i18n.language}</Text>
      </Pressable>
    </View>
  );
};

export default LanguagePicker;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: '#f36293fd',
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
