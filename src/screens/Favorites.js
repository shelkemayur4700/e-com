import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {
  Card_Background,
  Header_FONT_SIZE,
  primaryBlack,
  primarygrey,
  primarywhite,
} from '../constant';

const Favorites = ({navigation}) => {
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <View style={styles.Search}>
            <TouchableOpacity>
              <FeatherIcons name="search" size={25} color={primaryBlack} />
            </TouchableOpacity>
          </View>
          <View style={styles.Heading}>
            <Text style={styles.HeadingText}>Favorites</Text>
          </View>
          {/* ---------------vertical scroll for filters------------ */}
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <View style={styles.filtersContainer}>
              <View style={styles.filter}>
                <Text style={styles.filterName}>Men</Text>
              </View>
              <View style={styles.filter}>
                <Text style={styles.filterName}>Women</Text>
              </View>
              <View style={styles.filter}>
                <Text style={styles.filterName}>Electronics</Text>
              </View>
              <View style={styles.filter}>
                <Text style={styles.filterName}>Jewelery</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <ScrollView style={{padding: 10}} showsVerticalScrollIndicator={false}>
          {/* -----------------CARD------------ */}
          <View style={styles.cardContainer}>
            {/* ---------IMAGE------------ */}
            <View style={styles.ImageContainer}>
              <Image
                style={styles.image}
                source={require('../Assets/Images/Card_1.png')}
              />
            </View>
            {/* -----------TEXT-DATA--------------- */}
            <View style={styles.TextData}>
              <View style={styles.ContainerONE}>
                <Text style={styles.Cardbrand}>Shirt</Text>
                <Text style={styles.CardCategory}>Category</Text>
              </View>
              <View style={styles.ContainerTWO}>
                <EntypoIcons name="cross" size={25} color={primaryBlack} />
                <Text style={styles.price}>₹222</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    paddingTop: 20,
    // backgroundColor: 'yellow',
    borderBottomColor: primarygrey,
    borderBottomWidth: 1,
    // elevation: 5,
  },
  Search: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 12,
  },
  Heading: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  HeadingText: {
    color: primaryBlack,
    fontSize: Header_FONT_SIZE,
    fontWeight: '600',
    paddingLeft: 10,
    paddingTop: 20,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 5,
    padding: 10,
  },
  filter: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: primaryBlack,
    borderRadius: 20,
  },
  filterName: {
    color: primarywhite,
    fontSize: 16,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Card_Background,
    borderRadius: 10,
  },
  ImageContainer: {},
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  TextData: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomRightRadius: 10,
  },
  ContainerONE: {
    width: '70%',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  Cardbrand: {
    color: primaryBlack,
    fontSize: 20,
    fontWeight: '500',
  },
  CardCategory: {
    color: primaryBlack,
    fontSize: 15,
    fontWeight: '400',
  },
  ContainerTWO: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  price: {
    color: primaryBlack,
    fontSize: 18,
    fontWeight: '400',
  },
});
