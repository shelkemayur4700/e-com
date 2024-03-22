import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTFAMILY} from '../../../theme/theme';
const Address = () => {
  const [isChecked, setIsChecked] = useState(false);
  const HandleSelectDeliveryAdd = () => {
    console.log('function');
    setIsChecked(!isChecked);
  };

  return (
    <>
      {/* <AntDesignIcon name="plus" size={30} /> */}
      <View style={styles.AddressMainContainer}>
        <View style={styles.AddressCardContainer}>
          <View style={styles.ClientNameContainer}>
            <Text style={styles.ClientNameText}>Jhon Doe</Text>
            <TouchableOpacity>
              <Text style={[styles.ClientNameText, styles.editText]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ClientAddressContainer}>
            <Text style={styles.AddressText}>
              3 Newbridge Court Chino Hills, XA 917898, United States.
            </Text>
          </View>
          <TouchableOpacity
            onPress={HandleSelectDeliveryAdd}
            style={styles.AddressButtonContainer}>
            <AntDesignIcon
              name={isChecked ? 'checksquare' : 'checksquareo'}
              size={20}
              color={COLORS.primaryBlack}
            />
            {/* <AntDesignIcon
              name="checksquareo"
              size={20}
              color={COLORS.primaryBlack}
            /> */}
            <Text style={styles.AddressText}>Use as the shipping Address.</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.PlusBtnContainer}></View>
      </View>
    </>
  );
};

export default Address;

const styles = StyleSheet.create({
  AddressMainContainer: {
    flex: 1,
    padding: 10,
  },
  AddressCardContainer: {
    backgroundColor: COLORS.Card_Background,
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 16,
  },
  ClientNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
    paddingVertical: 5,
  },
  ClientNameText: {
    fontSize: 16,
    fontFamily: FONTFAMILY.Metropolis_bold,
    color: COLORS.primaryBlack,
  },
  editText: {
    color: COLORS.primaryred,
  },
  ClientAddressContainer: {
    padding: 2,
    paddingVertical: 8,
  },
  AddressButtonContainer: {
    padding: 2,
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 8,
  },
  AddressText: {
    fontFamily: FONTFAMILY.Mertopolis_medium,
    fontSize: 16,
    color: COLORS.primaryBlack,
  },
  PlusBtnContainer: {
    flexDirection: 'column',
    backgroundColor: COLORS.primaryBlack,
    borderRadius: 50,
    // padding: 20,
    width: 50,
    height: 50,
  },
});
