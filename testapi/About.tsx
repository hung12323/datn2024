import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {setArticles, setLoading, setPage} from './actions/articlesActions';

const About: React.FC = () => {
  const articles = useSelector(state => state.articles);
  const loading = useSelector(state => state.loading);
  const page = useSelector(state => state.page);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      dispatch(setLoading(true));

      const url = `https://newsapi.org/v2/everything?q=tesla&from=2023-08-25&sortBy=publishedAt&apiKey=548d98c0e74543179eb939adda12dbe4`;

      const response = await axios.get(url);
      const data = response.data;

      if (page === 1) {
        dispatch(setArticles(data.articles));
      } else {
        dispatch(setArticles([...articles, ...data.articles]));
      }

      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error fetching news:', error);
      dispatch(setLoading(false));
    }
  };

  const handleImagePress = (article: any) => {
    const {url} = article;
    navigation.navigate('NewsDetail', {url});
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(setPage(1));
    fetchNews().then(() => {
      setRefreshing(false);
    });
  };

  const handleLoadMore = () => {
    if (!loading) {
      dispatch(setPage(page + 1));
      fetchNews();
    }
  };

  const renderArticle = ({item}: {item: any}) => {
    return (
      <View style={styles.articleContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity onPress={() => handleImagePress(item)}>
          <Image source={{uri: item.urlToImage}} style={styles.image} />
        </TouchableOpacity>
        <Text>---</Text>
      </View>
    );
  };

  return (
    <View>
      <Text>News Articles:</Text>
      {loading && articles.length === 0 ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={articles}
          renderItem={renderArticle}
          keyExtractor={(item, index) => index.toString()}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default About;
