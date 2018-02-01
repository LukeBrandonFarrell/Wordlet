import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';

import WordSearch from './components/WordSearch';
import WordDetail from './components/WordDetail';
import WordList from './components/WordList';

import { TabIcon } from './components/common';

class App extends React.Component {
  componentWillMount () {
    StatusBar.setBarStyle('light-content', true);
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
            tabBarStyle={{}}
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

  },
});

export default App;
