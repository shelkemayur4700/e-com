import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import React, {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {RedButton} from '../components/RedButton';
import {
  decreaseItemQuantity,
  getCartTotal,
  increaseItemQuantity,
  removeItem,
} from '../slice/cart';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const {cart, totalQuantity, totalPrice} = useSelector(
    state => state.cartdata,
  );
  const Tprice = useSelector(state => state.cartdata.cart.quantity);

  const handleIncreaseItem = id => {
    dispatch(increaseItemQuantity(id));
  };
  const handleDcreaseItem = id => {
    dispatch(decreaseItemQuantity(id));
  };
  const handleRemoveItem = id => {
    dispatch(removeItem(id));
  };
  // WHEN CART IS EMPTY
  const HandleAddtoCart = () => {
    navigation.navigate('Home');
  };
  // ------------------------Checkout--------------
  const HandleCheckout = async cartData => {
    let tokn = await AsyncStorage.getItem('token');
    if (tokn) {
      navigation.push('MainApp', {
        screen: 'Checkout',
        params: {products: cartData},
      });
    } else {
      navigation.navigate('SignIn');
    }
  };
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  return (
    <View style={styles.mainContainer}>
      {/* -----------------EMPTY CART CONTENT-------------------------------- */}
      {cart.length <= 0 ? (
        <>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LottieView
              source={require('../Assets/EmptyCart.json')}
              autoPlay
              loop
              justifyContent="center"
              height={'50%'}
              width={'80%'}
            />
            <Text style={styles.EmptyCartText}>Your cart is empty!</Text>
            {/* SHOP NOW  */}
            <TouchableOpacity onPress={HandleAddtoCart}>
              <Text style={styles.ShopNowText}> SHOP NOW</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        // ----------------------CART CONTENT------------------------------
        <View style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.Search}>
              <TouchableOpacity>
                <FeatherIcons
                  name="search"
                  size={25}
                  color={COLORS.primaryBlack}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.Heading}>
              <Text style={styles.HeadingText}>My Bag</Text>
            </View>
            {cart.map(item => {
              return (
                <View key={item?.id} style={styles.productCard}>
                  <View>
                    <Image style={styles.cartimg} source={{uri: item?.img}} />
                  </View>
                  <View style={styles.Info}>
                    <View style={styles.prodetailsContainer}>
                      <Text style={styles.brand}>{item?.title}</Text>
                      <MaterialCommunityIcons
                        name="delete"
                        color={COLORS.primaryBlack}
                        size={20}
                        onPress={() => handleRemoveItem(item?._id)}
                      />
                    </View>
                    <View style={styles.prodetailsContainer2}>
                      <View style={styles.prodetails}>
                        <TouchableOpacity
                          onPress={() =>
                            item.quantity <= 1
                              ? handleRemoveItem(item?._id)
                              : handleDcreaseItem(item?._id)
                          }>
                          <View style={[styles.btnBackground]}>
                            <Text style={{color: COLORS.primaryBlack}}>-</Text>
                          </View>
                        </TouchableOpacity>
                        <Text style={{color: COLORS.primaryBlack}}>
                          {Number(item?.quantity)}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleIncreaseItem(item?._id)}>
                          <View style={styles.btnBackground}>
                            <Text style={{color: COLORS.primaryBlack}}>+</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.price}>
                        <Text
                          style={{fontSize: 20, color: COLORS.primaryBlack}}>
                          ₹{item?.price}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.finalPrice}>
              <Text style={styles.finalpriceInfo}>Total Amount:</Text>
              <Text style={styles.finalpriceInfo}>₹{totalPrice}</Text>
            </View>
            <View>
              <RedButton
                handleClick={() => HandleCheckout(cart)}
                name={'CHECKOUT'}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Cart;

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
  productCard: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: COLORS.Card_Background,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
  },
  cartimg: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  Info: {
    flex: 1,
    flexDirection: 'column',
  },
  prodetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  prodetailsContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 30,
  },
  prodetails: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  btnBackground: {
    backgroundColor: COLORS.primarywhite,
    height: 30,
    width: 30,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  price: {
    justifyContent: 'center',
    paddingLeft: 16,
  },
  brand: {
    color: COLORS.primaryBlack,
    fontFamily: FONTFAMILY.Metropolis_bold,
    fontSize: 20,
  },
  footer: {
    padding: 10,
  },
  finalPrice: {
    // flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  Checkout: {
    // flex: 1,
    backgroundColor: COLORS.primaryred,
    color: COLORS.primarywhite,
    height: 44,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  finalpriceInfo: {
    color: COLORS.primaryBlack,
    fontSize: 20,
  },
  EmptyCartText: {
    color: COLORS.primaryBlack,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.Mertopolis_medium,
  },
  ShopNowText: {
    backgroundColor: COLORS.primaryred,
    color: COLORS.primarywhite,
    height: 36,
    width: 150,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 20,
    marginVertical: 20,
  },
});
