import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from './Card';

const Subtitle = ({ label }) => {
  return (
    <Text style={styles.titleStyle}>{label}</Text>
  );
};

const styles = StyleSheet.create({
  titleStyle : {
    fontSize: 20,
    paddingBottom: 5,
  }
});

export { Subtitle };
