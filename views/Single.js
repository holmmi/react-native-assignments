import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image, View} from 'react-native';

const mediaUploads = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = ({route}) => {
  const {title, fileName} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Image source={{uri: mediaUploads + fileName}} style={styles.image} />
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
