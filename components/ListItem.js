import React, {useContext} from 'react';
import {ActivityIndicator, Alert, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {ListItem as NBListItem, Avatar, Button} from 'react-native-elements';
import {deleteFile} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const mediaUploads = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = ({navigation, singleMedia, loadUserMedia}) => {
  const {setRefreshImages} = useContext(MainContext);

  const onPressViewItem = () => {
    navigation.navigate('Single', {
      media: singleMedia,
    });
  };

  const onPressDelete = async () => {
    const removeSucceed = await deleteFile(singleMedia.file_id);
    if (removeSucceed) {
      setRefreshImages(true);
      Alert.alert('Successfully removed file.');
    } else {
      Alert.alert('Could not remove file. Please try again later.');
    }
  };

  const onPressModify = async () => {
    navigation.navigate('Modify', {
      media: singleMedia,
    });
  };

  return (
    <NBListItem bottomDivider>
      <Avatar
        source={{uri: mediaUploads + singleMedia.thumbnails.w640}}
        renderPlaceholderContent={
          <ActivityIndicator color="#ccc" size="small" />
        }
        placeholderStyle={{backgroundColor: '#fff'}}
        size="large"
      />
      <NBListItem.Content>
        <NBListItem.Title>{singleMedia.title}</NBListItem.Title>
        <NBListItem.Subtitle>{singleMedia.description}</NBListItem.Subtitle>
      </NBListItem.Content>
      <View style={styles.itemButtons}>
        <Button
          title="View"
          onPress={onPressViewItem}
          style={styles.itemButton}
        />
        {loadUserMedia && (
          <>
            <Button
              title="Modify"
              onPress={onPressModify}
              style={styles.itemButton}
              buttonStyle={{backgroundColor: 'orange'}}
            />
            <Button
              title="Delete"
              onPress={onPressDelete}
              style={styles.itemButton}
              buttonStyle={{backgroundColor: 'red'}}
            />
          </>
        )}
      </View>
    </NBListItem>
  );
};

const styles = StyleSheet.create({
  mediaItem: {
    marginTop: 4,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  itemImageContainer: {
    flex: 1,
    padding: 20,
  },
  itemImage: {
    flex: 1,
    width: 100,
    height: 100,
  },
  itemTextContainer: {
    flex: 1,
    padding: 20,
  },
  itemCaption: {
    flex: 1,
    fontWeight: 'bold',
  },
  itemDescription: {
    flex: 1,
    marginTop: 6,
  },
  itemButtons: {
    padding: 4,
    justifyContent: 'center',
  },
  itemButton: {
    marginTop: 4,
    marginBottom: 4,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  loadUserMedia: PropTypes.bool,
};

export default ListItem;
