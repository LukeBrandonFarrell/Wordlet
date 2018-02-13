import React from 'react';
import { View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { Title, Subtitle, CustomButton, NarrowContainer, Footer, Row, IconWithText, TextBlock } from './common';
import { Actions } from 'react-native-router-flux';
import axios from 'react-native-axios';
import Toast from 'react-native-root-toast';

import { searchWordDetails, saveWord } from '../actions';
import { connect } from 'react-redux';

const firstToUC = require('../helpers/format.js');

const instance = axios.create({
  headers: {
    'X-Mashape-Key': 'rAHO82BrgJmshpIHJ8mpTVz2vvPyp1c0X1gjsn6UYDxEe7on7T',
    'X-Mashape-Host': 'wordsapiv1.p.mashape.com'
  }
});

class WordDetail extends React.Component {
  async componentWillMount() {
    const { word } = this.props;

    this.props.searchWordDetails(word);
  }

  saveWord(){
    const { word, definitions, synonyms, antonyms } = this.props;

    this.props.saveWord(word, definitions, synonyms, antonyms);
  }

  renderDefinitions(){
    const { definitions } = this.props;

    if(definitions){
      return definitions.map((element, i) => {
        let definition = (typeof element === 'object') ? element.definition : element;

        return(
          <TextBlock key={i}>
            - { firstToUC(definition) }
          </TextBlock>
        );
      });
    }
  }

  renderSynonyms(){
    const { synonyms } = this.props;

    if(synonyms.length > 0){
      const str = firstToUC(synonyms.join(', '));

      return (
        <View>
          <Subtitle label="Synonyms" />
          <TextBlock>
            { str }
          </TextBlock>
        </View>
      );
    }
  }

  renderAntonyms(){
    const { antonyms } = this.props;

    if(antonyms.length > 0){
      const str = firstToUC(antonyms.join(', '));

      return (
        <View>
          <Subtitle label="Antonyms" />
          <TextBlock>
            { str }
          </TextBlock>
        </View>
      );
    }
  }

  renderSaveButton(){
    if(!this.props.saved){
      return(
        <Footer>
          <NarrowContainer>
            <CustomButton label="Save" onPress={() => this.saveWord()} />
          </NarrowContainer>
        </Footer>
      );
    }
  }

  render() {
    const { word } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Row verticalPadding={12} style={{ backgroundColor: '#403075' }} />
        <Row verticalPadding={12} horizontalPadding={8}>
          <TouchableOpacity onPress={() => Actions.pop()}>
            <IconWithText
              icon="chevron-left"
              text="Back"
              textSize={22}
              iconSize={20} />
          </TouchableOpacity>
        </Row>
        <ScrollView>
          <NarrowContainer style={{ paddingBottom: 100 }}>
            <Title label={ firstToUC(word) } />
            { this.renderDefinitions() }
            { this.renderSynonyms() }
            { this.renderAntonyms() }
          </NarrowContainer>
        </ScrollView>

        { this.renderSaveButton() }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { word, definitions, synonyms, antonyms, saved } = state.selectedWord;

  return { word, definitions, synonyms, antonyms, saved };
};

export default connect(mapStateToProps, { searchWordDetails, saveWord })(WordDetail);
