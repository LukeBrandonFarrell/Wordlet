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
    flex: 1,
    marginBottom: 70,
    justifyContent: 'flex-end',
  }
});

export {Footer};
