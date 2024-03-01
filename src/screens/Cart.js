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
import {
  Bold_Font,
  Card_Background,
  Header_FONT_SIZE,
  MainButton,
  primaryBlack,
  primaryred,
  primarywhite,
} from '../constant';
import {
  decreaseItemQuantity,
  getCartTotal,
  increaseItemQuantity,
  removeItem,
} from '../slice/cartSlice';

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  let tokn = useSelector(state => state.auth.token);
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
  // ------------------------Checkout--------------
  const HandleCheckout = () => {
    if (tokn) {
      // place next screen's navigation code
    } else {
      navigation.navigate('Login');
    }
  };
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.Search}>
          <TouchableOpacity>
            <FeatherIcons name="search" size={25} color={primaryBlack} />
          </TouchableOpacity>
        </View>
        <View style={styles.Heading}>
          <Text style={styles.HeadingText}>My Bag</Text>
        </View>
        {cart.map(item => {
          return (
            <View key={item?.id} style={styles.productCard}>
              <View>
                <Image style={styles.cartimg} source={{uri: item?.image}} />
              </View>
              <View style={styles.Info}>
                <View style={styles.prodetailsContainer}>
                  <Text style={styles.brand}>{item?.title}</Text>
                  <MaterialCommunityIcons
                    name="delete"
                    color={primaryBlack}
                    size={20}
                    onPress={() => handleRemoveItem(item?.id)}
                  />
                </View>
                <View style={styles.prodetailsContainer2}>
                  <View style={styles.prodetails}>
                    <TouchableOpacity
                      onPress={() => handleDcreaseItem(item?.id)}>
                      <View style={[styles.btnBackground]}>
                        <Text style={{color: primaryBlack}}>-</Text>
                      </View>
                    </TouchableOpacity>
                    <Text style={{color: primaryBlack}}>
                      {Number(item?.quantity)}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleIncreaseItem(Number(item?.id))}>
                      <View style={styles.btnBackground}>
                        <Text style={{color: primaryBlack}}>+</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.price}>
                    <Text style={{fontSize: 20, color: primaryBlack}}>
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
          <MainButton handleClick={() => HandleCheckout()} name={'CHECKOUT'} />
        </View>
      </View>
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
    color: primaryBlack,
    fontSize: Header_FONT_SIZE,
    paddingLeft: 10,
    paddingTop: 20,
  },
  productCard: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: Card_Background,
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
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // alignContent: 'center',
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
    backgroundColor: primarywhite,
    height: 30,
    width: 30,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  price: {
    // marginTop: 38,
    justifyContent: 'center',
    paddingLeft: 16,
  },
  brand: {
    color: primaryBlack,
    fontFamily: Bold_Font,
    fontSize: 20,
    // paddingLeft: 10,
    // paddingTop: 10,
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
    backgroundColor: primaryred,
    color: primarywhite,
    height: 44,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  finalpriceInfo: {
    color: primaryBlack,
    fontSize: 20,
  },
});
