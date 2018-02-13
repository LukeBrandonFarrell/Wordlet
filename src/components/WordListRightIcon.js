import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class WordListRightIcon extends React.Component {
  render(){
    const { data, icon } = this.props;

    return (
      <TouchableOpacity onPress={() => this.props.onPress(this.props.data)} style={styles.containerStyle}>
        <View style={styles.iconContainer}>
          <Icon style={ styles.iconStyle } name={icon} size={32}/>
        </View>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  containerStyle : {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconContainer : {
    width: (Dimensions.get('window').width / 4),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  iconStyle : {
    color: 'white',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  }
});

export default WordListRightIcon;
