import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Provider} from 'react-redux';
import Root from './src/containers/root';
import {store} from './src/store/store';

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
