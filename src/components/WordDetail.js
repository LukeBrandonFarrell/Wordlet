import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { Title, Subtitle, CustomButton, NarrowContainer, Footer, Row, IconWithText, TextBlock } from './common';
import { Actions } from 'react-native-router-flux';
import axios from 'react-native-axios';
import Icon from 'react-native-vector-icons/FontAwesome';

class WordDetail extends React.Component {
  state = {
    synonyms: [],
    antonyms: [],
  }

  componentWillMount() {
    const { word } = this.props.data;

    var instance = axios.create({
      headers: {
        'X-Mashape-Key': 'rAHO82BrgJmshpIHJ8mpTVz2vvPyp1c0X1gjsn6UYDxEe7on7T',
        'X-Mashape-Host': 'wordsapiv1.p.mashape.com'
      }
    });

    instance.get('https://wordsapiv1.p.mashape.com/words/' + word + '/synonyms')
      .then((response) => this.setState({ synonyms : response.data.synonyms }))
      .catch((error) => {
        console.log(error.response);
      });

    instance.get('https://wordsapiv1.p.mashape.com/words/' + word + '/antonyms')
      .then((response) => this.setState({ antonyms : response.data.antonyms }))
      .catch((error) => {
        console.log(error.response);
      });
  }

  async saveWord(){
    const { word, definitions } = this.props.data;

    try {
      await AsyncStorage.setItem('@wordlet:' + word, word);
      await AsyncStorage.multiSet(definitions.map((element, i) => {
        return ['@wordlet:' + word + '-definition-' + i, element.definition];
      }, console.log('Saved')));
    } catch (error) {
      // Error saving data
    }
  }

  renderDefinitions(){
    const { definitions } = this.props.data;

    return definitions.map((element, i) => {
      return(
        <TextBlock key={i}>
          <View style={{ marginRight: 6, height: 8, width: 10 }}>
            <Icon style={{color: 'black'}} name={'circle'} size={7}/>
          </View>
          { this.firstToUpperCase(element.definition) }
        </TextBlock>
      );
    });
  }

  renderSynonyms(){
    const str = this.firstToUpperCase(this.state.synonyms.join(', '));

    return (
      <TextBlock>
        { str }
      </TextBlock>
    );
  }

  renderAntonyms(){
    const str = this.firstToUpperCase(this.state.synonyms.join(', '));

    return (
      <TextBlock>
        { str }
      </TextBlock>
    );
  }

  firstToUpperCase(string)
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const { word } = this.props.data;

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Row verticalPadding={12} style={{ backgroundColor: '#403075' }} />
        <Row verticalPadding={12} horizontalPadding={8}>
          <TouchableOpacity onPress={() => Actions.pop()}>
            <IconWithText
              icon="chevron-left"
              text="Back"
              textSize={18}
              iconSize={20} />
          </TouchableOpacity>
        </Row>
        <ScrollView>
          <NarrowContainer>
            <Title label={ this.firstToUpperCase(word) } />
            { this.renderDefinitions() }
            <Subtitle label="Synonyms" />
            { this.renderSynonyms() }
            <Subtitle label="Antonyms" />
            { this.renderAntonyms() }
          </NarrowContainer>
        </ScrollView>

        <Footer>
          <NarrowContainer>
            <CustomButton label="Save" onPress={() => this.saveWord()} />
          </NarrowContainer>
        </Footer>
      </View>
    );
  }
}

export default WordDetail;
