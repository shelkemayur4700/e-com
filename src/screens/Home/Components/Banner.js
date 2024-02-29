import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {primaryred, primarywhite} from '../../../constant';
// const Width = Dimensions.get('window').width;

const Banner = ({navigation}) => {
  return (
    <View style={styles.bannerContainer}>
      <ImageBackground
        style={styles.banner}
        source={require('../../../Assets/Images/ProductsBanner.png')}>
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerText}>Fashion </Text>
          <Text style={styles.bannerText}>Sale </Text>
          <TouchableOpacity style={styles.checkButtonParent}>
            <Text style={styles.checkButton}>Check</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  banner: {
    height: 536,
    // width: Width,
    width: '100%',
    // width: 376,
  },
  bannerText: {
    fontFamily: 'Metropolis-Bold',
    fontSize: 48,
    color: primarywhite,
    marginLeft: 10,
  },

  bannerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },

  bannerTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },

  productContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  checkButton: {
    backgroundColor: primaryred,
    color: primarywhite,
    height: 36,
    width: 150,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 20,
    left: 10,
  },
});
