import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image, View} from 'react-native';
import AsyncImage from '../components/AsyncImage';

const mediaUploads = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = ({route}) => {
  const {title, fileName} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <AsyncImage
          sourceUrl={mediaUploads + fileName}
          style={styles.image}
          indicatorColor="#ccc"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  title: {
    textAlign: 'center',
  },
  image: {
    marginTop: 10,
    width: 200,
    height: 200,
  },
});

export default Single;
