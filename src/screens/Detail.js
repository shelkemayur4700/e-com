import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Bold_Font,
  primaryBlack,
  primarySilver,
  primarygrey,
  primaryred,
  primarywhite,
} from '../constant';
import {
  getSingleProduct,
  getSingleproduct,
  getSingleroduct,
} from '../thunk/productThunk';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../slice/cartSlice';
import {useNavigation} from '@react-navigation/native';
const Detail = ({navigation, route}) => {
  // const navigate = useNavigation();
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const {productId} = route.params;
  const getProductDetails = async id => {
    try {
      const response = await dispatch(getSingleProduct(id)).unwrap();
      setProduct({...response, quantity: 1});
      // setProduct(response);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  const HandleAddtoCart = product => {
    dispatch(addToCart(product));
    navigation.navigate('RootScreens', {screen: 'Bag'});
  };
  useEffect(() => {
    getProductDetails(productId);
  }, [route]);
  return (
    <>
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor={primaryred} />
        <ScrollView>
          <View style={styles.Detail_Img}>
            <Image
              style={styles.Detail_Image}
              source={{uri: product?.image}}
              alt="Image"
            />
          </View>
          {/* --------------  Footer  */}
          <View style={styles.footer}>
            <View style={styles.productDetailsContainer}>
              <View style={styles.productDetails}>
                <Text style={styles.BrandName}>{product?.title}</Text>
                <Text style={styles.Price}>₹{product?.price}</Text>
              </View>
              <Text style={styles.ProductInfo}>{product?.category}</Text>
              <Text style={styles.ProductDesc}>{product?.description}</Text>
              <TouchableOpacity onPress={() => HandleAddtoCart(product)}>
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
