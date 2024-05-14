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
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {RedButton} from '../../components/RedButton';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import {NewpassApi} from '../../thunk/auth';

const NewPass = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [iserror, setIserror] = useState(false);
  const [passData, setPassData] = useState({
    Cpassword: '',
    Npassword: '',
  });
  console.log('new pass', passData.Cpassword, passData.Npassword);
  // ----------RETRIVING TOKEN ----------
  const getToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    console.log(storedToken);
  };
  const userId = useSelector(state => state?.auth?.userId);
  console.log('xyz', userId);

  // -------------RESET PASS METHOD --------
  const HandleResetPass = async () => {
    try {
      // passValidate();
      if (passData?.Cpassword !== passData?.Npassword) {
        console.log('enter correct password');
        return;
      }
      let password = passData?.Npassword;
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
      console.log('passwordRegex.test(password)', passwordRegex.test(password));
      if (!passwordRegex.test(password)) {
        console.log(
          'Password must be 8 digits and contain one one special char and one alphabet',
        );
        return;
      }
      // ------------
      let User = await AsyncStorage.getItem('User');
      let token = await AsyncStorage.getItem('token');
      console.log('user', User, 'token', token);
      const payload = {
        Password: password,
        User: User ? User : userId,
        token: token,
      };
      console.log('payload', payload);
      let res = await dispatch(NewpassApi(payload)).unwrap();
      console.log('Reset password  response ..', res);
      if (res) {
        console.log('done....');
        getToken();
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getdata = (value, key) => {
    setPassData({...passData, [key]: value});
  };

  return (
    <>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.HeaderSection}>
            <View style={styles.backBtnContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack('Otp');
                }}>
                <IoniconsIcons
                  name="chevron-back"
                  color={COLORS.primaryBlack}
                  size={22}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Enter new password</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.instructionContainer}>
              <Text style={styles.instruction}>
                Please, enter new password.
              </Text>
            </View>
            <TextInput
              style={styles.nameForm}
              placeholder="Enter new password"
              onChangeText={text => getdata(text, 'Cpassword')}
            />
            <TextInput
              style={styles.nameForm}
              placeholder="Confirm Password"
              onChangeText={text => getdata(text, 'Npassword')}
            />
          </View>
          <View style={styles.Signinbtn}>
            <RedButton
              handleClick={() => HandleResetPass()}
              name={'RESET PASSWORD'}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default NewPass;

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
    margin: 12,
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
});
