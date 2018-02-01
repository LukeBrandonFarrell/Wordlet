import React from 'react';
import { View, StyleSheet } from 'react-native';

const Row = ({ children, padding, verticalPadding, horizontalPadding, style }) => {
  return (
    <View style={[
      { padding },
      {
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
        paddingTop: verticalPadding,
        paddingBottom: verticalPadding
      },
      style
    ]}>
      { children }
    </View>
  );
};

export {Row};
