import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FeatherIcons from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Bold_Font,
  Card_Background,
  Header_FONT_SIZE,
  primaryBlack,
  primarygrey,
} from '../../constant';

const User = ({navigation}) => {
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
          {/* -----------------------profile section ------------ */}
          <View style={styles.Prodilecards}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MainApp', {name: 'UserDetails'})
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
              onPress={() =>
                navigation.navigate('MainApp', {screen: 'Orders'})
              }>
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
              onPress={() =>
                navigation.navigate('MainApp', {screen: 'Address'})
              }>
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
              onPress={() =>
                navigation.navigate('MainApp', {screen: 'Payment'})
              }>
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
              onPress={() => navigation.navigate('MainApp', {screen: 'Promo'})}>
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
              onPress={() =>
                navigation.navigate('MainApp', {screen: 'Review'})
              }>
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
              onPress={() =>
                navigation.navigate('MainApp', {screen: 'Setings'})
              }>
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  Search: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 20,
    paddingRight: 12,
  },
  Heading: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  HeadingText: {
    color: primaryBlack,
    fontSize: Header_FONT_SIZE,
    paddingLeft: 10,
    paddingTop: 20,
  },
  Prodilecards: {
    gap: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: Card_Background,
  },
  profileimageContainer: {
    padding: 15,
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
    fontSize: 18,
    color: primaryBlack,
  },
  order: {},
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: Card_Background,
    padding: 10,
  },

  cardHeading: {
    // fontFamily: Bold_Font,
    fontWeight: '500',
    fontSize: 18,
    color: primaryBlack,
  },
  cardInfo: {},
});
