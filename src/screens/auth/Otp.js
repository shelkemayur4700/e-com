import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import {useToast} from 'react-native-toast-notifications';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import LoaderComp from '../../components/LoaderComp';
import {RedButton} from '../../components/RedButton';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import {OtpValidateApi} from '../../thunk/auth';

const Otp = ({navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  let token = useSelector(state => state?.auth?.ForegetPasstoken);
  // console.log('selector', token);
  const [loading, setLoading] = useState(false);
  const [otp, SetOtp] = useState();
  const getOtp = otp => {
    SetOtp(otp);
  };
  console.log('otp', otp);
  // API CALL TO SEND OTP
  const handleVerifyOTP = async () => {
    try {
      const payload = {
        otp: otp,
        token: token,
      };
      setLoading(true);
      let res = await dispatch(OtpValidateApi(payload)).unwrap();
      setLoading(false);
      console.log('error from otp ', res);
      if (res?.status == 'Success') {
        setLoading(false);
        // TO SHOW TOAST ON SAME SCREEN
        setTimeout(() => {
          toast.show(res?.message, {type: 'success'});
        }, 2000);
        navigation.push('NewPass');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.show(error?.response?.data?.message || 'unable to send OPT  ', {
        type: 'danger',
      });
    }
  };
  // RESEND OTP METHOD
  const ResendOtp = async () => {
    console.log('RESENDOTP');
    let user = await AsyncStorage.getItem('userID');
    let Token = await AsyncStorage.getItem('token');
    console.log('userdata', user, Token);
    // navigation.push('NewPass');
  };

  const getuserData = async () => {
    let user = await AsyncStorage.getItem('userID');
    let Token = await AsyncStorage.getItem('token');
    console.log('userdata', user, Token);
  };
  useEffect(() => {
    getuserData();
  }, []);
  return (
    <>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          {loading && <LoaderComp />}
          <View style={styles.HeaderSection}>
            <View style={styles.backBtnContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack('ForgetPass');
                }}>
                <IoniconsIcons
                  name="chevron-back"
                  color={COLORS.primaryBlack}
                  size={22}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Verify OTP</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.instructionContainer}>
              <Text style={styles.instruction}>
                Please, enter the OTP. You have received via e-mail.
              </Text>
            </View>
            {/* OTP INPUT  FIELD */}
            <View style={{alignItems: 'center', padding: 20}}>
              <OtpInputs
                handleChange={code => getOtp(code)}
                numberOfInputs={4}
                style={{
                  flexDirection: 'row',
                  gap: 18,
                }}
                inputContainerStyles={{
                  backgroundColor: COLORS.primaryGreyRbg,
                  borderWidth: 1,
                  borderColor: COLORS.primaryDarkGrey,
                  width: 45,
                  alignItems: 'space-between',
                  borderRadius: 10,
                }}
                inputStyles={{
                  color: COLORS.primaryBrownRgb,
                }}
              />
            </View>
          </View>

          <View style={styles.otpbtn}>
            <RedButton
              handleClick={() => handleVerifyOTP()}
              name={'VERIFY OTP'}
            />
          </View>
          <View style={styles.Loginlink}>
            <TouchableOpacity onPress={() => ResendOtp()}>
              <Text style={styles.loginlinkText}>Resend OTP?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Otp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  HeaderSection: {
    paddingTop: 20,
  },
  backBtnContainer: {
    paddingTop: 10,
  },
  titleContainer: {
    paddingTop: 40,
  },
  title: {
    fontFamily: FONTFAMILY.Metropolis_bold,
    fontSize: FONTSIZE.Header_FONT_SIZE,
    color: COLORS.primaryBlack,
  },
  instructionContainer: {
    padding: 5,
  },
  instruction: {
    color: COLORS.primaryBlack,
  },
  formContainer: {
    flex: 1,
    marginTop: 80,
  },
  nameForm: {
    height: 50,
    margin: 12,
    backgroundColor: COLORS.Card_Background,
    padding: 10,
    borderRadius: 7,
    elevation: 4,
  },

  otp: {
    backgroundColor: COLORS.primaryred,
    color: COLORS.primarywhite,
    height: 44,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 20,
    marginTop: 50,
    marginLeft: 15,
    marginRight: 15,
  },
  Loginlink: {
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
