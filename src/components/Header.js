import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/theme';


const Header = ({currentScreenName}) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.header}>
        {/* ----------Back button  */}
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack('MainRoute', {
                screen: 'Home',
              });
            }}>
            <IoniconsIcons name="chevron-back" color={COLORS.primaryBlack} size={22} />
          </TouchableOpacity>
        </View>
        <Text style={styles.headingText}>
          {' '}
          {currentScreenName == 'Shop' ? 'Categories' : 'Short Dress'}
        </Text>
        {/* ------Share button  */}
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack('MainRoute', {
                screen: 'Home',
              });
            }}>
            <EntypoIcons name="share" color={COLORS.primaryBlack} size={22} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
    padding: 15,
    shadowColor: COLORS.primaryBlack,
  },
  headingText: {
    color: COLORS.primaryBlack,
    fontFamily: 'Metropolis-SemiBold',
    fontSize: 18,
  },
});
