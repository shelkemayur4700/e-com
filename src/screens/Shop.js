import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTSIZE} from '../theme/theme';
import {getAllProducts} from '../thunk/product';

const Shop = ({navigation}) => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.productStore.data);
  const [prodType, setProdType] = useState([]);
  const [seletedCategory, setSelectedCategory] = useState(null);

  //METHOD TO GET TYPE ON BASIS OF CATEGORY
  const handleChangeCategory = category => {
    let type = product?.filter(prod => prod?.category === category);
    // TO GET UNIQUE TYPES
    let uniqueCategories = [...new Set(type.map(prod => prod?.type))];
    setProdType(uniqueCategories);
    setSelectedCategory(category);
  };

  //METHOD OF ONCLICK ON CATEGORY
  const handleClick = type => {
    console.log('type', type);
    navigation.push('Root', {
      screen: 'ProductList',
      params: {type, seletedCategory},
    });
  };

  //METHOD TO GET ALL TYPES OF PRODUCTS
  const getproductslist = async () => {
    try {
      let result = await dispatch(getAllProducts()).unwrap();
      // console.log('result', result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getproductslist();
  }, []);
  // TO SET DEFAULT DATA
  useEffect(() => {
    const defaultCategory = 'Men';
    let type = product?.filter(prod => prod?.category === defaultCategory);
    let uniqueCategories = [...new Set(type.map(prod => prod?.type))];
    setProdType(uniqueCategories);
    setSelectedCategory('Men');
  }, [product]);
  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ----------------Header---------------- */}
        <View style={styles.header}>
          <View style={styles.Search}>
            <TouchableOpacity>
              <FeatherIcons
                name="search"
                size={25}
                color={COLORS.primaryBlack}
              />
            </TouchableOpacity>
          </View>
          {/* ------------------Categories------------------ */}
          <View style={styles.categories}>
            {/* MENS */}
            <TouchableOpacity
              style={[
                {padding: 10},
                seletedCategory === 'Men' && styles.Category,
              ]}
              onPress={() => handleChangeCategory('Men')}>
              <Text style={styles.categoryTitle}>Men</Text>
            </TouchableOpacity>
            {/* WOMEN  */}
            <TouchableOpacity
              style={[
                {padding: 10},
                seletedCategory === 'Women' && styles.Category,
              ]}
              onPress={() => handleChangeCategory('Women')}>
              <Text style={styles.categoryTitle}>Women</Text>
            </TouchableOpacity>
            {/* KIDS  */}
            <TouchableOpacity
              style={[
                {padding: 10},
                seletedCategory === 'Kids' && styles.Category,
              ]}
              onPress={() => handleChangeCategory('Kids')}>
              <Text style={styles.categoryTitle}>Kids</Text>
            </TouchableOpacity>
          </View>
          {/* ---------------------Offer card------------------ */}
          <View style={styles.cards}>
            <TouchableOpacity style={styles.OfferCard}>
              <Text style={styles.offerTitle}>SUMMER SALES</Text>
              <Text style={styles.offerInfo}>Up to 50% off</Text>
            </TouchableOpacity>
            {prodType &&
              prodType?.map(
                prod =>
                  prod && (
                    <TouchableOpacity
                      style={styles.categoryCard}
                      onPress={() => handleClick(prod)}>
                      <Text style={styles.catrgorytitle}>{prod}</Text>
                      {prod == 'Topwear' && (
                        <Image
                          source={require('../Assets/Images/New.png')}></Image>
                      )}
                      {prod == 'Bottomwear' && (
                        <Image
                          source={require('../Assets/Images/Clothes.png')}></Image>
                      )}
                      {prod == 'Footwear' && (
                        <Image
                          source={require('../Assets/Images/Shoes.png')}></Image>
                      )}
                      {prod == 'Accessories' && (
                        <Image
                          source={require('../Assets/Images/Accesories.png')}></Image>
                      )}
                    </TouchableOpacity>
                  ),
              )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Shop;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  Search: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 20,
    paddingRight: 12,
  },
  Heading: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  HeadingText: {
    color: COLORS.primaryBlack,
    fontSize: FONTSIZE.Header_FONT_SIZE,
    paddingLeft: 10,
    paddingTop: 20,
  },
  categories: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.Card_Background,
    borderRadius: 10,
  },
  Category: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS?.primaryred,
  },
  // womenCategory: {
  //   padding: 10,
  //   borderBottomWidth: 2,
  //   borderBottomColor: COLORS?.primaryred,
  // },
  // kidsCategory: {
  //   padding: 10,
  //   borderBottomWidth: 2,
  //   borderBottomColor: COLORS?.primaryred,
  // },
  categoryTitle: {
    color: COLORS.primaryBlack,
    fontSize: 18,
  },
  cards: {margin: 10, gap: 10},
  OfferCard: {
    backgroundColor: COLORS.primaryred,
    alignItems: 'center',
    padding: 30,
    borderRadius: 10,
  },
  offerTitle: {
    color: COLORS.primarywhite,
    fontSize: 22,
  },
  offerInfo: {
    color: COLORS.primarywhite,
    fontSize: 18,
  },
  categoryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.Card_Background,
    borderRadius: 10,
  },
  catrgorytitle: {
    fontSize: 20,
    paddingLeft: 20,
    color: COLORS.primaryBlack,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
