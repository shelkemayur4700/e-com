import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
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

const Checkout = ({navigation}) => {
  const dispatch = useDispatch();
  const address = useSelector(state => state?.address?.PrefferedAdd);
  const loading = useSelector(state => state?.address?.loading);
  console.log('address', address, loading);
  //METHOD TO SUBMIT ORDER
  const handleSubmitOrder = () => {
    navigation.push('Success');
  };
  //METHOD TO GET PREFFERED ADDRESS
  const getSelectedAdd = async () => {
    let id = await AsyncStorage.getItem('prefferedAdd');
    console.log('preferred address', id);
    try {
      const res = await dispatch(getSingleAddress({AddId: id})).unwrap();
      console.log('reponse by getaddbyID in checkout section', res);
    } catch (error) {
      console.log('error from getbyid in checkout section', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        getSelectedAdd();
      }, 1000);
    }, []),
  );
  //   {"__v": 0, "_id": "664952aa222a18ee58e3bda6", "address": "Morgaon ", "city": "Baramati", "isHome": true, "name":
  // "Swapnil ", "phoneNo": 9860247070, "postalCode": "123321", "state": "Maharashtra ", "userId": "664391129fba997fe5c5f15e"}
  return (
    <>
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading && LoaderComp}
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
                  {address.isHome ? ' Home' : 'Type : Work'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* ---------PAYMENT-CONTAINER-------------- */}
          <View style={styles.PaymentContainer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.paymentHeading}>Payment</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.paymentCard}>
                <View style={styles.paymetLogoCard}>
                  <TouchableOpacity onPress={() => navigation.push('Payment')}>
                    <Text style={styles.changebtn}>Change</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardDetails}>
                  <Image
                    style={{
                      height: 90,
                      width: 90,
                      objectFit: 'scale-down',
                    }}
                    source={require('../Assets/Images/Mastercard.png')}
                  />
                  <Text style={styles.cardInfo}>**** **** **** 2345</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* ---------SUMMARY-CONTAINER-------------- */}
        <View style={styles.SummaryContainer}>
          <View style={styles.SummaryInfo}>
            <Text style={styles.summaryText}>Order:</Text>
            <Text style={styles.summaryText}>112</Text>
          </View>
          {/* ------------------- */}
          <View style={styles.SummaryInfo}>
            <Text style={styles.summaryText}>Delivery:</Text>
            <Text style={styles.summaryText}>13</Text>
          </View>
          {/* ------------------------- */}
          <View style={styles.SummaryInfo}>
            <Text style={[styles.summaryText, styles.summaryHeading]}>
              Summary:
            </Text>
            <Text style={[styles.summaryText, styles.summaryHeading]}>
              ₹ 125
            </Text>
          </View>
        </View>
        {/* -----------------SUBMIT ORDER-------------------------- */}
        <View style={styles.submitBTN}>
          <RedButton handleClick={handleSubmitOrder} name={'SUBMIT ORDER'} />
        </View>
      </View>
    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 20,
    padding: 10,
  },
  addressContainer: {},
  AddHeading: {
    fontFamily: FONTFAMILY.Metropolis_bold,
    fontSize: 18,
    color: COLORS.primaryBlack,
  },
  AddCard: {
    marginTop: 20,
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
  paymentHeading: {
    fontFamily: FONTFAMILY.Metropolis_bold,
    fontSize: 18,
    color: COLORS.primaryBlack,
  },
  paymentCard: {
    marginTop: 20,
    // backgroundColor: 'yellow',
    backgroundColor: COLORS.Card_Background,
    borderRadius: 10,
    padding: 5,
  },
  paymetLogoCard: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingRight: 20,
    paddingTop: 10,
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    // backgroundColor: 'red',
  },
  cardInfo: {
    color: COLORS.primaryBlack,
    fontSize: 16,
    fontWeight: '600',
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
  },
  submitBTN: {
    // position: 'absolute',
    bottom: 0,
  },
});
