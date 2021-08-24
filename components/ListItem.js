import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const mediaUploads = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.mediaItem}>
      <View style={styles.itemImageContainer}>
        <Image
          style={styles.itemImage}
          source={{uri: mediaUploads + props.singleMedia.thumbnails.w640}}
        />
      </View>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemCaption}>{props.singleMedia.title}</Text>
        <Text style={styles.itemDescription}>
          {props.singleMedia.description}
        </Text>
      </View>
    </TouchableOpacity>
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
