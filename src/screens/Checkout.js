import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LoaderComp from '../components/LoaderComp';
import {RedButton} from '../components/RedButton';
import {COLORS, FONTFAMILY} from '../theme/theme';
import {getSingleAddress} from '../thunk/address';

const Checkout = ({navigation, route}) => {
  let {products} = route.params;
  const dispatch = useDispatch();
  const address = useSelector(state => state?.address?.PrefferedAdd);
  const totalPrice = useSelector(state => state?.cartdata?.totalPrice);
  // const loading = useSelector(state => state?.address?.loading);
  const [loading, setLoading] = useState(false);
  //METHOD TO Proceed
  const handleProceed = () => {
    navigation.push('Payment', {
      total: orderTotal(),
      products,
      deliveryCharges: 40,
    });
  };
  //METHOD TO GET PREFFERED ADDRESS
  const getSelectedAdd = async () => {
    let id = await AsyncStorage.getItem('prefferedAdd');
    try {
      setLoading(true);
      const res = await dispatch(getSingleAddress({AddId: id})).unwrap();
      console.log('reponse by getaddbyID in checkout section', res);
      if (res) {
        setLoading(false);
      }
    } catch (error) {
      console.log('error from getbyid in checkout section', error);
    }
  };
  //METHOD TO GET PRODUCT'S TOTAL AMOUNT
  const getProdTotal = (quantity, price) => {
    return quantity * price;
  };
  //METHOD TO GET TOTAL OF ORDER
  const orderTotal = () => {
    const deliveryCharges = 40;
    let OrderTotalPrice = totalPrice + deliveryCharges;
    return OrderTotalPrice;
  };
  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        getSelectedAdd();
      }, 1000);
    }, []),
  );

  return (
    <>
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading && <LoaderComp />}
          {/* ---------ADDRESS-CONTAINER-------------- */}
          <View style={styles.addressContainer}>
            <Text style={styles.AddHeading}>Shipping address</Text>
            <TouchableOpacity>
              <View style={styles.AddCard}>
                <View style={styles.addInfo}>
                  <Text style={styles.username}>{address?.name}</Text>
                  <TouchableOpacity onPress={() => navigation.push('Address')}>
                    <Text style={styles.changebtn}>Change</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.add1}>{address?.address}</Text>
                <Text style={styles.add2}>
                  {address?.city}
                  {' ,'} {address?.state}
                  {'-'}
                  {address?.postalCode}
                  {address.isHome ? ' Home' : 'Work'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* ---------ORDER ITEMS-CONTAINER-------------- */}
          <View style={styles.PaymentContainer}>
            <Text style={styles.AddHeading}>Items</Text>
            <TouchableOpacity>
              <FlatList
                style={{flex: 1}}
                data={products}
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                  <View key={item?.id} style={styles.productCard}>
                    <View>
                      <Image style={styles.cartimg} source={{uri: item?.img}} />
                    </View>
                    <View style={styles.Info}>
                      <View style={styles.prodetailsContainer}>
                        <Text style={styles.brand}>{item?.title}</Text>
                      </View>
                      <View style={styles.prodetailsContainer2}>
                        <View style={styles.prodetails}>
                          <Text style={{color: COLORS.primaryBlack}}>
                            Quantity: {Number(item?.quantity)}
                          </Text>
                        </View>
                        <View style={styles.price}>
                          <Text style={{color: COLORS.primaryBlack}}>
                            Price: ₹{item?.price}
                          </Text>
                        </View>
                      </View>
                      <View style={{paddingLeft: 10}}>
                        <Text
                          style={{
                            color: COLORS.primaryBlack,
                            fontSize: 14,
                            fontWeight: 'bold',
                          }}>
                          Total: {getProdTotal(item?.quantity, item?.price)}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* ---------SUMMARY-CONTAINER-------------- */}
        <View style={styles.SummaryContainer}>
          <View style={styles.SummaryInfo}>
            <Text style={styles.summaryText}>Order:</Text>
            <Text style={styles.summaryText}>{totalPrice}</Text>
          </View>
          {/* ------------------- */}
          <View style={styles.SummaryInfo}>
            <Text style={styles.summaryText}>Delivery:</Text>
            <Text style={styles.summaryText}>40</Text>
          </View>
          {/* ------------------------- */}
          <View style={styles.SummaryInfo}>
            <Text style={[styles.summaryText, styles.summaryHeading]}>
              Summary:
            </Text>
            <Text style={[styles.summaryText, styles.summaryHeading]}>
              ₹{orderTotal()}
            </Text>
          </View>
        </View>
        {/* -----------------SUBMIT ORDER-------------------------- */}
        <View style={styles.submitBTN}>
          <RedButton handleClick={() => handleProceed()} name={'CONTINUE'} />
        </View>
      </View>
    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // paddingVertical: 20,
    padding: 10,
  },
  addressContainer: {},
  AddHeading: {
    fontFamily: FONTFAMILY.Metropolis_bold,
    fontSize: 18,
    color: COLORS.primaryBlack,
  },
  AddCard: {
    marginTop: 10,
    backgroundColor: COLORS.Card_Background,
    borderRadius: 10,
    padding: 20,
  },
  addInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primaryBlack,
    paddingVertical: 5,
  },
  changebtn: {
    color: COLORS.primaryred,
    fontSize: 18,
    fontWeight: '500',
  },
  add1: {
    paddingVertical: 2,
    color: COLORS.primaryBlack,
    fontSize: 16,
    fontWeight: '400',
  },
  add2: {
    paddingVertical: 2,
    color: COLORS.primaryBlack,
    fontSize: 16,
    fontWeight: '400',
  },
  PaymentContainer: {
    marginTop: 20,
    // backgroundColor: 'red',
  },
  SummaryContainer: {
    marginTop: 20,
  },
  summaryHeading: {
    fontFamily: FONTFAMILY.Metropolis_bold,
    fontSize: 18,
    color: COLORS.primaryBlack,
  },
  SummaryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
    paddingHorizontal: 10,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primaryBlack,
  },
  submitBTN: {
    bottom: 0,
  },
  productCard: {
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.Card_Background,
    borderRadius: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  cartimg: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  Info: {
    // flex: 1,
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
    alignItems: 'baseline',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    gap: 8,
  },
  brand: {
    color: COLORS.primaryBlack,
    fontFamily: FONTFAMILY.Metropolis_bold,
    fontSize: 15,
  },
});
