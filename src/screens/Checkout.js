import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RedButton} from '../components/RedButton';
import {COLORS, FONTFAMILY} from '../theme/theme';

const Checkout = ({navigation}) => {
  const handleSubmitOrder = () => {
    navigation.push('Success');
  };
  return (
    <>
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* ---------ADDRESS-CONTAINER-------------- */}
          <View style={styles.addressContainer}>
            <Text style={styles.AddHeading}>Shipping address</Text>
            <TouchableOpacity>
              <View style={styles.AddCard}>
                <View style={styles.addInfo}>
                  <Text style={styles.username}>Jane Doe</Text>
                  <TouchableOpacity onPress={() => navigation.push('Address')}>
                    <Text style={styles.changebtn}>Change</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.add1}>3 Newbridge Court</Text>
                <Text style={styles.add2}>
                  Chino Hills, CA 91709, United States
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
            <Text style={[styles.summaryText, styles.summaryHeading]}>125</Text>
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
