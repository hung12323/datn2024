import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import axios from 'axios';
import Head from '../Head';
const Utilities = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Hà Nội');

  useEffect(() => {
    fetchWeather();
  }, [selectedDate]);

  const fetchWeather = async () => {
    const apiKey = 'd5f6ab7b5eec6cbe85c3dde9a9fc3bbd';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(apiUrl);
      setWeather(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin thời tiết:', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getFormattedDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('vi-VN', options);
    return formattedDate;
  };

  return (
    <View style={styles.container}>
      
      <View style={{ flexDirection: 'row', marginRight: 150 }}>
        <Head />
        <Text
          style={{
            marginTop: 60,
            marginLeft: -200,
            fontSize: 20,
            color: 'black',
            marginBottom: 10,
          }}>
          Untilities
        </Text>
      </View>
      <ScrollView>
      <View style={styles.calendarContainer}>
      <Text style={styles.title}>Lịch</Text>
        <Text style={styles.dateText}>{getFormattedDate(selectedDate)}</Text>
        <View style={{ width: '100%',height:'100%' }}>
          <CalendarPicker
            onDateChange={handleDateChange}
            selectedDate={selectedDate}

          />
        </View>

      </View>
      <View style={styles.weatherContainer}>
      <Text style={styles.title}>Thời Tiết</Text>
        {weather && (
          <>
          <View style={{marginBottom:30}}> 
            <Text style={styles.weatherText}>Thành phố: {city}</Text>
            <Text style={styles.weatherText}>Thời tiết: {weather.weather[0].description}</Text>
            <Text style={styles.weatherText}>Nhiệt độ: {weather.main.temp}°C</Text>
            <Text style={styles.weatherText}>Độ ẩm: {weather.main.humidity}%</Text>
            <Text style={styles.weatherText}>Áp suất không khí: {weather.main.pressure} hPa</Text>
            <Text style={styles.weatherText}>Lượng mưa: {weather.rain && weather.rain['1h'] ? weather.rain['1h'] : 0} mm</Text>
            <Text style={styles.weatherText}>Chỉ số UV: {weather.uvi}</Text>
            </View>
           
          </>
        )}
      </View>
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFECD6',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginRight:250
  },
  calendarContainer: {
    flex: 1.7,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    width: '95%',
   
    
  },
  dateText: {
    fontSize: 18,
    marginBottom: 10,

  },
  weatherContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    width: '95%',
    marginTop: 30
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Utilities;