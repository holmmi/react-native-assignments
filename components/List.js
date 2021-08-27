import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import HeaderImage from './HeaderImage';
import ListItem from './ListItem';

/** Hooks */
import {useLoadMedia} from '../hooks/ApiHooks';

const List = () => {
  const mediaArray = useLoadMedia();

  const randomImage = () => {
    return mediaArray[Math.round(Math.random() * (mediaArray.length - 1))]
      .filename;
  };

  return (
    <React.Fragment>
      <View style={styles.header}>
        {mediaArray !== null && <HeaderImage fileName={randomImage()} />}
      </View>
      <View style={styles.list}>
        <FlatList
          style={styles.list}
          data={mediaArray}
          keyExtractor={(item) => item.file_id.toString()}
          renderItem={({item}) => <ListItem singleMedia={item} />}
        />
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  list: {
    flex: 2,
  },
});

export default List;
