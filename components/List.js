import React from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';
import PropTypes from 'prop-types';

/** Hooks */
import {useLoadMedia, useMyMedia} from '../hooks/ApiHooks';

const List = ({navigation, loadUserMedia}) => {
  const mediaArray = loadUserMedia ? useMyMedia() : useLoadMedia();

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({item}) => (
        <ListItem
          navigation={navigation}
          singleMedia={item}
          loadUserMedia={loadUserMedia}
        />
      )}
    />
  );
};

List.propTypes = {
  loadUserMedia: PropTypes.bool,
};

export default List;
