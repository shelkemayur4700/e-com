import {
  Button,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProducts} from '../../thunk/productThunk';
import {primaryBlack, primaryred, primarywhite} from '../../constant';
import Banner from './Components/Banner';
import ProductCard from './Components/ProductCard';

const HomeScreen = () => {
  return (
    <ScrollView>
      <View>
        <View style={{flex: 1}}>
          <Banner />
        </View>
        <View style={{flex: 1}}>
          {/* ------------Products container  */}
          <View style={styles.productContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>New</Text>
              <Text style={styles.text1}>View all</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <ProductCard />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  productContainer: {
    // flex: 1,
  },
  headingContainer: {
    justifyContent: 'center',
  },
  heading: {
    color: primaryBlack,
    fontSize: 32,
    fontFamily: 'Metropolis-Bold',
    padding: 10,
  },
  text1: {
    fontFamily: 'Mertopolis-Medium',
    color: primaryBlack,
    fontSize: 11,
    position: 'absolute',
    right: 0,
    padding: 20,
  },
});
