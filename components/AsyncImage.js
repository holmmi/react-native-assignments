import React, {useState} from 'react';
import {View, ActivityIndicator, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const AsyncImage = ({sourceUrl, style, indicatorColor = '#fff'}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={styles.container}>
      {!loaded && (
        <ActivityIndicator
          style={styles.indicator}
          size="large"
          color={indicatorColor}
        />
      )}
      <Image
        source={{uri: sourceUrl}}
        onLoad={() => setLoaded(true)}
        style={style}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

AsyncImage.propTypes = {
  sourceUrl: PropTypes.string,
  style: PropTypes.object,
  indicatorColor: PropTypes.string,
};

export default AsyncImage;
