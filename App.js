import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {store} from './src/store/store';
import {Provider, useSelector} from 'react-redux';
import HomeScreen from './src/screens/Home/Home';
import Root from './src/containers/root';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from './src/screens/Detail';



const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Root />
      </Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
