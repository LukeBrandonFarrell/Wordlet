import React from 'react';
import { View, StyleSheet } from 'react-native';

const CardSection = ({ children, style }) => {
  return (
    <View style={[styles.containerStyle, style]}>
      { children }
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle : {
    flex: 1,
    flexDirection: 'row',
  }
});

export { CardSection };
