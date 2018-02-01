import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextBlock = ({ children, color, style }) => {
  return (
    <Text style={[styles.textStyle, { color: color }, style]}>
      { children }
    </Text>
  );
};

TextBlock.defaultProps = {
  color: 'black',
};

const styles = StyleSheet.create({
  textStyle : {
    paddingBottom: 5,
  }
});

export {TextBlock};
