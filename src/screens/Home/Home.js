import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LoaderComp from '../../components/LoaderComp';
import {COLORS, FONTFAMILY, SPACING} from '../../theme/theme';
import {getAllProducts} from '../../thunk/product';
import Banner from './Components/Banner';
// const Card_Width = Dimensions.get('window').width * 0.45;

const HomeScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.productStore.data);
  const loading = useSelector(state => state.productStore.loading);
  const getproductslist = async () => {
    try {
      let result = await dispatch(getAllProducts()).unwrap();
      // console.log('result', result);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log('products', products);
  const SingleProduct = product => {
    navigation.push('Detail', {product});
  };

  useFocusEffect(
    useCallback(() => {
      getproductslist();
    }, []),
  );
  return (
    <View style={{flex: 1}}>
      {/* {loading && <LoaderComp />} */}
      <StatusBar backgroundColor={COLORS.primaryred} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {/* --------------------------Banner------------------------ */}
        <Banner />
        {/* --------------------------X----------------------- */}
        <View style={{flex: 1}}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>New launched</Text>
            <Text style={styles.text1}>View all</Text>
          </View>
          <View style={{flex: 1, gap: 20}}>
            <FlatList
              style={{flex: 1}}
              horizontal
              contentContainerStyle={{gap: 8}}
              showsHorizontalScrollIndicator={false}
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
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Sale</Text>
            <Text style={styles.text1}>View all</Text>
          </View>
        </View>
        {/* --------------------------ALL PRODUCTS----------------------- */}
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

export default HomeScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    // flex: 1,
  },
  Products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 10,
    justifyContent: 'space-between',
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
