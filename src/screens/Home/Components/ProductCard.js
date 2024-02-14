import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {
  primaryBlack,
  primarySilver,
  primarygrey,
  primaryred,
} from '../../../constant';
const Card_Width = Dimensions.get('window').width * 0.35;
import EvilIconsIcons from 'react-native-vector-icons/AntDesign';

const ProductCard = ({products}) => {
  return (
    <>
      {products.map(item => (
        <View style={styles.productCard} key={item?.id}>
          <Image
            style={styles.cardImg}
            source={{uri: item?.image}}
            alt={'Product'}
          />

          <Text style={styles.brand} numberOfLines={2}>
            {item?.title}
          </Text>
          <Text style={styles.prod_Desc} numberOfLines={3}>
            {item?.description}
          </Text>
          <Text style={styles.Price}>{item?.price}</Text>
        </View>
      ))}
    </>
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
    height: 200,
    width: 100,
    // width: Card_Width,
    objectFit: 'contain',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  stars: {
    paddingLeft: 5,
  },
  brand: {
    flex: 1,
    color: primarygrey,
    paddingLeft: 5,
    fontSize: 16,
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
