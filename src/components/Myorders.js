import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {COLORS, FONTFAMILY} from '../theme/theme';
import {getOrderDetails} from '../thunk/order';
import LoaderComp from './LoaderComp';
const Myorders = ({route}) => {
  const {OrderId} = route.params;
  console.log('orderid', OrderId);

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState();
  const dispatch = useDispatch();

  //METHOD TO GET ORDER DATA
  const getOrderData = async () => {
    try {
      setLoading(true);
      const res = await dispatch(getOrderDetails({id: OrderId})).unwrap();
      if (res) {
        console.log('response of specific order', res);
        setOrder(res?.order);
        setLoading(false);
      }
      console.log('All orders od user', res);
    } catch (error) {
      console.log('Error from get all order API', error);
    }
  };
  console.log('order', order);
  useEffect(() => {
    getOrderData();
  }, []);
  return (
    <>
      <View style={styles.MainContainer}>
        {loading && <LoaderComp />}
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          {/* --------------header---------------- */}
          <View style={styles.headerContainer}>
            <View
              style={{
                // flex: 1,
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
                Order No:
                {order?.orderNo ? order?.orderNo?.split('-')[0] : 'NA'}
              </Text>
              <Text
                style={{
                  // color: primaryBlack,
                  fontSize: 16,
                }}>
                {order?.createdAt ? order?.createdAt?.split('T')[0] : 'NA'}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 5,
              }}>
              {/* <Text
                style={{
                  color: COLORS.primaryBlack,
                  fontSize: 16,
                }}>
                Tracking number:{order?.orderNo}
              </Text> */}
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
                  fontSize: 16,
                  color: COLORS?.primaryBlack,
                }}>
                {order?.products?.length} items
              </Text>
              <Text
                style={{
                  color: 'green',
                  fontSize: 16,
                }}>
                {order?.orderStatus}
              </Text>
            </View>
          </View>
          {/* ------CARDS------- */}
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{gap: 8}}
            showsHorizontalScrollIndicator={false}
            data={order?.products}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <View style={styles.cardContainer}>
                {/* ---------IMAGE------------ */}
                <View style={styles.ImageContainer}>
                  <Image style={styles.image} source={{uri: item?.img}} />
                </View>
                {/* -----------TEXT-DATA--------------- */}
                <View style={styles.TextData}>
                  <View style={styles.ContainerONE}>
                    <Text style={styles.Cardbrand}>{item?.title}</Text>
                    <Text style={styles.subcategory}>{item?.category}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.CardCategory}>
                        Color:{item?.color[0]}
                      </Text>
                      <Text style={styles.Size}>Size:{item?.size[0]}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginRight: 20,
                      }}>
                      <Text style={styles.units}>Units:{item?.quantity}</Text>
                      <Text style={styles.units}>₹{item?.price}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />

          {/* ----ORDER INFO------- */}
          <View style={styles.OrderinfoContainer}>
            <Text style={{fontSize: 20, color: COLORS.primaryBlack}}>
              Order information
            </Text>
            <View style={{flexDirection: 'row', gap: 10, padding: 5}}>
              <Text style={styles.OrderInfoKey}>Shipping Address:</Text>
              <Text style={styles.orderInfoValue}>
                {order?.address?.address}, {''}
                {order?.address?.city},{''}
                {order?.address?.state},{' - '}
                {order?.address?.postalCode}
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10, padding: 5}}>
              <Text style={styles.OrderInfoKey}>Payment method:</Text>
              <Text style={styles.orderInfoValue}>
                {order?.paymentDetails?.modeOfPayment}
              </Text>
            </View>

            <View style={{flexDirection: 'row', gap: 10, padding: 5}}>
              <Text style={styles.OrderInfoKey}>Delivery method:</Text>
              <Text style={styles.orderInfoValue}>
                FedEx, 3 days, {order?.paymentDetails?.deliveryCharges}
              </Text>
            </View>

            <View style={{flexDirection: 'row', gap: 10, padding: 5}}>
              <Text style={styles.OrderInfoKey}>Discount:</Text>
              <Text style={styles.orderInfoValue}>
                10%, Personal promo code
              </Text>
            </View>

            <View style={{flexDirection: 'row', gap: 10, padding: 5}}>
              <Text style={styles.OrderInfoKey}>Total Amount:</Text>
              <Text style={styles.orderInfoValue}>
                ₹ {order?.paymentDetails?.total}
              </Text>
            </View>
            {/* --------BTNS----------- */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                // padding: 5,
                paddingVertical: 10,
              }}>
              <TouchableOpacity>
                <Text style={styles.orderReorder}>Reorder</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.orderFeedBack}>Leave feedback</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Myorders;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // backgroundColor: 'yellow',
    padding: 10,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.Card_Background,
    borderRadius: 10,
    marginVertical: 10,
    // backgroundColor: 'red',
  },
  ImageContainer: {},
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  TextData: {
    flex: 1,
    // justifyContent: 'space-between',
    padding: 5,
    borderBottomRightRadius: 10,
  },
  ContainerONE: {
    width: '100%',
    paddingHorizontal: 10,
  },
  Cardbrand: {
    color: COLORS.primaryBlack,
    fontSize: 22,
    fontWeight: '500',
  },
  CardCategory: {
    fontSize: 15,
    fontWeight: '400',
  },
  ContainerTWO: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  price: {
    color: COLORS.primaryBlack,
    fontSize: 18,
    fontWeight: '400',
  },
  subcategory: {
    fontSize: 15,
    padding: 2,
  },
  units: {
    fontSize: 15,
    padding: 2,
  },
  Size: {
    marginRight: 20,
  },
  OrderinfoContainer: {
    padding: 5,
  },
  OrderInfoKey: {
    fontSize: 17,
    color: COLORS.primaryBlack,
  },
  orderInfoValue: {
    color: COLORS.primaryBlack,
    fontSize: 17,
  },
  orderReorder: {
    padding: 8,
    paddingHorizontal: 40,
    color: COLORS.primaryBlack,
    borderRadius: 20,
    borderColor: COLORS.primaryBlack,
    borderWidth: 1,
    fontWeight: '500',
  },
  orderFeedBack: {
    color: COLORS.primarywhite,
    backgroundColor: COLORS.primaryred,
    padding: 8,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
});
