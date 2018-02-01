import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Subtitle, TextBlock } from './common';
import { Actions } from 'react-native-router-flux';

class WordItem extends React.Component {
  render() {
    const { word, definition } = this.props.data;

    return (
      <TouchableOpacity onPress={() => Actions.WordDetail({ data: this.props.data }) }>
        <Card style={{ flexDirection: 'column', alignItems: 'flex-start'}}>
          <Subtitle label={ word } />
          <TextBlock>
              A unit of language, consisting of one or more spoken sounds
              or their written representation, that functions as a principal carrier of meaning.
          </TextBlock>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default WordItem;
