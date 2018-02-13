import { AsyncStorage } from 'react-native';
import Toast from 'react-native-root-toast';

import {
  WORDS_FETCHED,
  WORD_REMOVED,
  SET_WORD_SAVED,
  WORD_SAVED
} from './types';

export const getAllWords = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.getAllKeys((error, keys) => {
        const wordReg = /^@wordlet:\w*$/;

        const wordKeys = keys.filter((element) => {
          return wordReg.test(element);
        });

        AsyncStorage.multiGet(wordKeys, async (error, data) => {
          let words = [];

          for(const element of data){
            const key = element[0];
            const word = element[1];
            const definition = await AsyncStorage.getItem(key + '-definition-0', (error, definition) => {
              return definition;
            });

            words.push({ word, definition });
          }

          dispatch({ type: WORDS_FETCHED, payload: words });
        });
      });
    } catch (error) {
      // Error retrieving data
      Toast.show('Error: \n' + error.message);
    }
  };
};

export const saveWord = (word, definitions, synonyms, antonyms) => {
  return async (dispatch) => {
    try {
      await AsyncStorage.setItem('@wordlet:' + word, word);
      await AsyncStorage.multiSet(definitions.map((element, i) => {
        return ['@wordlet:' + word + '-definition-' + i, element.definition];
      }));

      await AsyncStorage.setItem('@wordlet:' + word + '-synonyms-', synonyms.join(', '));
      await AsyncStorage.setItem('@wordlet:' + word + '-antonyms-', antonyms.join(', '));

      Toast.show('Word has been saved', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });

      dispatch({ type: WORD_SAVED, payload: { word, definition: definitions[0].definition }});
      dispatch({ type: SET_WORD_SAVED, payload: true });
    } catch (error) {
      // Error saving data
      Toast.show('Error: \n' + error.message);
    }
  };
};


export const deleteWord = (word, array) => {
  return async (dispatch) => {
    //Delete word from storage
    try {
      AsyncStorage.removeItem('@wordlet:' + word);

      AsyncStorage.getAllKeys((error, keys) => {
        const stringReg = '^@wordlet:' + word + '-definition\\w*';
        const definitionReg = new RegExp(stringReg, 'g');

        const wordDefinitionKeys = keys.filter((element) => {
          return definitionReg.test(element);
        });

        AsyncStorage.multiRemove(wordDefinitionKeys);
      });

      AsyncStorage.removeItem('@wordlet:' + word + '-synonyms-');
      AsyncStorage.removeItem('@wordlet:' + word + '-antonyms-');

      Toast.show('Word has been removed', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });

      //Delete word from array
      var list = array.words;

      for(let i=0; i < list.length; i++){
        if(word == list[i].word){
          list.splice(i, 1);
        }
      }

      //Dispatch word remove with updated list of words
      dispatch({ type: WORD_REMOVED, payload: list });

    } catch (error) {
    // Error retrieving data)
      Toast.show('Error: \n' + error.message);
    }
  };
};
