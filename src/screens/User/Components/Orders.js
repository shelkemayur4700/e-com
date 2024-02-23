import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  Bold_Font,
  Card_Background,
  Header_FONT_SIZE,
  primaryBlack,
  primarygrey,
  primarywhite,
} from '../../../constant';
import FeatherIcons from 'react-native-vector-icons/Feather';
import EntypoIcons from 'react-native-vector-icons/Entypo';

const Orders = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View style={styles.Search}>
          <TouchableOpacity>
            <FeatherIcons name="search" size={25} color={primaryBlack} />
          </TouchableOpacity>
        </View>
        <View style={styles.Heading}>
          <Text style={styles.HeadingText}>My Orders</Text>
        </View>
        {/* ---------------vertical scroll for filters------------ */}
        {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}> */}
        <View style={styles.filtersContainer}>
          <View style={styles.filter}>
            <Text style={styles.filterName}>Delivered</Text>
          </View>
          <View style={styles.filter}>
            <Text style={styles.filterName}>Processing</Text>
          </View>
          <View style={styles.filter}>
            <Text style={styles.filterName}>Cancelled</Text>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
      <ScrollView style={{padding: 10}}>
        {/* -----------------CARD------------ */}
        <View style={styles.cardContainer}>
          <View
            style={{
              // flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
            }}>
            <Text
              style={{
                color: primaryBlack,
                fontFamily: Bold_Font,
                fontSize: 16,
              }}>
              Order No:1947034
            </Text>
            <Text
              style={{
                // color: primaryBlack,
                fontSize: 16,
              }}>
              5-2-24
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: 5,
            }}>
            <Text
              style={{
                color: primaryBlack,
                fontSize: 16,
              }}>
              Tracking number:IW3475453455
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexDirection: 'row',
              padding: 5,
            }}>
            <Text
              style={{
                // color: primaryBlack,
                fontSize: 16,
              }}>
              Quantity:3
            </Text>
            <Text
              style={{
                // color: primaryBlack,
                fontSize: 16,
              }}>
              Total Amount :206
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 5,
              alignItems: 'center',
            }}>
            <Text
              style={{
                // backgroundColor: 'red',
                borderColor: primaryBlack,
                borderWidth: 1,
                borderRadius: 22,
                color: primaryBlack,
                paddingVertical: 8,
                paddingHorizontal: 14,
              }}>
              Details
            </Text>
            <Text
              style={{
                color: 'green',
                fontSize: 16,
              }}>
              Delivered
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
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
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: primaryBlack,
    borderRadius: 20,
  },
  filterName: {
    color: primarywhite,
    fontSize: 16,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: Card_Background,
    borderRadius: 10,
    padding: 12,
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
