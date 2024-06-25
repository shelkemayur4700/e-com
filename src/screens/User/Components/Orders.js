import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import LoaderComp from '../../../components/LoaderComp';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../../theme/theme';
import {getUserOrders} from '../../../thunk/order';

const Orders = ({navigation}) => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  //METHOD TO GET ALL ORDERS OF USER
  const getOrdersOfUser = async () => {
    try {
      let userDetails = await AsyncStorage.getItem('LogInUser');
      let userData = JSON.parse(userDetails);
      console.log('user id is ', userData?._id);
      setLoading(true);
      const res = await dispatch(getUserOrders({id: userData?._id})).unwrap();
      if (res) {
        setOrders(res?.orders);
        setLoading(false);
      }
      console.log('All orders od user', res);
    } catch (error) {
      console.log('Error from get all order API', error);
    }
  };

  useEffect(() => {
    getOrdersOfUser();
  }, []);
  return (
    <View style={styles.mainContainer}>
      {loading && <LoaderComp />}
      <ScrollView style={{padding: 10}} showsVerticalScrollIndicator={false}>
        {/* -----------------CARD------------ */}
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={{gap: 8}}
          showsHorizontalScrollIndicator={false}
          data={orders}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View style={styles.cardContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 5,
                }}>
                <Text
                  style={{
                    color: COLORS.primaryBlack,
                    fontFamily: FONTFAMILY.Metropolis_bold,
                    fontSize: 16,
                  }}>
                  Order No:{' '}
                  {item?.orderNo ? item?.orderNo?.split('-')[0] : 'NA'}
                </Text>
                <Text
                  style={{
                    color: COLORS.primaryBlack,
                    fontSize: 16,
                  }}>
                  {item?.createdAt ? item?.createdAt?.split('T')[0] : 'NA'}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  padding: 5,
                }}>
                <Text
                  style={{
                    color: COLORS.primaryBlack,
                    fontSize: 16,
                  }}>
                  Tracking number: {item?.orderNo}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  flexDirection: 'row',
                  padding: 5,
                }}>
                <Text
                  style={{
                    color: COLORS.primaryBlack,
                    fontSize: 16,
                  }}>
                  Quantity:{item?.products?.length}
                </Text>
                <Text
                  style={{
                    color: COLORS.primaryBlack,
                    fontSize: 16,
                  }}>
                  Total Amount : ₹{item?.paymentDetails?.total}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  padding: 5,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('Myorders', {OrderId: item?._id})
                  }>
                  <Text
                    style={{
                      // backgroundColor: 'red',
                      borderColor: COLORS.primaryBlack,
                      borderWidth: 1,
                      borderRadius: 22,
                      color: COLORS.primaryBlack,
                      paddingVertical: 8,
                      paddingHorizontal: 14,
                    }}>
                    Details
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    color: 'green',
                    fontSize: 16,
                  }}>
                  {item?.orderStatus ? item?.orderStatus : 'NOTUPDATED'}
                </Text>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  Search: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 12,
  },
  Heading: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  HeadingText: {
    color: COLORS.primaryBlack,
    fontSize: FONTSIZE.size_30,
    fontWeight: '600',
    paddingLeft: 10,
    paddingTop: 20,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 5,
    padding: 10,
  },
  filter: {
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: COLORS.primaryBlack,
    borderRadius: 20,
  },
  filterName: {
    color: COLORS.primarywhite,
    fontSize: 16,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: COLORS.Card_Background,
    borderRadius: 10,
    padding: 12,
  },
  ImageContainer: {},
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  TextData: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomRightRadius: 10,
  },
  ContainerONE: {
    width: '70%',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  Cardbrand: {
    color: COLORS.primaryBlack,
    fontSize: 20,
    fontWeight: '500',
  },
  CardCategory: {
    color: COLORS.primaryBlack,
    fontSize: 15,
    fontWeight: '400',
  },
  ContainerTWO: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  price: {
    color: COLORS.primaryBlack,
    fontSize: 18,
    fontWeight: '400',
  },
});
