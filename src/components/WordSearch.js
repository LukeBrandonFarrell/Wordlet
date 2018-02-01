import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'react-native-axios';
import { Actions } from 'react-native-router-flux';
import { TextField, CustomButton, NarrowContainer, BackgroundImage, Row, Spinner, Error } from './common';

class WordSearch extends React.Component {
  state = { word: '', loading: false, error: '' }

  searchWords(){
    this.setState({
      loading: true,
    });

    var instance = axios.create({
      headers: {
        'X-Mashape-Key': 'rAHO82BrgJmshpIHJ8mpTVz2vvPyp1c0X1gjsn6UYDxEe7on7T',
        'X-Mashape-Host': 'wordsapiv1.p.mashape.com'
      }
    });

    instance.get('https://wordsapiv1.p.mashape.com/words/' + this.state.word + '/definitions')
      .then((response) => {
        this.setState({ loading : false, error: '', });
        Actions.WordDetail({ data: response.data });
      })
      .catch(() => {
        this.setState({
          loading : false,
          error: 'Word not found',
        });
      });
  }

  renderButton(){
    if(!this.state.loading){
      return <CustomButton label="Search" onPress={() => this.searchWords()} />;
    }

    return <Spinner style={{ marginTop: 30, marginBottom: 30 }} />;
  }

  renderError(){
    const { error } = this.state;

    if(error){
      return <Error label={error} />;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BackgroundImage url={ require('../../resources/bg-1.jpg') } />

        <NarrowContainer>
          <Row verticalPadding={40}>
            <TextField
              label='Search'
              value={ this.state.word }
              onChangeText={(text) => this.setState({ word: text, error: '' })}
            />
            { this.renderButton() }
            { this.renderError() }
            <Text style={{ color: 'white' }}>
                Save word meanings, synonyms and antonyms... so you can come back and remind yourself later.
            </Text>
          </Row>
        </NarrowContainer>
      </View>
    );
  }
}

export default WordSearch;
