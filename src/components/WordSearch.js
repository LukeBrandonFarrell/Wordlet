import React from 'react';
import { View, Text, Keyboard, Platform, LayoutAnimation } from 'react-native';

import { searchFormUpdate, searchWord } from '../actions';
import { connect } from 'react-redux';

import { TextField, CustomButton, NarrowContainer, BackgroundImage, Row, Spinner, Error, Logo } from './common';

class WordSearch extends React.Component {
  state = { keyboard: false, }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ keyboard: true });
  }

  _keyboardDidHide () {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ keyboard: false });
  }

  searchWords(){
    this.props.searchWord(this.props.term);
    Keyboard.dismiss();
  }

  renderButton(){
    if(!this.props.loading){
      return <CustomButton label="Search" onPress={() => this.searchWords()} />;
    }

    return <Spinner style={{ marginTop: 30, marginBottom: 30 }} />;
  }

  renderError(){
    const { error } = this.props;

    if(error){
      return <Error label={error} />;
    }
  }

  render() {
    const { keyboard } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: keyboard ? 0.5 : 1 }}>
          <BackgroundImage url={ require('../../resources/bg-1.jpg') } />
          <Row verticalPadding={ (Platform.OS === 'android') ? 12 : 2 }>
            <Logo url={ require('../../resources/logo-white.png') } style={{ width:'70%', height:80, }}/>
          </Row>
        </View>

        <View style={{ flex: 3, backgroundColor: '#FFF', }}>
          <NarrowContainer>
            <Row verticalPadding={18}>
              <TextField
                label='Search word'
                value={ this.props.term }
                onChangeText={(text) => this.props.searchFormUpdate({ prop: 'term', value: text })}
              />
              { this.renderButton() }
              { this.renderError() }
              <Text style={{ color: 'black' }}>
                  Save word meanings, synonyms and antonyms... so you can come back and remind yourself later.
              </Text>
            </Row>
          </NarrowContainer>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { term, loading, error } = state.searchForm;

  return { term, loading, error };
};

export default connect(mapStateToProps, { searchFormUpdate, searchWord })(WordSearch);
