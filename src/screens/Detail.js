import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {RedButton} from '../components/RedButton';
import {addToCart} from '../slice/cart';
import {COLORS, FONTFAMILY} from '../theme/theme';

const Detail = ({navigation, route}) => {
  const dispatch = useDispatch();
  let productInfo = route.params.product;

  // Temp solution to manage quantity
  let productData = {...productInfo, quantity: 1};

  const HandleAddtoCart = product => {
    dispatch(addToCart(product));
    navigation.push('HomePage', {
      screen: 'Bag',
    });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.primaryred} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Detail_Img}>
          <Image
            style={styles.Detail_Image}
            source={{uri: productData?.img}}
            alt="Image"
          />
        </View>
        {/* --------------  Footer  */}
        <View style={styles.footer}>
          <View style={styles.productDetailsContainer}>
            <View style={styles.productDetails}>
              <Text style={styles.BrandName}>{productData?.title}</Text>
              <Text style={styles.Price}>₹{productData?.price}</Text>
            </View>
            <Text style={styles.ProductInfo}>{productData?.category}</Text>
            <Text style={styles.ProductDesc}>{productData?.description}</Text>
          </View>
          {/* SIMILER PRODUCT SECTION  */}
          <View style={styles.SimilerProd}>
            <Text>Hello</Text>
          </View>
          {/* RATINGS AND REVIEW SECTION  */}
          <View style={styles.Review}>
            <View style={styles.ratingTitle}></View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.addButtonContainer}>
        <RedButton
          handleClick={() => HandleAddtoCart(productData)}
          name="ADD TO CART"
        />
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  Detail_Img: {
    paddingTop: 20,
    alignItems: 'center',
  },
  Detail_Image: {
    height: 300,
    width: 200,
    borderRadius: 20,
  },
  footer: {
    flex: 1,
    padding: 10,
  },
  productDetailsContainer: {
    flex: 1,
    padding: 10,
  },
  productDetails: {
    flex: 1,
  },
  BrandName: {
    fontFamily: FONTFAMILY.Metropolis_bold,
    color: COLORS.primaryBlack,
    fontSize: 25,
  },
  Price: {
    color: COLORS.primaryBlack,
    paddingRight: 10,
    fontSize: 25,
  },
  ProductInfo: {
    color: COLORS.primarygrey,
    paddingTop: 5,
  },
  ProductDesc: {
    color: COLORS.primaryBlack,
    justifyContent: 'center',
    paddingTop: 5,
    fontSize: 15,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  SimilerProd: {
    backgroundColor: 'yellow',
  },
  Review: {
    backgroundColor: 'green',
  },
  ratingTitle: {},
});
