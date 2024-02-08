import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {store} from './src/store/store';
import {Provider, useSelector} from 'react-redux';
import HomeScreen from './src/screens/Home/Home';
import Root from './src/containers/root';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        {/* <HomeScreen /> */}
        <Root />
      </Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
