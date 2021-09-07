import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import List from '../components/List';

const MyFiles = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <List navigation={navigation} loadUserMedia={true} />
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

export default MyFiles;
