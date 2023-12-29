import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import firebase from '../UploadNews/firebase';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
const Feedback = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [answer, setAnswer] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    // Load saved data from AsyncStorage
    loadData();
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleAnswerChange = text => {
    setAnswer(text);
  };

  const handleEmailChange = text => {
    setEmail(text);
  };

  const saveData = () => {
    try {
      // Lưu dữ liệu lên Firebase Realtime Database
      firebase.database().ref('feedback').push({
        answer: answer,
        email: email,
        isChecked: isChecked,
        isChecked1: isChecked1,
      });
      Alert.alert('Thông báo', 'Gửi thành công');
      navigation.navigate('About');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };
  const clearData = () => {
    setAnswer('');
    setEmail('');
    setIsChecked(false);
    setIsChecked1(false);
  };
  const loadData = () => {
    try {
      // Load dữ liệu từ Firebase Realtime Database
      firebase
        .database()
        .ref('feedback')
        .once('value', (snapshot) => {
          const data = snapshot.val();
          if (data !== null) {
            const keys = Object.keys(data);
            const lastKey = keys[keys.length - 1];
            const savedAnswer = data[lastKey].answer;
            const savedEmail = data[lastKey].email;
            const savedIsChecked = data[lastKey].isChecked;
            const savedIsChecked1 = data[lastKey].isChecked1;
  
            setAnswer(savedAnswer);
            setEmail(savedEmail);
            setIsChecked(savedIsChecked);
            setIsChecked1(savedIsChecked1);
          }
        });
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  return (
    <View>
      <ScrollView>
        <View>
          <Image
            style={{width: 350, height: 100, marginTop: 40, marginLeft: 20}}
            source={require('../../assets/th1.png')}
          />
        </View>

        <View>
          <Text style={{fontSize: 33, marginLeft: 20, color: 'black'}}>
            Góp ý cho ứng dụng{'\n'} App News
          </Text>
        </View>
        <Text>
          -------------------------------------------------------------------------------------------------
        </Text>
        <View
          style={{marginTop: 20}}>
          <Text style={{fontSize: 26, marginLeft: 20, color: 'black'}}>
            Theo ban, ứng dụng App News có điểm gì cần cải thiện để bạn có trải
            nghiệm đọc tốt hơn?
          </Text>

          <TextInput
            style={{marginTop: 20, marginLeft: 20, fontSize: 18}}
            placeholder="Câu trả lời của bạn"
            value={answer}
            onChangeText={handleAnswerChange}
          />
        </View>
        <Text>
          -------------------------------------------------------------------------------------------------
        </Text>
        <View>
          <Text style={{fontSize: 26, marginLeft: 20, color: 'black'}}>
            Hệ điều hành của thiết bị
          </Text>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isChecked}
              onValueChange={handleCheckboxChange}
              tintColors={{true: '#1877F2', false: 'gray'}}
              boxType="circle"
              lineWidth={1}
            />
            <Text style={{color: 'black'}}>Android </Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isChecked1}
              onValueChange={handleCheckboxChange1}
              tintColors={{true: '#1877F2', false: 'gray'}}
              boxType="circle"
              lineWidth={1}
            />
            <Text style={{color: 'black'}}>IOS </Text>
          </View>
        </View>
        <Text>
          -------------------------------------------------------------------------------------------------
        </Text>
        <View>
          <Text style={{fontSize: 26, marginLeft: 20, color: 'black'}}>
            Email của bạn (không bắt buộc):
          </Text>

          <TextInput
            style={{marginTop: 20, marginLeft: 20, fontSize: 18}}
            placeholder="Câu trả lời của bạn"
            value={email}
            onChangeText={handleEmailChange}
          />
        </View>
        <Text>
          -------------------------------------------------------------------------------------------------
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20}}>
          <TouchableOpacity
            style={{
              width: 50,
              height: 40,
              backgroundColor: '#AF2655',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={saveData} // Save data when the button is pressed
          >
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
              Gửi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 150}} onPress={clearData}>
            <Text style={{fontWeight: 'bold', color: '#AF2655', fontSize: 18}}>
              Xóa hết câu trả lời
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{fontSize: 14, marginLeft: 20, color: 'black', marginTop: 20}}>
          Không bao giờ gửi mật khẩu thông qua Google Biểu mẫu.
        </Text>
        <Text
          style={{fontSize: 14, marginLeft: 20, color: 'black', marginTop: 20}}>
          Nội dung này không phải do Google tạo ra hay xác nhận.
        </Text>
        <Text
          style={{fontSize: 30, marginLeft: 70, color: 'black', marginTop: 20}}>
          Google Biểu mẫu
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
});

export default Feedback;
