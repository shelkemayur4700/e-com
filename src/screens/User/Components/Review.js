import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckIcons from 'react-native-vector-icons/AntDesign';
import PencilIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import LoaderComp from '../../../components/LoaderComp';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../../theme/theme';
import {getUserOrders} from '../../../thunk/order';
import {GetAllUserReview} from '../../../thunk/review';
const Review = ({navigation, route}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const review = useSelector(state => state.review.reviewData);
  console.log('Revew', review);
  const reviewProductIds = review?.reviews?.map(
    reviewItem => reviewItem?.productId,
  );
  //METHOD TO HANDLE ADD REVIEW
  const handleAddReview = id => {
    console.log('handleAddReview', id);
    navigation.push('MainApp', {
      screen: 'AddReview',
      params: {id}, // PRODUCT ID
    });
  };
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
      // console.log('All orders od user', res);
    } catch (error) {
      console.log('Error from get all order API', error);
    }
  };
  //METHOD TO GET ALL ORDERS OF USER
  const getAllReviewOfUser = async () => {
    try {
      let userDetails = await AsyncStorage.getItem('LogInUser');
      let userData = JSON.parse(userDetails);
      setLoading(true);
      const res = await dispatch(
        GetAllUserReview({id: userData?._id}),
      ).unwrap();
      if (res) {
        // console.log('Added review ', res);
        setLoading(false);
      }
    } catch (error) {
      console.log('Error from get all order API', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getOrdersOfUser();
      getAllReviewOfUser();
    }, []),
  );
  return (
    <View style={styles.MainContainer}>
      {loading && <LoaderComp />}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*----------------- REVIEW GIVEN SECTION----------- */}
        <View style={styles.AddedReviewContainer}>
          {/* TITLE SECTION  */}
          <View style={styles.ReviewTitleContainer}>
            <Text style={styles.ReviewTitleText}>
              Are you done with these reviews?
            </Text>
          </View>
          {/* PRODUCTS CARDS SECTION    */}
          <FlatList
            contentContainerStyle={{gap: 8}}
            showsVerticalScrollIndicator={false}
            // SHOWING PRODUCTS WHOSE REVIEW IS ALREADY ADDED
            data={review?.reviews?.flatMap(reviewItem =>
              review?.products?.filter(
                prod => prod?._id == reviewItem?.productId,
              ),
            )}
            keyExtractor={item => item._id}
            renderItem={({item}) => {
              // FINDING REVIEW OF A SPECIFIC PRODUCT
              const productReviews = review?.reviews?.filter(
                reviewItem => reviewItem?.productId === item?._id,
              );

              return (
                <View style={styles.productsCardContainer}>
                  {/* PRODUCTS DETAILS CONTAINER  */}
                  <View style={styles.productDetails}>
                    {/* PROD  IMAGE  */}
                    <View>
                      <Image
                        style={styles.Reviewimage}
                        source={{uri: item?.img}}
                        alt="Prod_Image"
                      />
                    </View>
                    <View style={styles.ProdTextData}>
                      <View style={styles.titleContainer}>
                        <Text style={styles.BrandText}>{item?.title}</Text>
                        <CheckIcons
                          name="checkcircleo"
                          color="green"
                          size={20}
                          style={{right: 0}}
                        />
                      </View>
                      {/* SHOWING REVIEW OF PRODUCTS  */}
                      {productReviews?.map(review => (
                        <Text style={styles.reviewText}>
                          {review?.description}
                        </Text>
                      ))}
                      {/* BUTTONS CONTAINER  */}
                      <View style={styles.BtnContainer}>
                        <TouchableOpacity style={styles.Buttons}>
                          <MaterialCommunityIcons
                            name="delete"
                            color={COLORS.primaryBlack}
                            size={20}
                            // onPress={() =}
                          />
                          <Text style={styles.btnText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.Buttons}>
                          <PencilIcon
                            name="pencil"
                            color={COLORS.primaryBlack}
                            size={15}
                          />
                          <Text style={styles.btnText}>Edit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
        {/* -----------------SECTION TO GIVE REVIEW -------------------- */}
        <View style={styles.AddReviewContainer}>
          {/* TITLE SECTION  */}
          <View style={styles.ReviewTitleContainer}>
            <Text style={styles.ReviewTitleText}>
              Care to review few more purchases?
            </Text>
          </View>
          {/* PRODUCTS CARDS SECTION    */}
          {/* PRODUCTS DETAILS CONTAINER  */}

          <FlatList
            contentContainerStyle={{gap: 8}}
            showsVerticalScrollIndicator={false}
            // SHOWING PRODUCTS ON WHICH WE CAN ADD REVIEW
            data={review?.products?.filter(
              prod => !reviewProductIds?.includes(prod?._id),
            )}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <View style={styles.productsCardContainer}>
                <View style={styles.productDetails}>
                  {/* PROD  IMAGE  */}
                  <View>
                    <Image
                      style={styles.Reviewimage}
                      source={{uri: item?.img}}
                      alt="Prod_Image"
                    />
                  </View>
                  <View style={styles.ProdTextData}>
                    <Text style={styles.BrandText}>{item?.title}</Text>
                    <Text style={styles.reviewText}>
                      {item?.description?.split(' ').length > 10
                        ? item.description.split(' ').slice(0, 10).join(' ') +
                          '...'
                        : item.description}
                    </Text>
                    {/* BUTTONS CONTAINER  */}
                    <View>
                      <TouchableOpacity
                        style={styles.AddReviewbtnContainer}
                        onPress={() => handleAddReview(item?._id)}>
                        <Text style={styles.Addreviewbtn}>Write a review</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  MainContainer: {
    padding: 10,
    // flex: 1,
  },
  AddedReviewContainer: {},
  ReviewTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: SPACING.space_10,
  },
  ReviewTitleText: {
    color: COLORS.primaryBlack,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.Metropolis_bold,
  },
  productsCardContainer: {
    backgroundColor: COLORS.Card_Background,
  },
  Reviewimage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  productDetails: {
    flexDirection: 'row',
    padding: 5,
  },
  ProdTextData: {
    flexDirection: 'column',
    padding: 5,
    gap: 5,
    width: '72%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  BrandText: {
    color: COLORS.primaryBlack,
    fontFamily: FONTFAMILY.Metropolis_bold,
    fontSize: FONTSIZE.size_18,
  },
  reviewText: {
    color: COLORS.primaryBlack,
    fontFamily: FONTFAMILY.Mertopolis_medium,
    fontSize: FONTSIZE.size_14,
    flexWrap: 'wrap',
  },
  BtnContainer: {
    flexDirection: 'row',
    // gap: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  Buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
  },
  btnText: {
    color: COLORS.primaryBlack,
    fontFamily: FONTFAMILY.Mertopolis_medium,
    fontSize: FONTSIZE.size_14,
  },
  AddReviewContainer: {},
  AddReviewbtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
  },
  Addreviewbtn: {
    color: 'blue',
    fontFamily: FONTFAMILY.Mertopolis_medium,
    fontSize: FONTSIZE.size_14,
  },
});
