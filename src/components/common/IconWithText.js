import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const IconWithText = (props) => {
  const { children, icon, text, iconSize, textSize, iconColor, textColor } = props;
  const { containerStyle, textStyle, iconStyle } = styles;

  return (
    <View style={containerStyle}>
      <Icon style={[iconStyle, {color: iconColor}]} name={icon} size={iconSize}/>
      <Text style={[textStyle, {fontSize: textSize, color: textColor}]}>{text}</Text>
      { children }
    </View>
  );
};

IconWithText.defaultProps = {
  iconSize: 22,
  iconColor: '#212121',
  textColor: '#212121',
};

const styles = StyleSheet.create({
  containerStyle : {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle : {
    fontSize: 24,
  },
  iconStyle : {
    marginRight: 7,
  }
});

export { IconWithText };
