import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Error = ({ label }) => {
  const { errorContainer, textContainer } = styles;

  return (
    <View style={errorContainer}>
      <Text style={textContainer}>{ label }</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer : {
    width: '100%',
    paddingBottom: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  textContainer : {
    color: '#cb1515',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export {Error};
