import React from 'react';
import { StatusBar, StyleSheet, Platform } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';

import WordSearch from './components/WordSearch';
import WordDetail from './components/WordDetail';
import WordList from './components/WordList';

import { TabIcon } from './components/common';

class RouterComponent extends React.Component {
  componentWillMount () {
    StatusBar.setBarStyle('light-content', true);
  }

  iconActiveTintColour(){
    if(Platform.OS === 'android'){
      return '#FFFFFF';
    } else if(Platform.OS === 'ios'){
      return '#403075';
    }
  }

  iconInactiveTintColour(){
    if(Platform.OS === 'android'){
      return '#2e215b';
    } else if(Platform.OS === 'ios'){
      return '#b8b5b5';
    }
  }

  render(){
    const { tabbarStyle } = styles;

    return (
      <Router>
        <Stack key="root"
          hideNavBar>
          <Stack key="tabs"
            tabs={true}
            showLabel={false}
            tabBarStyle={tabbarStyle}
            activeTintColor={this.iconActiveTintColour()}
            inactiveTintColor={this.iconInactiveTintColour()}
            tabBarPosition='bottom'>
            <Scene key="Search"
              component={WordSearch}
              iconName="search"
              icon={TabIcon}
              hideNavBar/>
            <Scene key="Words"
              component={WordList}
              iconName="list"
              icon={TabIcon}

              hideNavBar />
          </Stack>

          <Scene key="WordDetail" component={WordDetail}/>
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  tabbarStyle : {
    ...Platform.select({
      android: {
        backgroundColor: '#403075',
      }
    }),
  },
});

export default RouterComponent;
