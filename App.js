import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {store} from './src/store/store';
import {Provider, useSelector} from 'react-redux';
import Root from './src/containers/root';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from './src/screens/Detail';
import {primaryBlack} from './src/constant';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import ForgetPass from './src/screens/ForgetPass';
import MainApp from './src/containers/mainApp';

const App = ({navigation}) => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen
              name="Root"
              component={Root}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
