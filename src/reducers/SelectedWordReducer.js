
import {
  SET_WORD,
  SET_DEFINITIONS,
  SET_SYNONYMS,
  SET_ANTONYMS,
  SET_WORD_SAVED
} from '../actions/types';

const INITIAL_STATE = {
  word: null,
  definitions: [],
  synonyms: [],
  antonyms: [],
  saved: false,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case SET_WORD:
      return { ...state, word: action.payload };
    case SET_DEFINITIONS:
      return { ...state, definitions: action.payload };
    case SET_SYNONYMS:
      return { ...state, synonyms: action.payload };
    case SET_ANTONYMS:
      return { ...state, antonyms: action.payload };
    case SET_WORD_SAVED:
      return { ...state, saved: action.payload };
    default:
      return state;
  }
};
