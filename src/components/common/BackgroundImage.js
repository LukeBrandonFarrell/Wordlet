import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const BackgroundImage = ({ url }) => {
  return (
    <View style={styles.backgroundImageContainer}>
      <Image source={url} style={styles.backgroundImage} />
      <View style={styles.tint}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImageContainer : {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  tint: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.65)',
  },
});

export {BackgroundImage};
