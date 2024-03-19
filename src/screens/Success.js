import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import bag from '../Assets/Images/bags.png';
import {RedButton} from '../components/RedButton';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
const Success = ({navigation, route}) => {
  const handleContinueShopping = () => {
    navigation.navigate('HomePage', {
      screen: 'Home',
    });
  };
  return (
    <View style={styles.MainContainer}>
      <View style={styles.Container}>
        <Image style={styles.bagImage} source={bag}></Image>
        <Text style={styles.SucessText}>Success!</Text>
        <Text style={styles.SubSuccessText}>
          Your order will be delivered soon.
        </Text>
        <Text style={styles.SubSuccessText}>
          Thank you for choosing our app!
        </Text>
      </View>
      <View>
        <RedButton
          name="CONTINUE SHOPPING"
          handleClick={handleContinueShopping}
        />
      </View>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bagImage: {},
  SucessText: {
    fontSize: FONTSIZE.Header_FONT_SIZE,
    color: COLORS.primaryBlack,
    fontFamily: FONTFAMILY.Metropolis_bold,
    marginVertical: SPACING.space_10,
  },
  SubSuccessText: {
    color: COLORS.primaryBlack,
    fontFamily: FONTFAMILY.Mertopolis_medium,
    fontSize: FONTSIZE.size_14,
  },
});
