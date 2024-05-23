import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import LoaderComp from '../../components/LoaderComp';
import {RedButton} from '../../components/RedButton';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import {ForgetPassApi} from '../../thunk/auth';

const ForgetPass = ({navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState({
    Email: '',
  });

  const getdata = e => {
    setEmail({Email: e});
  };
  console.log('mail', email);
  // METHOD TO SEND OTP IN API
  const handleOTP = async () => {
    try {
      setLoading(true);
      let res = await dispatch(ForgetPassApi(email)).unwrap();
      console.log('res...forget..', res);
      if (res) {
        setLoading(false);
        toast.show(res?.message, {type: 'success'});
        // TO SHOW TOAST ON SAME SCREEN
        setTimeout(() => {
          navigation.push('Otp');
        }, 2000);
      }
    } catch (error) {
      console.log('error from forget pass', error);
      toast.show(error?.response?.data?.message || 'unable to send OPT  ', {
        type: 'danger',
      });
    }
  };
  return (
    <>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          {loading && <LoaderComp />}
          <View style={styles.HeaderSection}>
            <View style={styles.backBtnContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack('MainRoute', {
                    screen: 'Home',
                  });
                }}>
                <IoniconsIcons
                  name="chevron-back"
                  color={COLORS.primaryBlack}
                  size={22}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Forgot password</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.instructionContainer}>
              <Text style={styles.instruction}>
                Please, enter your email address. You will receive a link to
                create a new password via email.
              </Text>
            </View>
            <Text style={styles.lable}>Email *</Text>
            <TextInput
              style={styles.nameForm}
              placeholder="Enter Email"
              onChangeText={text => getdata(text)}
            />
          </View>

          <View style={styles.otpbtn}>
            <RedButton handleClick={() => handleOTP()} name={'SEND OTP'} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ForgetPass;

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
    marginHorizontal: 12,
    marginBottom: 12,
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
  lable: {
    marginTop: 10,
    marginLeft: 18,
    color: COLORS?.primaryBlack,
    paddingBottom: 2,
  },
});
