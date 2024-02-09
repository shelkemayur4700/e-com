import {
  Button,
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProducts} from '../../thunk/productThunk';
import {primaryBlack, primaryred, primarywhite} from '../../constant';
import Banner from './Components/Banner';
import ProductCard from './Components/ProductCard';
import {data} from '../../Assets/data';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const HomeScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.productStore.data);
  const tabBarHeight = useBottomTabBarHeight();
  console.log(products);

  const getproductslist = async () => {
    let result = await dispatch(getAllProducts());
    console.log('result', result);
  };

  // useEffect(() => {
  //   getproductslist();
  // }, []);
  return (
    <View>
      <StatusBar backgroundColor={primaryred} />
      <ScrollView>
        <View>
          <View style={{flex: 1}}>
            <Banner getproductslist={getproductslist} />
          </View>
          <View style={{flex: 1}}>
            {/* ------------Products container  */}
            <View style={styles.productContainer}>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>New</Text>
                <Text style={styles.text1}>View all</Text>
              </View>
              <View style={{flex: 1, gap: 20}}>
                {/* ----------------------  */}
                <FlatList
                  style={{flex: 1}}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={data}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.push('Detail');
                        }}>
                        <ProductCard
                          id={item.id}
                          title={item.title}
                          desc={item.desc}
                          Img_link={item.Img_link}
                          price={item.price}
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
                {/* -----------------------------------  */}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  productContainer: {
    // flex: 1,
  },
  headingContainer: {
    justifyContent: 'center',
  },
  heading: {
    color: primaryBlack,
    fontSize: 32,
    fontFamily: 'Metropolis-Bold',
    padding: 10,
  },
  text1: {
    fontFamily: 'Mertopolis-Medium',
    color: primaryBlack,
    fontSize: 11,
    position: 'absolute',
    right: 0,
    padding: 20,
  },
});
