import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Bold_Font} from '../constant';

const Checkout = ({navigation}) => {
  return (
    <>
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* ---------ADDRESS-CONTAINER-------------- */}
          <View style={styles.addressContainer}>
            <Text style={styles.AddHeading}>Shipping address</Text>
            <View style={styles.AddCard}>
              <View style={styles.addInfo}>
                <Text>Jane Doe</Text>
                <Text>Change</Text>
              </View>
              <Text>3 Newbridge Court</Text>
              <Text>
                3 Newbridge Court Chino Hills, CA 91709, United States
              </Text>
            </View>
          </View>
          {/* ---------PAYMENT-CONTAINER-------------- */}
          {/* <View style={styles.PaymentContainer}>
            <Text>payment</Text>
          </View> */}
          {/* ---------SUMMARY-CONTAINER-------------- */}
          {/* <View style={styles.SummaryContainer}>
            <Text>Summary</Text>
          </View> */}
        </ScrollView>
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
    fontFamily: Bold_Font,
    fontSize: 18,
  },
  AddCard: {
    marginTop: 20,
    backgroundColor: 'yellow',
    borderRadius: 10,
    padding: 10,
  },
  addInfo:{
    
  },
  PaymentContainer: {},
  SummaryContainer: {},
});
