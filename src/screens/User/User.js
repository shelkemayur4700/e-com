import React, {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  Bold_Font,
  Card_Background,
  Header_FONT_SIZE,
  primaryBlack,
  primarygrey,
} from '../../constant';
import {logoutUser} from '../../slice/auth';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';
import {checkAuthStatus, logout} from '../../thunk/auth';

const User = ({navigation}) => {
  const dispatch = useDispatch();
  // -------------SIGN OUT-------------
  const handleSignout = async () => {
    try {
      dispatch(logout());
      dispatch(logoutUser());
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };
  // ---------------------CHECK FOR TOKEN----------------

  let token = useSelector(state => state?.auth?.token);
  // console.log('Token from User..............', token);
  useEffect(() => {
    if (!token) {
      dispatch(checkAuthStatus());
    }
  }, [token]);
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          {/* --------------heading---------------------- */}
          <View style={styles.Search}>
            <TouchableOpacity>
              <FeatherIcons name="search" size={25} color={primaryBlack} />
            </TouchableOpacity>
          </View>
          <View style={styles.Heading}>
            <Text style={styles.HeadingText}>My profile</Text>
          </View>
          {/* -----------USER IS NOT LOGGED IN  */}
          {token ? (
            <View style={styles.Prodilecards}>
              {/* -----------------------profile section ------------ */}
              <TouchableOpacity
                onPress={() =>
                  navigation.push('MainApp', {name: 'UserDetails'})
                }>
                <View style={styles.profileContainer}>
                  <View style={styles.profileimageContainer}>
                    <Image
                      style={styles.profileimage}
                      source={require('../../Assets/Images/Pro.png')}></Image>
                  </View>
                  <View style={styles.prodata}>
                    <Text style={styles.name}>Matilda Brown</Text>
                    <Text>matildabrown@mail.com</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/* -----------------------order section ------------ */}
              <TouchableOpacity
                onPress={() => navigation.push('MainApp', {screen: 'Orders'})}>
                <View style={styles.cardContainer}>
                  <View style={styles.order}>
                    <Text style={styles.cardHeading}>My orders</Text>
                    <Text style={styles.cardInfo}>Already have 12 orders</Text>
                  </View>
                  <View style={styles.arrowIcon}>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      color={primarygrey}
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              {/* -----------------------Address section ------------ */}
              <TouchableOpacity
                onPress={() => navigation.push('MainApp', {screen: 'Address'})}>
                <View style={styles.cardContainer}>
                  <View style={styles.order}>
                    <Text style={styles.cardHeading}>Shipping addresses</Text>
                    <Text style={styles.cardInfo}>3 Adresses</Text>
                  </View>
                  <View style={styles.arrowIcon}>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      color={primarygrey}
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {/* -----------------------payment section ------------ */}
              <TouchableOpacity
                onPress={() => navigation.push('MainApp', {screen: 'Payment'})}>
                <View style={styles.cardContainer}>
                  <View style={styles.order}>
                    <Text style={styles.cardHeading}>Payment methods</Text>
                    <Text style={styles.cardInfo}>Visa **34</Text>
                  </View>
                  <View style={styles.arrowIcon}>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      color={primarygrey}
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              {/* -----------------------promocode section ------------ */}
              <TouchableOpacity
                onPress={() => navigation.push('MainApp', {screen: 'Promo'})}>
                <View style={styles.cardContainer}>
                  <View style={styles.order}>
                    <Text style={styles.cardHeading}>Promocodes</Text>
                    <Text style={styles.cardInfo}>
                      You have special promocodes
                    </Text>
                  </View>
                  <View style={styles.arrowIcon}>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      color={primarygrey}
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              {/* -----------------------Review section ------------ */}
              <TouchableOpacity
                onPress={() => navigation.push('MainApp', {screen: 'Review'})}>
                <View style={styles.cardContainer}>
                  <View style={styles.order}>
                    <Text style={styles.cardHeading}>My reviews</Text>
                    <Text style={styles.cardInfo}>Reviews for 4 items</Text>
                  </View>
                  <View style={styles.arrowIcon}>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      color={primarygrey}
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {/* -----------------------Settings section ------------ */}
              <TouchableOpacity
                onPress={() => navigation.push('MainApp', {screen: 'Setings'})}>
                <View style={styles.cardContainer}>
                  <View style={styles.order}>
                    <Text style={styles.cardHeading}>Settings</Text>
                    <Text style={styles.cardInfo}>Notifications, password</Text>
                  </View>
                  <View style={styles.arrowIcon}>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      color={primarygrey}
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              {/* -----------------------Signout section ------------ */}
              <TouchableOpacity onPress={() => handleSignout()}>
                <View style={styles.SignoutBtn}>
                  <Text style={styles.SignoutText}>SIGN OUT</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.DemoUserMainContainer}>
              <View style={styles.DemoUserIconContainer}>
                <MaterialCommunityIcons
                  name="account-outline"
                  size={60}
                  color={COLORS.primarywhite}
                />
              </View>
              <View style={styles.DemoUserBtn}>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                  <Text style={styles.SignInBTNText}>SIGN IN / Join</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: SPACING.space_10,
  },
  Search: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: SPACING.space_20,
    paddingRight: SPACING.space_12,
  },
  Heading: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  HeadingText: {
    color: primaryBlack,
    fontSize: Header_FONT_SIZE,
    paddingLeft: SPACING.space_10,
    paddingTop: SPACING.space_20,
  },
  Prodilecards: {
    gap: 5,
  },
  DemoUserMainContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.Card_Background,
    alignItems: 'center',
    borderRadius: SPACING.space_10,
    marginTop: SPACING.space_10,
  },
  DemoUserIconContainer: {
    borderRadius: 50,
    backgroundColor: COLORS.primaryBlack,
    padding: SPACING.space_10,
    margin: SPACING.space_20,
  },
  DemoUserBtn: {
    margin: SPACING.space_20,
    backgroundColor: COLORS.primaryBlack,
    padding: SPACING.space_10,
    paddingHorizontal: SPACING.space_20,
    borderRadius: SPACING.space_10,
  },
  SignInBTNText: {
    color: COLORS.primarywhite,
    fontFamily: FONTFAMILY.Metropolis_bold,
    fontSize: FONTSIZE.size_14,
  },
  profileContainer: {
    flexDirection: 'row',
    marginTop: SPACING.space_10,
    borderRadius: SPACING.space_10,
    backgroundColor: Card_Background,
    padding: SPACING.space_20,
    gap: SPACING.space_20,
  },
  profileimage: {
    borderRadius: 50,
  },
  prodata: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 1,
  },
  name: {
    fontFamily: Bold_Font,
    fontSize: SPACING.space_18,
    color: primaryBlack,
  },
  order: {},
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: SPACING.space_10,
    backgroundColor: Card_Background,
    padding: SPACING.space_10,
  },

  cardHeading: {
    // fontFamily: Bold_Font,
    fontWeight: '500',
    fontSize: SPACING.space_18,
    color: primaryBlack,
  },
  cardInfo: {},
  SignoutBtn: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: SPACING.space_10,
    backgroundColor: COLORS.primaryBlack,
    paddingVertical: SPACING.space_10,
  },
  SignoutText: {
    color: COLORS.primarywhite,
    fontFamily: FONTFAMILY.Metropolis_bold,
    // fontSize: FONTSIZE.,
  },
});
