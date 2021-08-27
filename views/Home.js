import React from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import List from '../components/List';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <List navigation={navigation} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

export default Home;
