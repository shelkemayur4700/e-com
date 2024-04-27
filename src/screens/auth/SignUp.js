import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import {RedButton} from '../../components/RedButton';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';

const SignUp = ({navigation, route}) => {
  const handleLogin = () => {
    navigation.navigate('SignIn');
  };
  const handleSignUp = () => {
    console.log('SIGN UP');
  };
  return (
    <>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
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
              <Text style={styles.title}>Sign up</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <TextInput style={styles.nameForm} placeholder="Enter Name" />
            <TextInput style={styles.nameForm} placeholder="Enter Email" />
            <TextInput style={styles.nameForm} placeholder="Enter Password" />
          </View>
          <View style={styles.Loginlink}>
            <TouchableOpacity onPress={() => handleLogin()}>
              <Text style={styles.loginlinkText}>
                Already have an account ?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Signupbtn}>
            <RedButton handleClick={() => handleSignUp()} name={'SIGN UP'} />
          </View>
          <View style={styles.footer}>
            <View style={styles.SocialContainer}>
              <Text>Or sign up with social account</Text>
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

export default SignUp;

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
  signUp: {
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
  Signupbtn: {},
  SocialContainer: {
    flex: 1,
    bottom: 0,
    marginTop: 100,
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
});
