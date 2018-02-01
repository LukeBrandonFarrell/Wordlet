import React from 'react';
import { View, StyleSheet, PixelRatio } from 'react-native';

const Card = ({ children, style }) => {
  const { containerStyle } = styles;

  return (
    <View style={[containerStyle, style]}>
      { children }
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle : {
    padding: 15,
    backgroundColor: 'white',
    borderBottomColor: '#ececec',
    borderBottomWidth: PixelRatio.get() / 2,
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export { Card };
