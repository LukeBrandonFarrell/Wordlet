import React from 'react';
import { View, StyleSheet } from 'react-native';

const Footer = ({ children }) => {
  const { footerStyle } = styles;

  return (
    <View style={footerStyle}>
      { children }
    </View>
  );
};

const styles = StyleSheet.create({
  footerStyle : {
    width: '100%',
    position: 'absolute',
    bottom: 5,
  }
});

export {Footer};
