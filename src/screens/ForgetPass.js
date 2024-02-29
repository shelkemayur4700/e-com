import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import {
  Bold_Font,
  Card_Background,
  Header_FONT_SIZE,
  primaryBlack,
  primaryred,
  primarywhite,
} from '../constant';

const ForgetPass = ({navigation}) => {
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
            <TextInput style={styles.nameForm} placeholder="Enter Email" />
          </View>

          <View style={styles.otpbtn}>
            <TouchableOpacity>
              <Text style={styles.otp}>SEND OTP</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.footer}>
            <View style={styles.sigupLink}>
              <TouchableOpacity>
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
          </View> */}
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
    fontFamily: Bold_Font,
    fontSize: Header_FONT_SIZE,
    color: primaryBlack,
  },
  instructionContainer: {
    padding: 5,
  },
  instruction: {
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

  otp: {
    backgroundColor: primaryred,
    color: primarywhite,
    height: 44,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 20,
    marginTop: 50,
    marginLeft: 15,
    marginRight: 15,
  },
});
