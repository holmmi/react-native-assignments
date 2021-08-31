import React from 'react';
import {StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import {Card} from 'react-native-elements';

const mediaUploads = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = ({route}) => {
  const {title, fileName} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        <Card.Image
          resizeMode="cover"
          style={styles.image}
          source={{uri: mediaUploads + fileName}}
          PlaceholderContent={<ActivityIndicator color="#fff" size="large" />}
        />
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    height: 400,
  },
});

export default Single;
