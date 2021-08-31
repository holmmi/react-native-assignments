import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Text, ListItem, Button, Icon} from 'react-native-elements';
import {getUserAvatar} from '../hooks/ApiHooks';

const mediaUploads = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = () => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const getAvatarFileName = async () => {
      setAvatarFile(await getUserAvatar(user.user_id));
    };
    getAvatarFileName();
  }, []);

  const logOut = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <ListItem>
          <Icon name="person-outline" type="ionicon" color="tomato" />
          <ListItem.Content>
            <ListItem.Title>Username: {user.username}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        {avatarFile && (
          <Card.Image
            source={{uri: mediaUploads + avatarFile}}
            resizeMode="center"
            PlaceholderContent={<ActivityIndicator color="#fff" size="large" />}
          />
        )}
        <Card.Divider style={{paddingTop: 20}} />
        <Text>Fullname: {user.full_name}</Text>
        <Text>E-mail: {user.email}</Text>
        <Card.Divider style={{paddingTop: 20}} />
        <Button
          title="Logout"
          onPress={logOut}
          buttonStyle={{backgroundColor: 'tomato'}}
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
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
});

export default Profile;
