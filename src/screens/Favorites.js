import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  Header_FONT_SIZE,
  primaryBlack,
  primarygrey,
  primarywhite,
} from '../constant';
import FeatherIcons from 'react-native-vector-icons/Feather';
import EntypoIcons from 'react-native-vector-icons/Entypo';

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
        <ScrollView>
          <View style={styles.cardContainer}>
           
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
    // justifyContent: 'space-between',
    backgroundColor: 'yellow',
  },
  imageContainer: {},
  image: {
    height: 90,
    width: 90,
    borderRadius: 10,
  },
  cardText: {
    // flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  cardinfo1: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    justifyContent: 'space-between',
    // right: 0,
  },
  crossIcon: {
    right: 0,
  },
});
