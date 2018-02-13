import { combineReducers } from 'redux';

import SearchFormReducer from './SearchFormReducer';
import SelectedWordReducer from './SelectedWordReducer';
import WordListReducer from './WordListReducer';

export default combineReducers({
  searchForm: SearchFormReducer,
  selectedWord: SelectedWordReducer,
  wordList: WordListReducer,
});
