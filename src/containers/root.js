import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/Home';
import Detail from '../screens/Detail';
import Cart from '../screens/Cart';
import User from '../screens/User';
import Favorites from '../screens/Favorites';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwsome6Icons from 'react-native-vector-icons/FontAwesome6';
import FontistoIcons from 'react-native-vector-icons/Fontisto';
import EvilIconsIcons from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {primarygrey, primaryred} from '../constant';

const Root = () => {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator
        style={styles.navBar}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: primaryred,
          tabBarInactiveTintColor: 'black',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
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
          component={Detail}
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
