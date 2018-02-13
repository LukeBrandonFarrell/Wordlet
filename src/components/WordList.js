import React from 'react';
import { View, Dimensions } from 'react-native';
import { Row, NonContentText } from './common';
import WordItem from './WordItem';
import WordListRightIcon from './WordListRightIcon';
import { SwipeListView } from 'react-native-swipe-list-view';

import { getAllWords, deleteWord } from '../actions';
import { connect } from 'react-redux';

class WordList extends React.Component {
  componentDidMount() { this.getWords(); }

  getWords(){ this.props.getAllWords(); }
  deleteWord(data, map){
    map[data.index].closeRow();
    this.props.deleteWord(data.item.word, this.props.list);
  }

  renderList(){
    if(this.props.words.length > 0){
      var { width } = Dimensions.get('window');

      return (
        <SwipeListView
          useFlatList
          disableRightSwipe
          closeOnRowPress
          closeOnRowBeginSwipe
          data={this.props.words}
          renderItem={({item, index}) => <WordItem key={index.toString()} data={item} />}
          onRefresh={() => this.getWords()}
          refreshing={this.props.refresh}
          renderHiddenItem={(data, map) =>
            <WordListRightIcon icon='trash' data={data} onPress={() => this.deleteWord(data, map)} />
          }
          rightOpenValue={-(width / 4)}
          onRowOpen={(rowKey, rowMap) => {
            setTimeout(() => {
              if(rowMap[rowKey]){
                rowMap[rowKey].closeRow();
              }
            }, 2000);
          }}
          previewRowKey={'0'}
          previewOpenValue={-(width / 4)}
          previewDuration={500}
          swipeToOpenPercent={20}
          directionalDistanceChangeThreshold={2}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }

    return (
      <NonContentText>No Words Saved</NonContentText>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Row verticalPadding={12} style={{ backgroundColor: '#403075' }} />
        { this.renderList() }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const list = state.wordList;
  const { words, refresh } = state.wordList;

  return { words, refresh, list };
};

export default connect(mapStateToProps, { getAllWords, deleteWord })(WordList);
