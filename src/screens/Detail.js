import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  Bold_Font,
  primaryBlack,
  primarygrey,
  primaryred,
  primarywhite,
} from '../constant';
import {addToCart} from '../slice/cartSlice';
const Detail = ({navigation, route}) => {
  const dispatch = useDispatch();
  let productData = route.params.product;

  const HandleAddtoCart = product => {
    dispatch(addToCart(product));
    navigation.navigate('Bag');
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor={primaryred} />
        <ScrollView>
          <View style={styles.Detail_Img}>
            <Image
              style={styles.Detail_Image}
              source={{uri: productData?.image}}
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
              <TouchableOpacity onPress={() => HandleAddtoCart(productData)}>
                <Text style={styles.addtoCart}>ADD TO CART</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Detail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
    fontFamily: Bold_Font,
    color: primaryBlack,
    fontSize: 25,
  },
  Price: {
    color: primaryBlack,
    paddingRight: 10,
    fontSize: 25,
  },
  ProductInfo: {
    color: primarygrey,
    paddingTop: 5,
  },
  ProductDesc: {
    color: primaryBlack,
    justifyContent: 'center',
    paddingTop: 5,
    fontSize: 15,
  },
  addtoCart: {
    flex: 1,
    backgroundColor: primaryred,
    color: primarywhite,
    height: 44,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 20,
    marginTop: 10,
    // fontFamily: Bold_Font,
  },
});
