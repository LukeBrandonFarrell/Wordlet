import { AsyncStorage } from 'react-native';
import Toast from 'react-native-root-toast';
import { Actions } from 'react-native-router-flux';
import axios from 'react-native-axios';

import {
  SEARCH_FORM_UPDATE,
  SEARCHING_WORD,
  WORD_FOUND,
  WORD_NOT_FOUND,
  SET_WORD,
  SET_DEFINITIONS,
  SET_SYNONYMS,
  SET_ANTONYMS,
  SET_WORD_SAVED,
} from './types';

const instance = axios.create({
  headers: {
    'X-Mashape-Key': 'rAHO82BrgJmshpIHJ8mpTVz2vvPyp1c0X1gjsn6UYDxEe7on7T',
    'X-Mashape-Host': 'wordsapiv1.p.mashape.com'
  }
});

export const searchFormUpdate = ({ prop, value }) => {
  return {
    type: SEARCH_FORM_UPDATE,
    payload: { prop, value },
  };
};

export const searchWord = (word) => {
  return (dispatch) => {
    //search for the word
    dispatch({ type: SEARCHING_WORD });

    instance.get('https://wordsapiv1.p.mashape.com/words/' + word)
      .then((response) => {
        //Check if word has definitions
        if(response.data.results){
          dispatch({ type: WORD_FOUND });
          dispatch({ type: SET_WORD, payload: response.data.word });
          dispatch({ type: SET_DEFINITIONS, payload: response.data.results });
          Actions.WordDetail();
        } else {
          dispatch({ type: WORD_NOT_FOUND });
        }
      })
      .catch(() => {
        dispatch({ type: WORD_NOT_FOUND });
      });
  };
};

export const searchWordDetails = (word) => {
  return async (dispatch) => {
    //Check if word exists in Memory, load word from memory,
    const wordSaved = await AsyncStorage.getItem('@wordlet:' + word);

    if(wordSaved){
      dispatch({ type: SET_WORD_SAVED, payload: true });

      //Load extra (all) definition, synonyms and antonyms from storage
      try {
        await AsyncStorage.getAllKeys((error, keys) => {
          const stringReg = '^@wordlet:' + word + '-definition\\w*';
          const definitionReg = new RegExp(stringReg, 'g');

          const wordDefinitionKeys = keys.filter((element) => {
            return definitionReg.test(element);
          });

          AsyncStorage.multiGet(wordDefinitionKeys, (error, results) => {
            const definitions = results.map((element) => {
              return element[1];
            });

            dispatch({ type: SET_DEFINITIONS, payload: definitions });
          });

          AsyncStorage.getItem('@wordlet:' + word + '-synonyms-', (error, results) => {
            if(results !== null){
              dispatch({ type: SET_SYNONYMS, payload: results.split(',') });
            }else{
              dispatch({ type: SET_SYNONYMS, payload: [] });
            }
          });

          AsyncStorage.getItem('@wordlet:' + word + '-antonyms-', (error, results) => {
            if(results !== null){
              dispatch({ type: SET_ANTONYMS, payload: results.split(',') });
            }else{
              dispatch({ type: SET_ANTONYMS, payload: [] });
            }
          });
        });
      } catch (error) {
        // Error retrieving data
        Toast.show('Error: \n' + error.response);
      }
    } else {
      dispatch({ type: SET_WORD_SAVED, payload: false });

      //Load synonyms and antonyms from API
      instance.get('https://wordsapiv1.p.mashape.com/words/' + word + '/synonyms')
        .then((response) => dispatch({ type: SET_SYNONYMS, payload: response.data.synonyms }))
        .catch((error) => {
          Toast.show('Error: \n' + error.response);
        });

      instance.get('https://wordsapiv1.p.mashape.com/words/' + word + '/antonyms')
        .then((response) => dispatch({ type: SET_ANTONYMS, payload: response.data.antonyms }))
        .catch((error) => {
          Toast.show('Error: \n' + error.response);
        });
    }
  };
};
