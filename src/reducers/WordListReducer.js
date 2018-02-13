
import {
  WORDS_FETCHED,
  WORD_SAVED,
  WORD_REMOVED,
} from '../actions/types';

const INITIAL_STATE = {
  words: [],
  refresh: false,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case WORDS_FETCHED:
      return { ...state, words: action.payload, refresh: false };
    case WORD_SAVED: {
      var list = state.words;
      list.push(action.payload);

      return { ...state, ...INITIAL_STATE, words: list };
    }
    case WORD_REMOVED: {
      return { ...state, words: action.payload };
    }
    default:
      return state;
  }
};
