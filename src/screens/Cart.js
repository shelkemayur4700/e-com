import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import FeatherIcons from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Bold_Font,
  Card_Background,
  primaryBlack,
  primarygrey,
  primaryred,
  primarywhite,
} from '../constant';
import {useDispatch, useSelector} from 'react-redux';
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  getCartTotal,
  removeItem,
} from '../slice/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const {cart, totalQuantity, totalPrice} = useSelector(
    state => state.cartdata,
  );
  const Tprice = useSelector(state => state.cartdata.cart.quantity);
  console.log('@@@', Tprice);
  const handleIncreaseItem = id => {
    dispatch(increaseItemQuantity(id));
  };
  const handleDcreaseItem = id => {
    dispatch(decreaseItemQuantity(id));
  };
  const handleRemoveItem = id => {
    dispatch(removeItem(id));
    // dispatch()
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
                    <View style={[styles.btnBackground]}>
                      <TouchableOpacity
                        onPress={() => handleDcreaseItem(item?.id)}>
                        <Text>-</Text>
                      </TouchableOpacity>
                    </View>
                    <Text>{Number(item?.quantity)}</Text>
                    <View style={styles.btnBackground}>
                      <TouchableOpacity
                        onPress={() => handleIncreaseItem(Number(item?.id))}>
                        <Text>+</Text>
                      </TouchableOpacity>
                    </View>
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
          <TouchableOpacity>
            <Text style={styles.Checkout}>CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // position: 'relative',
  },
  Search: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 30,
    paddingRight: 18,
  },
  Heading: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  HeadingText: {
    color: primaryBlack,
    fontSize: 30,
    paddingLeft: 20,
    paddingTop: 50,
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
