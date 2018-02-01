import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Title = ({ label }) => {
  return (
    <Text style={styles.titleStyle}>{label}</Text>
  );
};

const styles = StyleSheet.create({
  titleStyle : {
    fontSize: 24,
    paddingBottom: 5,
  }
});

export { Title };
