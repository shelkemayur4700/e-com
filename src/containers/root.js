import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/Home';
import Cart from '../screens/Cart';
import User from '../screens/User/User';
import Favorites from '../screens/Favorites';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwsome6Icons from 'react-native-vector-icons/FontAwesome6';
import FontistoIcons from 'react-native-vector-icons/Fontisto';
import EvilIconsIcons from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {primaryBlack, primarygrey, primaryred} from '../constant';
import Shop from '../screens/Shop';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Detail from '../screens/Detail';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import ForgetPass from '../screens/ForgetPass';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import MainApp from './mainApp';
import {checkAuthStatus} from '../thunk/auth';
function HomePage() {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <Tab.Navigator
        style={styles.navBar}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: primaryred,
          tabBarInactiveTintColor: primaryBlack,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            // initialRouteName:{},
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons
                name="home"
                color={focused ? primaryred : primarygrey}
                size={30}
              />
            ),
          }}></Tab.Screen>
        <Tab.Screen
          name="Shop"
          component={Shop}
          style={{backgroundColor: primaryred}}
          options={{
            tabBarIcon: ({focused}) => (
              <FontAwsome6Icons
                name="cart-shopping"
                color={focused ? primaryred : primarygrey}
                size={22}
              />
            ),
          }}></Tab.Screen>
        <Tab.Screen
          name="Bag"
          component={Cart}
          options={{
            tabBarIcon: ({focused}) => (
              <FontistoIcons
                name="shopping-bag"
                color={focused ? primaryred : primarygrey}
                size={18}
              />
            ),
          }}></Tab.Screen>
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({focused}) => (
              <EvilIconsIcons
                name={focused ? 'heart' : 'hearto'}
                color={focused ? primaryred : primarygrey}
                styles={styles.IconsStyles}
                size={22}
              />
            ),
          }}></Tab.Screen>
        <Tab.Screen
          style={{}}
          name="User"
          component={User}
          options={{
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcons
                name="user"
                color={focused ? primaryred : primarygrey}
                size={22}
              />
            ),
            tabBarLabelStyle: ({focused}) => ({
              color: focused ? primaryred : primarygrey,
            }),
          }}></Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

const Root = () => {
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();

  let token = useSelector(state => state?.auth?.token);
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, []);
  return (
    <>
      <Stack.Navigator initialRouteName="HomePage">
        {/* ----------Protected route---------------  */}
        <Stack.Screen
          name="MainApp"
          component={MainApp}
          // component={token ? MainApp : Login}
          options={{headerShown: false}}
        />
        {/* ----------Public routes---------------  */}
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{headerShown: false}}
        />
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
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPass"
          component={ForgetPass}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default Root;

const styles = StyleSheet.create({
  navBar: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  IconsStyles: {
    borderColor: 'black',
    borderWidth: 5,
    backgroundColor: 'black',
  },
});
