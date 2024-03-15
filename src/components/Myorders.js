import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Bold_Font,
  Card_Background,
  primaryBlack,
  primarywhite,
} from '../constant';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';

const Myorders = () => {
  return (
    <>
      <View style={styles.MainContainer}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          {/* --------------header---------------- */}
          <View style={styles.headerContainer}>
            <View
              style={{
                // flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
              }}>
              <Text
                style={{
                  color: COLORS.primaryBlack,
                  fontFamily: FONTFAMILY.Metropolis_bold,
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
                  color: COLORS.primaryBlack,
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
                  fontSize: 16,
                }}>
                3 Items
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
          {/* ------CARDS------- */}
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
                <Text style={styles.subcategory}>Mango</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.CardCategory}>Color:Grey</Text>
                  <Text style={styles.Size}>Size:L</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginRight: 20,
                  }}>
                  <Text style={styles.units}>Units:1</Text>
                  <Text style={styles.units}>55$</Text>
                </View>
              </View>
            </View>
          </View>
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
                <Text style={styles.subcategory}>Mango</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.CardCategory}>Color:Grey</Text>
                  <Text style={styles.Size}>Size:L</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginRight: 20,
                  }}>
                  <Text style={styles.units}>Units:1</Text>
                  <Text style={styles.units}>55$</Text>
                </View>
              </View>
            </View>
          </View>
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
                <Text style={styles.subcategory}>Mango</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.CardCategory}>Color:Grey</Text>
                  <Text style={styles.Size}>Size:L</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginRight: 20,
                  }}>
                  <Text style={styles.units}>Units:1</Text>
                  <Text style={styles.units}>55$</Text>
                </View>
              </View>
            </View>
          </View>
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
                <Text style={styles.subcategory}>Mango</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.CardCategory}>Color:Grey</Text>
                  <Text style={styles.Size}>Size:L</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginRight: 20,
                  }}>
                  <Text style={styles.units}>Units:1</Text>
                  <Text style={styles.units}>55$</Text>
                </View>
              </View>
            </View>
          </View>
          {/* ----ORDER INFO------- */}
          <View style={styles.OrderinfoContainer}>
            <Text style={{fontSize: 20, color: COLORS.primaryBlack}}>
              Order information
            </Text>
            <View style={{flexDirection: 'row', gap: 10, padding: 5}}>
              <Text style={styles.OrderInfoKey}>Shopping Address:</Text>
              <Text style={styles.orderInfoValue}>
                3 Newbridge Court ,Chino Hills, CA 91709, United States
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10, padding: 5}}>
              <Text style={styles.OrderInfoKey}>Payment method:</Text>
              <Text style={styles.orderInfoValue}>**** **** **** 3947</Text>
            </View>

            <View style={{flexDirection: 'row', gap: 10, padding: 5}}>
              <Text style={styles.OrderInfoKey}>Delivery method:</Text>
              <Text style={styles.orderInfoValue}>FedEx, 3 days, 15$</Text>
            </View>

            <View style={{flexDirection: 'row', gap: 10, padding: 5}}>
              <Text style={styles.OrderInfoKey}>Discount:</Text>
              <Text style={styles.orderInfoValue}>
                10%, Personal promo code
              </Text>
            </View>

            <View style={{flexDirection: 'row', gap: 10, padding: 5}}>
              <Text style={styles.OrderInfoKey}>Total Amount:</Text>
              <Text style={styles.orderInfoValue}>133$</Text>
            </View>
            {/* --------BTNS----------- */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                // padding: 5,
                paddingVertical: 10,
              }}>
              <TouchableOpacity>
                <Text style={styles.orderReorder}>Reorder</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.orderFeedBack}>Leave feedback</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Myorders;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // backgroundColor: 'yellow',
    padding: 10,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.Card_Background,
    borderRadius: 10,
    marginVertical: 10,
    // backgroundColor: 'red',
  },
  ImageContainer: {},
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  TextData: {
    flex: 1,
    // justifyContent: 'space-between',
    padding: 5,
    borderBottomRightRadius: 10,
  },
  ContainerONE: {
    width: '100%',
    paddingHorizontal: 10,
  },
  Cardbrand: {
    color: COLORS.primaryBlack,
    fontSize: 22,
    fontWeight: '500',
  },
  CardCategory: {
    fontSize: 15,
    fontWeight: '400',
  },
  ContainerTWO: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  price: {
    color: COLORS.primaryBlack,
    fontSize: 18,
    fontWeight: '400',
  },
  subcategory: {
    fontSize: 15,
    padding: 2,
  },
  units: {
    fontSize: 15,
    padding: 2,
  },
  Size: {
    marginRight: 20,
  },
  OrderinfoContainer: {
    flex: 1,
    padding: 5,
    // backgroundColor: 'yellow',
  },
  OrderInfoKey: {
    fontSize: 17,
  },
  orderInfoValue: {
    color: COLORS.primaryBlack,
    fontSize: 17,
  },
  orderReorder: {
    padding: 8,
    paddingHorizontal: 40,
    color: COLORS.primaryBlack,
    borderRadius: 20,
    borderColor: COLORS.primaryBlack,
    borderWidth: 1,
    fontWeight: '500',
  },
  orderFeedBack: {
    color: COLORS.primarywhite,
    backgroundColor: COLORS.primaryred,
    padding: 8,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
});
