import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ label, onPress, style, disabled }) => {
  const { buttonStyle, textStyle } = styles;
  const buttonColor = disabled ? '#40307555' : '#403075';

  return (
    <TouchableOpacity onPress={onPress} disabled={ disabled }>
      <View style={[buttonStyle, { backgroundColor: buttonColor, }, style ]}>
        <Text style={textStyle}>{ label }</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height:50,
    marginTop: 8,
    marginBottom: 8,
    justifyContent: 'center',
    overflow:'hidden',
    borderRadius: 5,
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'white',
  }
});

export { CustomButton };
