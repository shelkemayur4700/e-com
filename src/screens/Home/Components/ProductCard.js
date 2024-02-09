import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {
  primaryBlack,
  primarySilver,
  primarygrey,
  primaryred,
} from '../../../constant';
const Card_Width = Dimensions.get('window').width * 0.5;
import EvilIconsIcons from 'react-native-vector-icons/AntDesign';

const ProductCard = ({id, title, desc, price, Img_link}) => {
  return (
    <View style={styles.productCard}>
      <Image style={styles.cardImg} source={Img_link} />
      <View style={styles.likebtnBackground}>
        <View style={styles.likeBtn}>
          <EvilIconsIcons
            name={'heart'}
            color={primaryred}
            styles={styles.likeIcon}
            size={22}
          />
        </View>
      </View>

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
        <Text style={styles.starDigit}>(10)</Text>
      </View>
      <Text style={styles.brand}>{title}</Text>
      <Text style={styles.prod_Desc}>{desc}</Text>
      <Text style={styles.Price}>{price}</Text>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCard: {
    marginRight: 5,
    marginLeft: 5,
    flexDirection: 'column',
    width: Card_Width,
    borderRadius: 20,
    overflow: 'hidden',
    // backgroundColor: '#F2ECE9',
    padding: 3,
  },
  cardImg: {
    borderRadius: 20,
    width: Card_Width,
    objectFit: 'contain',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  stars: {
    paddingLeft: 5,
  },
  brand: {
    color: primarygrey,
    paddingLeft: 5,
    fontSize: 18,
    fontFamily: 'Metropolis',
  },
  prod_Desc: {
    color: primaryBlack,
    paddingLeft: 5,
    fontSize: 14,
    fontFamily: 'Metropolis',
  },
  Price: {
    color: primaryred,
    paddingLeft: 5,
    fontSize: 16,
    fontFamily: 'Metropolis',
  },
  starDigit: {
    color: primaryBlack,
    marginLeft: 2,
  },
  likebtnBackground: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // backgroundColor: 'yellow',
  },
  likeBtn: {
    paddingRight: 15,
    marginTop: -25,
  },
});
