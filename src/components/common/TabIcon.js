import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class TabIcon extends React.Component {
  tabIconSize(){
    if(Platform.OS === 'android'){
      return 24;
    } else if(Platform.OS === 'ios'){
      return 30;
    }
  }

  render() {
    var color = this.props.tintColor;

    return (
      <View style={styles.tabContainer}>
        <Icon style={{color: color}} name={this.props.iconName || 'circle'} size={this.tabIconSize()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer : {
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    alignSelf:'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
      },
      android: {
        paddingTop: 30,
        paddingBottom: 30,
      }
    }),
  },
  textStyle: {
    ...Platform.select({
      ios: {
        fontSize: 11,
      },
      android: {
        fontSize: 14,
      }
    }),
  }
});

export { TabIcon };
