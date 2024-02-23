import {Settings, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import FeatherIcons from 'react-native-vector-icons/Feather';
import {primaryBlack} from '../constant';
import Orderdetails from '../components/Myorders';
import Myorders from '../components/Myorders';
const MainApp = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator>
        {/* -------------User Screen Routes----------- */}
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{
            title: 'Account',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity>
                <FeatherIcons name="search" size={22} color={primaryBlack} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{
            title: 'Orders',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity>
                <FeatherIcons name="search" size={22} color={primaryBlack} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{
            title: 'Address',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity>
                <FeatherIcons name="search" size={22} color={primaryBlack} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{
            title: 'Payment',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity>
                <FeatherIcons name="search" size={22} color={primaryBlack} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Promo"
          component={Promo}
          options={{
            title: 'Promocode',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity>
                <FeatherIcons name="search" size={22} color={primaryBlack} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Review"
          component={Review}
          options={{
            title: 'Review',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity>
                <FeatherIcons name="search" size={22} color={primaryBlack} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Setings"
          component={Setings}
          options={{
            title: 'Setting',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity>
                <FeatherIcons name="search" size={22} color={primaryBlack} />
              </TouchableOpacity>
            ),
          }}
        />
        {/* ------------Nested orderDetail route ----------- */}
        <Stack.Screen
          initialRouteName="Myorders"
          name="Myorders"
          component={Myorders}
          options={{
            title: 'Order Details',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity>
                <FeatherIcons name="search" size={22} color={primaryBlack} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainApp;

const styles = StyleSheet.create({});
