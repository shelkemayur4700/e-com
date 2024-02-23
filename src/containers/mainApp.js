import {Settings, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import User from '../screens/User/User';
import Orders from '../screens/User/Components/Orders';
import Address from '../screens/User/Components/Address';
import Payment from '../screens/User/Components/Payment';
import Setings from '../screens/User/Components/Setings';
import UserDetails from '../screens/User/Components/UserDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Promo from '../screens/User/Components/Promo';
import Review from '../screens/User/Components/Review';
const MainApp = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Promo"
          component={Promo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Review"
          component={Review}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Setings"
          component={Setings}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainApp;

const styles = StyleSheet.create({});
