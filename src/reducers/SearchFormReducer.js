
import {
  SEARCH_FORM_UPDATE,
  SEARCHING_WORD,
  WORD_FOUND,
  WORD_NOT_FOUND
} from '../actions/types';

const INITIAL_STATE = {
  term: '',
  loading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case SEARCH_FORM_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value, error: null };
    case SEARCHING_WORD:
      return { ...state, loading: true };
    case WORD_FOUND:
      return { ...state, ...INITIAL_STATE };
    case WORD_NOT_FOUND:
      return { ...state, loading: false, error: 'Word not found' };
    default:
      return state;
  }
};
