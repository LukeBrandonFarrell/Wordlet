import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Card, Subtitle, TextBlock } from './common';
import { Actions } from 'react-native-router-flux';

import { setWord, setDefinitions } from '../actions';
import { connect } from 'react-redux';

const firstToUC = require('../helpers/format.js');

class WordItem extends React.Component {
  selectWord(){
    const { word, definition } = this.props.data;

    this.props.setWord(word);
    this.props.setDefinitions([definition]);

    Actions.WordDetail();
  }

  render() {
    const { word, definition } = this.props.data;

    return (
      <TouchableHighlight onPress={() => this.selectWord() }>
        <Card style={{ flexDirection: 'column', alignItems: 'flex-start'}}>
          <Subtitle label={ firstToUC(word) } />
          <TextBlock>
            { firstToUC(definition) }
          </TextBlock>
        </Card>
      </TouchableHighlight>
    );
  }
}

export default connect(null, { setWord, setDefinitions })(WordItem);
