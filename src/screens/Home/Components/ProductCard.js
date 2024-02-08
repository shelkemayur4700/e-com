import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {
  primaryBlack,
  primarySilver,
  primarygrey,
  primaryred,
} from '../../../constant';
const Card_Width = Dimensions.get('window').width * 0.42;
const ProductCard = () => {
  return (
    <View style={styles.productCard}>
      <Image
        style={styles.cardImg}
        source={require('../../../Assets/Images/ProdImg.png')}
      />
      <View style={styles.starsContainer}>
        <AntDesignIcons
          name="star"
          color={primarySilver}
          size={18}
          style={styles.stars}
        />
        <AntDesignIcons
          name="star"
          color={primarySilver}
          size={18}
          style={styles.stars}
        />
        <AntDesignIcons
          name="star"
          color={primarySilver}
          size={18}
          style={styles.stars}
        />
        <AntDesignIcons
          name="star"
          color={primarySilver}
          size={18}
          style={styles.stars}
        />
        <AntDesignIcons
          name="star"
          color={primarySilver}
          size={18}
          style={styles.stars}
        />
      </View>
      <Text style={styles.brand}>Tommy Hilfighter</Text>
      <Text style={styles.prod_Desc}>Evening Dress</Text>
      <Text style={styles.Price}>12$</Text>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCard: {
    // flex: 1,
    flexDirection: 'column',
    // borderColor: 'black',
    borderWidth: 1,
    width: Card_Width,
    borderRadius: 10,
  },
  cardImg: {
    borderRadius: 15,
    width: Card_Width,
    objectFit: 'contain',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  stars: {},
  brand: {
    color: primarygrey,
    fontSize: 14,
    fontFamily: 'Metropolis',
  },
  prod_Desc: {
    color: primaryBlack,
    marginRight: 5,
    fontSize: 18,
    fontFamily: 'Metropolis',
  },
  Price: {
    color: primaryred,
    fontSize: 16,
    fontFamily: 'Metropolis',
  },
});
