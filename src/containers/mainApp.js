import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AddAddress from '../components/AddAddress';
import AddReview from '../components/AddReview';
import Myorders from '../components/Myorders';
import PaymentScreen from '../components/PaymentScreen';
import Checkout from '../screens/Checkout';
import Success from '../screens/Success';
import Address from '../screens/User/Components/Address';
import Orders from '../screens/User/Components/Orders';
import Promo from '../screens/User/Components/Promo';
import Review from '../screens/User/Components/Review';
import Setings from '../screens/User/Components/Setings';
import UserDetails from '../screens/User/Components/UserDetails';
import {COLORS} from '../theme/theme';
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
                <FeatherIcons
                  name="search"
                  size={22}
                  color={COLORS.primaryBlack}
                />
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
                <FeatherIcons
                  name="search"
                  size={22}
                  color={COLORS.primaryBlack}
                />
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
                <FeatherIcons
                  name="search"
                  size={22}
                  color={COLORS.primaryBlack}
                />
              </TouchableOpacity>
            ),
          }}
        />
        {/* <Stack.Screen
          name="Payment"
          component={Payment}
          options={{
            title: 'Payment',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity>
                <FeatherIcons
                  name="search"
                  size={22}
                  color={COLORS.primaryBlack}
                />
              </TouchableOpacity>
            ),
          }}
        /> */}
        <Stack.Screen
          name="Promo"
          component={Promo}
          options={{
            title: 'Promocode',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity>
                <FeatherIcons
                  name="search"
                  size={22}
                  color={COLORS.primaryBlack}
                />
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
                <FeatherIcons
                  name="search"
                  size={22}
                  color={COLORS.primaryBlack}
                />
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
                <FeatherIcons
                  name="search"
                  size={22}
                  color={COLORS.primaryBlack}
                />
              </TouchableOpacity>
            ),
          }}
        />
        {/* ------------Nested orderDetail route ----------- */}
        <Stack.Screen
          name="Myorders"
          component={Myorders}
          options={{
            title: 'Order Details',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity>
                <FeatherIcons
                  name="search"
                  size={22}
                  color={COLORS.primaryBlack}
                />
              </TouchableOpacity>
            ),
          }}
        />
        {/* -----------------Checkout-Screen----------- */}
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{
            title: 'Order Summary',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity>
                <FeatherIcons
                  name="search"
                  size={22}
                  color={COLORS.primaryBlack}
                />
              </TouchableOpacity>
            ),
          }}
        />
        {/* -----------------sucess-Screen----------- */}
        <Stack.Screen
          name="Success"
          component={Success}
          options={{
            headerShown: false,
          }}
        />
        {/* -----------------AddAddress-Screen----------- */}
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{
            title: 'Add Address',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity>
                <FeatherIcons
                  name="search"
                  size={22}
                  color={COLORS.primaryBlack}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            title: 'Payment',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity>
                <FeatherIcons
                  name="search"
                  size={22}
                  color={COLORS.primaryBlack}
                />
              </TouchableOpacity>
            ),
          }}
        />
        {/* </Stack.Navigator> */}
        <Stack.Screen
          name="AddReview"
          component={AddReview}
          options={{
            title: 'Add review',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity>
                <FeatherIcons
                  name="search"
                  size={22}
                  color={COLORS.primaryBlack}
                />
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
