import React from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';

/** Hooks */
import {useLoadMedia} from '../hooks/ApiHooks';

const List = () => {
  const mediaArray = useLoadMedia();

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
