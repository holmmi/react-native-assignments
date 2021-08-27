import React from 'react';
import {ImageBackground, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Menu} from 'react-native-feather';

const mediaUploads = 'http://media.mw.metropolia.fi/wbma/uploads/';

const HeaderImage = ({fileName}) => {
  return (
    <ImageBackground
      source={{uri: `${mediaUploads}/${fileName}`}}
      resizeMode="cover"
      style={styles.image}
    >
      <Menu style={styles.menu} width={32} height={32} />
      <Text style={styles.text}>Random images</Text>
    </ImageBackground>
  );
};

HeaderImage.propTypes = {
  fileName: PropTypes.string,
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    position: 'relative',
  },
  menu: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#fff',
  },
  text: {
    position: 'absolute',
    bottom: 20,
    padding: 20,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: '#151D28c0',
  },
});

export default HeaderImage;
