import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../theme/theme';
import {
  createAddressAPI,
  getLocation,
  getSingleAddress,
  updateAddress,
} from '../thunk/address';
import {getLocationPermission} from '../utills';
import LoaderComp from './LoaderComp';
import {RedButton} from './RedButton';

const AddAddress = ({navigation, route}) => {
  const toast = useToast();
  const AddId = route?.params?.AddId;
  // console.log('aaddid , from props', route?.params?.AddId);
  const loadingState = useSelector(state => state?.address?.loading);
  const dispatch = useDispatch();
  const userId = useSelector(state => state?.auth?.userId);
  const [loading, setLoading] = useState(false);
  const [addData, setAddData] = useState({
    name: '',
    phoneNo: null,
    address: '',
    city: '',
    state: '',
    postalCode: '',
    isHome: false,
  });
  console.log('Add from state', addData);
  //METHOD TO COLLECT DATA
  const getData = (value, key) => {
    setAddData({...addData, [key]: value});
  };
  console.log('AddData', addData);

  //API CALL TO CREATE ADDRESS & UPDATE ADDRESS
  const HandleSaveAddress = async () => {
    const payload = {
      ...addData,
      id: userId,
      AddId: AddId ? AddId : null,
    };
    try {
      setLoading(true);
      let res;
      if (AddId) {
        console.log('calling from if block');
        res = await dispatch(updateAddress(payload));
      } else {
        console.log('calling from else block');
        res = await dispatch(createAddressAPI(payload));
      }
      setLoading(false);
      console.log('res update Address->', res);
      if (res?.payload?.status == 'Success') {
        toast.show(res?.payload?.message, {type: 'success'});
        navigation.pop();
      }
    } catch (error) {
      console.log('error from Add Address->', error);
      toast.show(
        error?.response?.data?.message || 'error to update address  ',
        {
          type: 'danger',
        },
      );
    }
  };
  //METHOD TO GET SINGLE ADDRESS
  const getaddById = async () => {
    try {
      setLoading(true);
      const res = await dispatch(getSingleAddress({AddId: AddId})).unwrap();
      console.log('address to update ', res);
      setAddData(res?.add);
      setLoading(false);
      // toast.show(res?.message, {type: 'success'});
      console.log('reponse by getaddbyID', res);
    } catch (error) {
      console.log('error from getbyid', error);
      toast.show(error?.response?.data?.message || 'unable to fetch add  ', {
        type: 'danger',
      });
    }
  };

  // //METHOD TO GET MY CURRENT LOCATION
  const GetMylocation = async () => {
    //IT WILL CHECK FOR PERMISSIONS
    getLocationPermission();
    Geolocation.getCurrentPosition(async info => {
      try {
        console.log('info', info);
        setLoading(true);
        let res = await dispatch(getLocation(info?.coords)).unwrap();
        // console.log(
        //   'response from google API',
        //   res?.results[0]?.formatted_address,
        // );
        const result = res?.results[0];
        const addressComponents = result?.address_components;
        let address = '',
          city = '',
          state = '',
          postalCode = '';
        addressComponents.forEach(d => {
          const types = d.types;
          if (types.includes('premise')) {
            address = d.long_name + ' ';
          }
          if (types.includes('street_number')) {
            address = d.long_name + ' ';
          }
          if (types.includes('route')) {
            address += d.long_name;
          }
          if (types.includes('locality')) {
            city = d.long_name;
          }
          if (types.includes('administrative_area_level_1')) {
            state = d.long_name;
          }
          if (types.includes('postal_code')) {
            postalCode = d.long_name;
          }
        });
        const addInfo = {
          address,
          city,
          state,
          postalCode,
        };
        setAddData(addInfo);
        setLoading(false);
      } catch (error) {
        console.log('error from google api', error);
        toast.show('Unable to get location', {
          type: 'danger',
        });
      }
    });
  };
  // TO UPDATE COMPONENT WHEN WANT TO EDIT ADDRESS
  useEffect(() => {
    if (AddId) {
      getaddById();
    }
  }, [AddId]);

  return (
    <View style={styles.MainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading && <LoaderComp />}
        <TouchableOpacity
          style={styles.UseMyLocationBtnContainer}
          onPress={() => GetMylocation()}>
          <MaterialCommunityIcons
            name="crosshairs-gps"
            size={16}
            color={COLORS.primarywhite}
          />
          <Text style={styles.UseLOcationText}>Use my current location </Text>
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <Text style={styles.lable}>Name *</Text>
          <TextInput
            style={styles.nameForm}
            placeholder="Enter Name"
            onChangeText={txt => getData(txt, 'name')}
            value={addData?.name}
          />
          <Text style={styles.lable}>Phone no *</Text>
          <TextInput
            style={styles.nameForm}
            placeholder="Enter Phone Number"
            onChangeText={txt => getData(txt, 'phoneNo')}
            value={addData?.phoneNo}
          />
          <Text style={styles.lable}>Address *</Text>
          <TextInput
            style={styles.nameForm}
            placeholder="Enter Address"
            onChangeText={txt => getData(txt, 'address')}
            value={addData?.address}
          />
          <Text style={styles.lable}>City *</Text>
          <TextInput
            style={styles.nameForm}
            placeholder="Enter City"
            onChangeText={txt => getData(txt, 'city')}
            value={addData?.city}
          />
          <Text style={styles.lable}>State *</Text>
          <TextInput
            style={styles.nameForm}
            placeholder="Enter State"
            onChangeText={txt => getData(txt, 'state')}
            value={addData?.state}
          />
          <Text style={styles.lable}>Postal code *</Text>
          <TextInput
            style={styles.nameForm}
            placeholder="Enter postalCode"
            onChangeText={txt => getData(txt, 'postalCode')}
            value={addData?.postalCode}
          />
          <View style={styles.TypeAddContainer}>
            <Text
              style={{
                color: COLORS?.primaryBlack,
                paddingBottom: 2,
              }}>
              {' '}
              Type of Address{' '}
            </Text>
            <View style={styles.AddTypeBtnContainer}>
              <TouchableOpacity
                style={styles.HomeBtn}
                onPress={() => getData(true, 'isHome')}>
                <EntypoIcon name="home" size={16} color={COLORS.primarywhite} />
                <Text style={styles.BtnText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.HomeBtn}
                onPress={() => getData(false, 'isHome')}>
                <FontAwesome5Icon
                  name="building"
                  size={16}
                  color={COLORS.primarywhite}
                />
                <Text style={styles.BtnText}>Work</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
        // style={{marginTop: 50}}
        >
          <RedButton
            name="SAVE ADDRESS"
            handleClick={() => HandleSaveAddress()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    padding: 10,
  },
  UseMyLocationBtnContainer: {
    backgroundColor: COLORS.primaryBlack,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  UseLOcationText: {
    color: COLORS.primarywhite,
  },
  formContainer: {
    // flex: 1,
    marginTop: 8,
  },
  nameForm: {
    height: 50,
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: COLORS.Card_Background,
    padding: 10,
    borderRadius: 7,
    elevation: 4,
  },
  TypeAddContainer: {
    // marginVertical: 10,
    // padding: 10,
  },
  AddTypeBtnContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 10,
  },
  HomeBtn: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primaryBlack,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  BtnText: {
    color: COLORS.primarywhite,
  },
  lable: {
    marginLeft: 18,
    color: COLORS?.primaryBlack,
    paddingBottom: 2,
  },
});
