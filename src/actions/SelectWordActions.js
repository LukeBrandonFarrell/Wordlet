
import {
  SET_WORD,
  SET_DEFINITIONS,
  SET_SYNONYMS,
  SET_ANTONYMS
} from './types';

export const setWord = (word) => {
  return {
    type: SET_WORD,
    payload: word,
  };
};

export const setDefinitions = (definitions) => {
  return {
    type: SET_DEFINITIONS,
    payload: definitions,
  };
};

export const setSynonyms = (synonyms) => {
  return {
    type: SET_SYNONYMS,
    payload: synonyms,
  };
};

export const setAntonyms = (antonyms) => {
  return {
    type: SET_ANTONYMS,
    payload: antonyms,
  };
};
