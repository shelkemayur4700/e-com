import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StripeProvider} from '@stripe/stripe-react-native';
import React from 'react';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import Root from './src/containers/root';
import {STRIPE_PUBLISHABLE_KEY} from './src/setting';
import {store} from './src/store/store';
import {COLORS} from './src/theme/theme';

const App = ({navigation}) => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Provider store={store}>
          <ToastProvider
            placement="bottom"
            duration={4000}
            successColor="green"
            dangerColor={COLORS?.primaryred}
            warningColor="orange"
            normalColor={COLORS?.primarygrey}>
            <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
              <Stack.Navigator>
                <Stack.Screen
                  name="Root"
                  component={Root}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            </StripeProvider>
          </ToastProvider>
        </Provider>
      </NavigationContainer>
    </>
  );
};

export default App;
