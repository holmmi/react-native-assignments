import React from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import List from './components/List';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#151D28" barStyle="light-content" />
      <List />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151D28',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

export default App;
