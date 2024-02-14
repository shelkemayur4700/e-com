import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import Root from './src/containers/root';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from './src/screens/Detail';
import {primaryBlack} from './src/constant';
import EntypoIcons from 'react-native-vector-icons/Entypo';

const App = ({navigation}) => {
  const Stack = createNativeStackNavigator();
  // const navigation = useNavigation();
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name="RootScreens"
            component={Root}
            options={{headerShown: false}}
          />
          {/* ----Details Route  */}
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{
              title: 'Details',
              headerTitleAlign: 'center',
              headerRight: () => (
                <TouchableOpacity>
                  <EntypoIcons name="share" color={primaryBlack} size={22} />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
