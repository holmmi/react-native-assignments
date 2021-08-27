import React from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';

/** Hooks */
import {useLoadMedia} from '../hooks/ApiHooks';

const List = ({navigation}) => {
  const mediaArray = useLoadMedia();

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({item}) => (
        <ListItem navigation={navigation} singleMedia={item} />
      )}
    />
  );
};

export default List;
