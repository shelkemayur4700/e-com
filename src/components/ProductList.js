import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTFAMILY, SPACING} from '../theme/theme';
import {getAllProducts} from '../thunk/product';
const ProductList = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {type, seletedCategory} = route?.params;
  const product = useSelector(state => state.productStore.data);

  //FILTERING PRODUCTS ON THE BASIS OF THEIR CATEGORY AND TYPE
  const products = product.filter(
    d => d?.type === type && d?.category === seletedCategory,
  );

  //METHOD TO GET ALL PRODUCTS
  const getproductslist = async () => {
    try {
      let result = await dispatch(getAllProducts()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  //METHOD TO SHOW SINGLE PRODUCT
  const SingleProduct = product => {
    navigation.push('Detail', {product});
  };

  useFocusEffect(
    useCallback(() => {
      getproductslist();
    }, []),
  );
  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <FlatList
            contentContainerStyle={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: SPACING.space_8,
              justifyContent: 'center',
            }}
            showsVerticalScrollIndicator={false}
            // numColumns={50}
            data={products}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  SingleProduct(item);
                }}>
                <View key={item._id} style={styles.Card}>
                  <Image
                    source={{uri: item?.img}}
                    alt={'Product'}
                    style={styles.cardImage}
                  />
                  <Text style={styles.brand} numberOfLines={1}>
                    {item?.title}
                  </Text>
                  <Text style={styles.prod_Desc} numberOfLines={2}>
                    {item?.category}
                  </Text>
                  <Text style={styles.Price}>₹{item?.price}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
  },
  Card: {
    backgroundColor: COLORS.Card_Background,
    width: 165,
    borderRadius: 10,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 130,
    height: 140,
    objectFit: 'fill',
    borderRadius: 10,
  },
  brand: {
    color: COLORS.primaryBlack,
    fontFamily: FONTFAMILY.Metropolis_bold,
    fontSize: 15,
    padding: 4,
  },
  prod_Desc: {
    color: COLORS.primaryBlack,
  },
  Price: {
    color: COLORS.primaryBlack,
    fontSize: 12,
    fontFamily: FONTFAMILY.Metropolis_bold,
  },
  // --------------
  headingContainer: {
    justifyContent: 'center',
  },
  heading: {
    color: COLORS.primaryBlack,
    fontSize: 32,
    fontFamily: FONTFAMILY.Metropolis_bold,
    padding: 10,
  },
  text1: {
    fontFamily: FONTFAMILY.Mertopolis_medium,
    color: COLORS.primaryBlack,
    fontSize: 11,
    position: 'absolute',
    right: 0,
    padding: 20,
  },
});
