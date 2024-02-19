import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {
  Bold_Font,
  Card_Background,
  Header_FONT_SIZE,
  primaryBlack,
  primarygrey,
  primaryred,
  primarywhite,
} from '../constant';

const SignUp = ({navigation}) => {
  return (
    <>
      <ScrollView style={{flex: 1}}>
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
                  color={primaryBlack}
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
            <TouchableOpacity>
              <Text style={styles.loginlinkText}>
                Already have an account ?
                {/* <AntDesignIcons
                  style={{marginLeft: 10}}
                  name="arrowright"
                  color={primaryred}
                /> */}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Signupbtn}>
            <TouchableOpacity>
              <Text style={styles.signUp}>SIGN UP</Text>
            </TouchableOpacity>
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
    fontFamily: Bold_Font,
    fontSize: Header_FONT_SIZE,
    color: primaryBlack,
  },
  formContainer: {
    flex: 1,
    marginTop: 80,
  },
  nameForm: {
    height: 50,
    margin: 12,
    backgroundColor: Card_Background,
    padding: 10,
    borderRadius: 7,
    elevation: 4,
  },
  Loginlink: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  loginlinkText: {
    color: primarygrey,
  },
  signUp: {
    backgroundColor: primaryred,
    color: primarywhite,
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
    backgroundColor: Card_Background,
    padding: 5,
    borderRadius: 10,
  },
});
