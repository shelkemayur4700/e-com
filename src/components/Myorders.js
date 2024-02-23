import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Bold_Font, Card_Background, primaryBlack} from '../constant';

const Myorders = () => {
  return (
    <>
      <View style={styles.MainContainer}>
        <ScrollView style={{flex: 1}}>
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
          <View></View>
          <View></View>
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
    backgroundColor: Card_Background,
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
    // flexDirection: 'row',
    // paddingHorizontal: 20,
    // backgroundColor: 'yellow', 
  },
  Cardbrand: {
    color: primaryBlack,
    fontSize: 22,
    fontWeight: '500',
  },
  CardCategory: {
    // color: primaryBlack,
    fontSize: 15,
    fontWeight: '400',
  },
  ContainerTWO: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  price: {
    color: primaryBlack,
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
});
