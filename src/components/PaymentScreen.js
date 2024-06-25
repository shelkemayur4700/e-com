import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTFAMILY} from '../theme/theme';
import {PaymentApi, SaveOrderDataApi} from '../thunk/order';
import {RedButton} from './RedButton';
const PaymentScreen = ({navigation, route}) => {
  const {total, products, deliveryCharges} = route.params;
  console.log('total', deliveryCharges);

  const dispatch = useDispatch();
  const address = useSelector(state => state?.address?.PrefferedAdd);
  const [clientSecretData, setClientSecretData] = useState('');
  const [paymentType, setPaymentType] = useState({
    COD: false,
    CARD: false,
  });
  //METHOD TO SELECT COD
  const HandleCOD = () => {
    setPaymentType({COD: true, CARD: false});
  };
  //METHOD TO HandleCardPayment
  const HandleCardPayment = () => {
    setPaymentType({CARD: true, COD: false});
  };

  // METHOD TO  INITALIZE PAYMENT
  const initpayment = async () => {
    try {
      const Email = await AsyncStorage.getItem('UserEmail');
      //SEND ADD OF USER TO CREATE CUSTOMER ON THAT ADD IN STRIPE
      let AddId = await AsyncStorage.getItem('prefferedAdd');
      // setClientSecret(true);
      console.log('total from function', total);
      const clientSecret = await dispatch(
        PaymentApi({amount: total, AddId}),
      ).unwrap();
      setClientSecretData(clientSecret?.paymentIntent);

      const {error} = await initPaymentSheet({
        merchantDisplayName: 'Example, Inc.',
        customerId: clientSecret?.customer,
        paymentIntentClientSecret: clientSecret?.paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          email: Email || 'shelkegroups00@gmail.com',
        },
      });
      if (error) {
        console.error('Error initializing payment sheet:', error);
      } else {
        console.log('Payment sheet initialized successfully');
      }
    } catch (error) {
      console.log('erro', error);
    }
  };

  //SUBMIT BUTTON CALL
  const HandleSubmit = async () => {
    console.log('workong');
    if (paymentType.CARD == true) {
      const {error} = await presentPaymentSheet({
        clientSecret: clientSecretData,
      });
      if (error) {
        console.error('Error presenting payment sheet:', error);
      } else {
        console.log('sheet presented sucess!');
        //SUBMIT ORDER DETAILS TO DATABASE
        SaveOrderData();
      }
    } else {
      SaveOrderData();
    }
  };
  //API CALL TO SAVE ORDER DETAILS IN DATABASE.
  const SaveOrderData = async () => {
    try {
      console.log('from db function');
      let userDetails = await AsyncStorage.getItem('LogInUser');
      let userData = JSON.parse(userDetails);
      console.log('user id is ', userData?._id);
      const payload = {
        products,
        address,
        paymentDetails: {
          total: total,
          modeOfPayment: paymentType?.CARD ? 'CARD' : 'COD',
          deliveryCharges: deliveryCharges,
        },
        id: userData?._id,
        orderStatus: 'Placed',
      };
      console.log('payload', payload);
      const order = await dispatch(SaveOrderDataApi(payload)).unwrap();
      if (order) {
        navigation.navigate('Success');
      }
      console.log('order', order);
    } catch (error) {
      console.log('error from Saveorder', error);
    }
  };

  useEffect(() => {
    initpayment();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.HeadingText}>Choose Payment Method</Text>
      <View>
        {/* TOTAL AMOUNT VIEW SECTION */}

        <View style={styles.TotalAmtContainer}>
          <Text style={styles.totalAMTtext}>Total : </Text>
          <Text style={styles.tAMTtext}>₹{total}</Text>
        </View>
        {/* DEBIT CREDIT CARD CONTAINER  */}
        <TouchableOpacity
          style={styles.MethodContainer}
          onPress={HandleCardPayment}>
          <AntDesignIcon
            // name={'checksquare'}
            name={paymentType.CARD == true ? 'checksquare' : 'checksquareo'}
            size={20}
            color={COLORS.primaryBlack}
          />
          <Text style={styles.methodText}>Pay using debit/credit card</Text>
        </TouchableOpacity>
        {/* COD  CONTAINER  */}
        <TouchableOpacity style={styles.MethodContainer} onPress={HandleCOD}>
          <AntDesignIcon
            // name={'checksquare'}
            name={paymentType.COD == true ? 'checksquare' : 'checksquareo'}
            size={20}
            color={COLORS.primaryBlack}
          />
          <Text style={styles.methodText}>Cash on delivery</Text>
        </TouchableOpacity>
      </View>
      {/* FOOTER COMPONENT SUBMIT BUTTON */}
      <View style={styles.footer}>
        <RedButton
          handleClick={() => HandleSubmit()}
          name={'CONTINUE TO PAY'}
        />
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  HeadingText: {
    fontFamily: FONTFAMILY.Metropolis_bold,
    fontSize: 18,
    color: COLORS.primaryBlack,
  },
  TotalAmtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F9DBD4',
    borderRadius: 10,
    marginVertical: 20,
  },
  totalAMTtext: {
    color: COLORS.primaryred,
    fontSize: 20,
  },
  tAMTtext: {
    color: COLORS.primaryred,
    fontSize: 20,
    fontWeight: '900',
  },
  MethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 9,
  },
  methodText: {
    color: COLORS.primaryBlack,
    fontSize: 16,
  },
});
