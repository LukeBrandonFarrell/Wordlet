import React from 'react';
import { View, Image, StyleSheet, Platform } from 'react-native';

const Logo = ({ url, style }) => {
  return (
    <View style={styles.container}>
      <Image source={url} style={[styles.logoImage, style]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoImage: {
    width: '60%',
    height: 65,
    marginTop: 35,
    ...Platform.select({
      ios: {
        marginTop: 35,
      },
      android: {
        marginTop: 25,
      }
    }),
  },
});

export {Logo};
