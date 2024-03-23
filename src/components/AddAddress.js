import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../theme/theme';
import {RedButton} from './RedButton';

const AddAddress = () => {
  const HandleSaveAddress = () => {};
  return (
    <View style={styles.MainContainer}>
      <ScrollView>
        <TouchableOpacity style={styles.UseMyLocationBtnContainer}>
          <MaterialCommunityIcons
            name="crosshairs-gps"
            size={16}
            color={COLORS.primarywhite}
          />
          <Text style={styles.UseLOcationText}>Use my current location </Text>
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <TextInput style={styles.nameForm} placeholder="Enter Name" />
          <TextInput style={styles.nameForm} placeholder="Enter Phone Number" />
          <TextInput style={styles.nameForm} placeholder="Enter Address" />
          <TextInput style={styles.nameForm} placeholder="Enter City" />
          <TextInput style={styles.nameForm} placeholder="Enter State" />
          <TextInput style={styles.nameForm} placeholder="Enter ZipCode" />
          <View style={styles.TypeAddContainer}>
            <Text> Type of Address</Text>
            <View style={styles.AddTypeBtnContainer}>
              <TouchableOpacity style={styles.HomeBtn}>
                <EntypoIcon name="home" size={16} color={COLORS.primarywhite} />
                <Text style={styles.BtnText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.HomeBtn}>
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
    flex: 1,
    marginTop: 20,
  },
  nameForm: {
    height: 50,
    margin: 12,
    backgroundColor: COLORS.Card_Background,
    padding: 10,
    borderRadius: 7,
    elevation: 4,
  },
  TypeAddContainer: {
    marginVertical: 10,
    padding: 10,
  },
  AddTypeBtnContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 20,
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
});
