import React from 'react';
import { View, StyleSheet } from 'react-native';

const NarrowContainer = ({ children, style }) => {
  return (
    <View style={[ styles.container, style ]}>
      { children }
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    paddingLeft: 20,
    paddingRight: 20,
  }
});

export {NarrowContainer};
