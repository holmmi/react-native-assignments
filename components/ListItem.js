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
    marginTop: 8,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#233043',
  },
  itemImageContainer: {
    flex: 1,
    padding: 10,
  },
  itemImage: {
    width: 'auto',
    height: 100,
    borderBottomLeftRadius: 50,
  },
  itemTextContainer: {
    flex: 1,
    padding: 10,
  },
  itemCaption: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  itemDescription: {
    marginTop: 4,
    fontSize: 14,
    color: '#E0E0E0',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
