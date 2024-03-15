import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { COLORS, FONTSIZE } from '../theme/theme';

const Shop = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ----------------Header---------------- */}
        <View style={styles.header}>
          <View style={styles.Search}>
            <TouchableOpacity>
              <FeatherIcons name="search" size={25} color={COLORS.primaryBlack} />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.Heading}>
          <Text style={styles.HeadingText}>Categories</Text>
        </View> */}
          {/* ------------------Categories------------------ */}
          <View style={styles.categories}>
            <View style={styles.menCategory}>
              <Text style={styles.categoryTitle}>Men</Text>
            </View>
            <View style={styles.womenCategory}>
              <Text style={styles.categoryTitle}>Women</Text>
            </View>
            <View style={styles.kidsCategory}>
              <Text style={styles.categoryTitle}>Kids</Text>
            </View>
          </View>
          {/* ---------------------Offer card------------------ */}
          <View style={styles.cards}>
            <View style={styles.OfferCard}>
              <Text style={styles.offerTitle}>SUMMER SALES</Text>
              <Text style={styles.offerInfo}>Up to 50% off</Text>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.catrgorytitle}>New</Text>
              <Image source={require('../Assets/Images/New.png')}></Image>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.catrgorytitle}>Clothes</Text>
              <Image source={require('../Assets/Images/Clothes.png')}></Image>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.catrgorytitle}>Shoes</Text>
              <Image source={require('../Assets/Images/Shoes.png')}></Image>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.catrgorytitle}>Accesories</Text>
              <Image
                source={require('../Assets/Images/Accesories.png')}></Image>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Shop;

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
    color: COLORS.primaryBlack,
    fontSize: FONTSIZE.Header_FONT_SIZE,
    paddingLeft: 10,
    paddingTop: 20,
  },
  categories: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 20,
    alignItems: 'baseline',
    justifyContent: 'space-between',
    backgroundColor: COLORS.Card_Background,
    borderRadius: 10,
  },
  menCategory: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    color: COLORS.primaryBlack,
    fontSize: 18,
  },
  cards: {margin: 10, gap: 10},
  OfferCard: {
    backgroundColor: primaryred,
    alignItems: 'center',
    padding: 30,
    borderRadius: 10,
  },
  offerTitle: {
    color: COLORS.primarywhite,
    fontSize: 22,
  },
  offerInfo: {
    color: COLORS.primarywhite,
    fontSize: 18,
  },
  categoryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.Card_Background,
    borderRadius: 10,
  },
  catrgorytitle: {
    fontSize: 20,
    paddingLeft: 20,
    color: COLORS.primaryBlack,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
