import React from 'react';
import { View, Text, FlatList, StyleSheet, AsyncStorage } from 'react-native';
import { Row } from './common';
import WordItem from './WordItem';

class WordList extends React.Component {
  state = { savedWords: [] }

  async componentWillMount() {
    try {
      await AsyncStorage.getAllKeys((error, keys) => {
        const wordReg = /^@wordlet:\w*$/;

        const wordKeys = keys.filter((element) => {
          return wordReg.test(element);
        });

        this.getWords(wordKeys);
      });
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  async getWords(keys){
    await AsyncStorage.multiGet(keys, (error, data) => {
      const words = data.map((element) => {
        return { word: element[1], definition: '' };
      });

      this.setState({ savedWords: words });
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Row verticalPadding={12} style={{ backgroundColor: '#403075' }} />
        <FlatList
          data={this.state.savedWords}
          renderItem={({item}) => <WordItem data={item} />}
        />
      </View>
    );
  }
}

export default WordList;
