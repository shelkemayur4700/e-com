import AsyncStorage from '@react-native-async-storage/async-storage';
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
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import LoaderComp from '../../components/LoaderComp';
import {RedButton} from '../../components/RedButton';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import {SignInApi} from '../../thunk/auth';
const Login = ({navigation, route}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    Email: 'Shelkegroups00@gmail.com',
    Password: 'Test@0000',
  });
  console.log('logindata', loginData);
  // ----------RETRIVING TOKEN ----------
  const getToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    console.log(storedToken);
  };
  // -------------LOGIN FUNCTION --------
  const HandleLogin = async () => {
    try {
      const payload = {
        Email: loginData?.Email,
        Password: loginData?.Password,
      };
      setLoading(true);
      let res = await dispatch(SignInApi(payload)).unwrap();
      console.log('res...login..', res);
      setLoading(false);
      if (res.status == 'Success') {
        // toast.show(res?.message, {type: 'success'});
        await AsyncStorage.setItem('UserEmail', res?.user?.Email);
        await AsyncStorage.setItem('LogInUser', JSON.stringify(res?.user));
        getToken();
        navigation.pop();
      }
    } catch (error) {
      setLoading(false);
      console.log('error from function', error.response.data);
      toast.show(error?.response?.data?.message || 'error to sign in  ', {
        type: 'danger',
      });
    }
  };
  const getdata = (value, key) => {
    setLoginData({...loginData, [key]: value});
  };
  const handleSignup = () => {
    navigation.navigate('SignUp');
  };
  const Forgetpass = () => {
    navigation.navigate('ForgetPass');
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
              <Text style={styles.title}>Sign in</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.lable}>Email *</Text>
            <TextInput
              style={styles.nameForm}
              placeholder="Enter Email"
              onChangeText={text => getdata(text, 'Email')}
            />
            <Text style={styles.lable}>Password *</Text>
            <TextInput
              style={styles.nameForm}
              placeholder="Enter Password"
              onChangeText={text => getdata(text, 'Password')}
            />
          </View>
          <View style={styles.Loginlink}>
            <TouchableOpacity onPress={() => Forgetpass()}>
              <Text style={styles.loginlinkText}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Signinbtn}>
            <RedButton handleClick={() => HandleLogin()} name={'SIGN IN'} />
          </View>
          <View style={styles.footer}>
            <View style={styles.sigupLink}>
              <TouchableOpacity onPress={() => handleSignup()}>
                <Text style={{fontSize: 15}}>Sign up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.SocialContainer}>
              <Text>Or sign in with social account</Text>
            </View>
            <View style={styles.mediaLogo}>
              <View style={styles.facebook}>
                <TouchableOpacity>
                  <AntDesignIcons
                    name="facebook-square"
                    color={'#3B5998'}
                    size={35}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.google, styles.facebook]}>
                <TouchableOpacity>
                  <AntDesignIcons name="google" color={'#488BF4'} size={35} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Login;

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
  Loginlink: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  loginlinkText: {
    color: COLORS.primarygrey,
  },
  SignIn: {
    backgroundColor: COLORS.primaryred,
    color: COLORS.primarywhite,
    height: 44,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  sigupLink: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  SocialContainer: {
    flex: 1,
    bottom: 0,
    // marginTop: 100,
    alignItems: 'center',
  },
  mediaLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingTop: 10,
  },
  facebook: {
    backgroundColor: COLORS.Card_Background,
    padding: 5,
    borderRadius: 10,
  },
  footer: {
    marginTop: 100,
  },
  lable: {
    marginLeft: 18,
    color: COLORS?.primaryBlack,
    paddingBottom: 2,
    marginBottom: 2,
  },
});
