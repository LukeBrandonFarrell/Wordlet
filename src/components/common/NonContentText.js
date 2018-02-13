import React from 'react';
import { Text, StyleSheet } from 'react-native';

const NonContentText = ({ children }) => {
  return (
    <Text style={ styles.textStyle }>
      { children }
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle : {
    marginTop: 100,
    fontSize: 32,
    color: '#b4b4b4',
    alignSelf: 'center',
  }
});

export { NonContentText };
