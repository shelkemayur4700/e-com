import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import LoaderComp from '../../../components/LoaderComp';
import {COLORS, FONTFAMILY} from '../../../theme/theme';
import {deleteAddress, getallAddressAPI} from '../../../thunk/address';
const Address = ({navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const userId = useSelector(state => state?.auth?.userId);
  const [isChecked, setIsChecked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addData, setAddData] = useState([]);
  console.log(addData);
  // METHOD TO SELECT ADD

  const HandleSelectDeliveryAdd = async id => {
    console.log('HandleSelectDeliveryAdd', id);
    setIsChecked(id);
    await AsyncStorage.setItem('prefferedAdd', id);
  };
  // METHOD TO ADD ADDRESS
  const handleAddAddress = () => {
    navigation.push('AddAddress');
  };
  // API CALL TO GET ALL ADDRESS OF SPECIFIC USER
  const getallAddress = async () => {
    try {
      payload = {
        userid: userId,
      };
      setLoading(true);
      const res = await dispatch(getallAddressAPI(payload)).unwrap();
      setLoading(false);
      console.log('response from get all address', res);
      if (res) {
        // toast.show(res?.message, {type: 'success'});
        setAddData(res?.ADD);
      }
    } catch (error) {
      setLoading(false);
      console.log('error from getAll add', error);
      toast.show(error?.response?.data?.message || 'unable to load address  ', {
        type: 'danger',
      });
    }
  };
  // METHOD TO EDIT ADDRESS
  const handleEditAddress = async id => {
    navigation.push('AddAddress', {AddId: id});
  };
  //METHOD TO DELETE ADDRESS
  const handleDeleteAddress = async id => {
    try {
      setLoading(true);
      let res = await dispatch(deleteAddress({AddId: id})).unwrap();
      setLoading(false);
      if (res?.status == 'Success') {
        getallAddress();
        console.log('address deleted sucessfully.');
      }
    } catch (error) {
      console.log('error address delete', error);
    }
  };
  //TO CALL API ONLY WHEN PAGE IS ON FOCOUSED/OPENED
  useFocusEffect(
    useCallback(() => {
      getallAddress();
    }, []),
  );
  return (
    <>
      {/* <AntDesignIcon name="plus" size={30} /> */}
      <View style={styles.AddressMainContainer}>
        {loading && <LoaderComp />}
        {/* ------------- */}
        {addData?.length == 0 ? (
          <View
            style={{
              marginTop: 20,
              justifyContent: 'center',
              // alignContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                color: COLORS?.primaryBlack,
              }}>
              {' '}
              You don't have Address Please add address !
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              style={{flex: 1}}
              // horizontal
              contentContainerStyle={{gap: 8}}
              showsVerticalScrollIndicator={false}
              data={addData}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
                <View style={styles.AddressCardContainer}>
                  <View style={styles.ClientNameContainer}>
                    <Text style={styles.ClientNameText}>{item?.name}</Text>
                    <TouchableOpacity
                      onPress={() => handleEditAddress(item?._id)}>
                      <Text style={[styles.ClientNameText, styles.editText]}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.ClientAddressContainer}>
                    <Text style={styles.AddressText}>
                      {item?.address}
                      {','}
                      {item?.city} {''}
                      {item?.state} {' - '}
                      {item?.postalCode}
                    </Text>
                    <Text style={styles.AddressText}>
                      {item?.isHome ? ' Home' : 'Office'} {' -  '}
                      {item?.phoneNo}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() => HandleSelectDeliveryAdd(item._id)}
                      style={styles.AddressButtonContainer}>
                      <AntDesignIcon
                        name={
                          isChecked == item?._id
                            ? 'checksquare'
                            : 'checksquareo'
                        }
                        size={20}
                        color={COLORS.primaryBlack}
                      />
                      <Text style={styles.AddressText}>
                        Use as the shipping Address.
                      </Text>
                    </TouchableOpacity>
                    <View>
                      <MaterialCommunityIcons
                        name="delete"
                        color={COLORS.primaryBlack}
                        size={20}
                        onPress={() => handleDeleteAddress(item?._id)}
                      />
                    </View>
                  </View>
                </View>
              )}
            />
          </>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            // backgroundColor: 'yellow',
          }}>
          <TouchableOpacity
            style={styles.PlusBtnContainer}
            onPress={() => handleAddAddress()}>
            <AntDesignIcon name="plus" size={20} color={COLORS.primarywhite} />
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlack,
    borderRadius: 50,
    width: 50,
    height: 50,
    marginVertical: 10,
    // left: -1,
    elevation: 10,
    marginRight: 5,
  },
});
