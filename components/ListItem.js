import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.mediaItem}>
      <View style={styles.itemImageContainer}>
        <Image
          style={styles.itemImage}
          source={{uri: props.singleMedia.thumbnails.w160}}
        />
      </View>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemCaption}>{props.singleMedia.title}</Text>
        <Text>{props.singleMedia.description}</Text>
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
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'gray',
    width: '100%',
  },
  itemImageContainer: {
    flex: 1,
    padding: 20,
  },
  itemImage: {
    flex: 1,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemCaption: {
    flex: 1,
    fontWeight: 'bold',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
