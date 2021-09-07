import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import {Card, Text} from 'react-native-elements';
import {Video} from 'expo-av';
import {getUserInformation} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mediaUploads = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = ({route}) => {
  const {media} = route.params;

  const [fileOwnerInformation, setFileOwnerInformation] = useState(null);

  useEffect(() => {
    const getFileOwnerInformation = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        setFileOwnerInformation(
          await getUserInformation(userToken, media.user_id)
        );
      } catch (error) {
        throw error;
      }
    };
    getFileOwnerInformation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Card.Title>{media.title}</Card.Title>
        <Card.Divider />
        {media.media_type === 'image' ? (
          <Card.Image
            resizeMode="cover"
            style={styles.image}
            source={{uri: mediaUploads + media.filename}}
            PlaceholderContent={<ActivityIndicator color="#fff" size="large" />}
          />
        ) : (
          <Video
            source={{uri: mediaUploads + media.filename}}
            useNativeControls
            resizeMode="cover"
          />
        )}
        <Card.FeaturedSubtitle h3 style={styles.subtitle}>
          Title
        </Card.FeaturedSubtitle>
        <Text>{media.title}</Text>
        <Card.FeaturedSubtitle h3 style={styles.subtitle}>
          Description
        </Card.FeaturedSubtitle>
        <Text>{media.description}</Text>
        <Card.FeaturedSubtitle h3 style={styles.subtitle}>
          Author
        </Card.FeaturedSubtitle>
        {fileOwnerInformation && <Text>{fileOwnerInformation.username}</Text>}
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
  subtitle: {
    paddingTop: 10,
    paddingBottom: 4,
    color: 'black',
  },
});

export default Single;
