import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import EvilIconsIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FontAwsome6Icons from 'react-native-vector-icons/FontAwesome6';
import FontistoIcons from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import Cart from '../screens/Cart';
import Detail from '../screens/Detail';
import Favorites from '../screens/Favorites';
import HomeScreen from '../screens/Home/Home';
import Shop from '../screens/Shop';
import User from '../screens/User/User';
import ForgetPass from '../screens/auth/ForgetPass';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import {COLORS} from '../theme/theme';
import {checkAuthStatus} from '../thunk/auth';
import MainApp from './mainApp';
function HomePage() {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <Tab.Navigator
        style={styles.navBar}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primaryred,
          tabBarInactiveTintColor: COLORS.primaryBlack,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons
                name="home"
                color={focused ? COLORS.primaryred : COLORS.primarygrey}
                size={30}
              />
            ),
          }}></Tab.Screen>
        <Tab.Screen
          name="Shop"
          component={Shop}
          style={{backgroundColor: COLORS.primaryred}}
          options={{
            tabBarIcon: ({focused}) => (
              <FontAwsome6Icons
                name="cart-shopping"
                color={focused ? COLORS.primaryred : COLORS.primarygrey}
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
                color={focused ? COLORS.primaryred : COLORS.primarygrey}
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
                color={focused ? COLORS.primaryred : COLORS.primarygrey}
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
                color={focused ? COLORS.primaryred : COLORS.primarygrey}
                size={22}
              />
            ),
            tabBarLabelStyle: ({focused}) => ({
              color: focused ? COLORS.primaryred : COLORS.primarygrey,
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
          // component={MainApp}
          component={token ? MainApp : SignIn}
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
                <EntypoIcons
                  name="share"
                  color={COLORS.primaryBlack}
                  size={22}
                />
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
          name="SignIn"
          component={SignIn}
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
