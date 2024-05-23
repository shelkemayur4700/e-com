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
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import LoaderComp from '../../components/LoaderComp';
import {RedButton} from '../../components/RedButton';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import {NewpassApi} from '../../thunk/auth';

const NewPass = ({navigation, route}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);
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
      setLoading(true);
      let res = await dispatch(NewpassApi(payload)).unwrap();
      console.log('Reset password  response ..', res);
      if (res) {
        setLoading(false);
        // TO SHOW TOAST ON SAME SCREEN
        setTimeout(() => {
          toast.show(res?.message, {type: 'success'});
        }, 2000);
        getToken();
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
      toast.show(
        error?.response?.data?.message || 'unable to reser password  ',
        {
          type: 'danger',
        },
      );
    }
  };
  const getdata = (value, key) => {
    setPassData({...passData, [key]: value});
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
            <Text style={styles.lable}> New password *</Text>
            <TextInput
              style={styles.nameForm}
              placeholder="Enter new password"
              onChangeText={text => getdata(text, 'Cpassword')}
            />
            <Text style={styles.lable}>Confirm password *</Text>
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
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: COLORS.Card_Background,
    padding: 10,
    borderRadius: 7,
    elevation: 4,
  },
  lable: {
    marginLeft: 18,
    marginBottom: 2,
    marginTop: 5,
    color: COLORS?.primaryBlack,
    paddingBottom: 2,
  },
  instruction: {
    color: COLORS?.primaryBlack,
  },
});
