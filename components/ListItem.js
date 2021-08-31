import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {ListItem as NBListItem, Avatar, Button} from 'react-native-elements';

const mediaUploads = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = ({navigation, singleMedia}) => {
  const onPressItem = () => {
    navigation.navigate('Single', {
      title: singleMedia.title,
      fileName: singleMedia.filename,
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
      <Button title="View" onPress={onPressItem} />
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
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
