import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
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
import {useToast} from 'react-native-toast-notifications';
import EvilIconsIcons from 'react-native-vector-icons/AntDesign';
import StarIcon from 'react-native-vector-icons/FontAwesome';
import PencilIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import LoaderComp from '../components/LoaderComp';
import {RedButton} from '../components/RedButton';
import {addToCart} from '../slice/cart';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import {AddFavourite} from '../thunk/favourite';
import {GetAllProductReview} from '../thunk/review';
const Detail = ({navigation, route}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);

  let productInfo = route.params.product;
  console.log('prodInfo', productInfo?._id);
  // Temp solution to manage quantity
  let productData = {...productInfo, quantity: 1};
  //METHOD TO ADD PROD IN CART
  const HandleAddtoCart = product => {
    dispatch(addToCart(product));
    navigation.push('HomePage', {
      screen: 'Bag',
    });
  };

  //METHOD TO HANDLE FAVOURITE
  //API CALL TO ADD FAVOURITES
  const handleFavourite = async id => {
    try {
      setIsFavourite(true);
      setLoading(true);
      const user = await AsyncStorage.getItem('LogInUser');
      const payload = {
        userid: JSON.parse(user)?._id,
        productid: id,
        isFavourite: isFavourite,
      };

      let response = await dispatch(AddFavourite(payload));
      console.log('response of api ', response);
      if (response?.payload?.status) {
        setLoading(false);
        toast.show(response?.payload?.message, {
          type: response?.payload?.status == 'Failed' ? 'danger' : 'success',
        });
        console.log('add to fav');
      }
    } catch (error) {
      setIsFavourite(false);
      setLoading(false);
      console.log('error from add review', error);
    }
  };
  //METHOD TO ADD REVIEW ON PRODUCT
  const HandleAddReview = id => {
    navigation.push('MainApp', {
      screen: 'AddReview',
      params: {id}, // PRODUCT ID
    });
  };
  //METHOD TO GET ALL REVIEW OF A SPECIFIC PRODUCT
  const getReview = async () => {
    try {
      setLoading(true);
      const res = await dispatch(
        GetAllProductReview({id: productInfo?._id}),
      ).unwrap();
      if (res) {
        setReview(res?.reviews);
        setLoading(false);
      }
    } catch (error) {
      console.log('Error FROM REVIEW OF PROD ', error);
    }
  };
  //METHOD TO CALCULATE RATING
  const calculateRating = review => {
    let rating = 0;
    for (let i = 0; i < review?.length; i++) {
      rating = (rating + review[i]?.rating) / review.length;
    }
    return rating?.toFixed(2);
  };
  // TO GET ALL REVIEW OF A PROD
  useFocusEffect(
    useCallback(() => {
      getReview();
    }, []),
  );
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.primaryred} />
      {loading && <LoaderComp />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 20}}>
        {/* IMAGE SECTION  */}
        <View style={styles.Detail_Img}>
          <Image
            style={styles.Detail_Image}
            source={{uri: productData?.img}}
            alt="Image"
          />
          <TouchableOpacity
            onPress={() => handleFavourite(productData?._id)}
            style={{
              position: 'absolute',
              top: 30,
              right: 90,
              padding: 5,
              borderRadius: 20,
              // backgroundColor: 'yellow',
            }}>
            <EvilIconsIcons
              name={isFavourite ? 'heart' : 'hearto'}
              color={isFavourite ? COLORS?.primaryred : COLORS.primarywhite}
              size={22}
            />
          </TouchableOpacity>
        </View>

        {/* PRODUCT DETAILS SECTION  */}
        <View style={styles.footer}>
          <View style={styles.productDetailsContainer}>
            <View style={styles.productDetails}>
              <Text style={styles.BrandName}>{productData?.title}</Text>
              <Text style={styles.Price}>₹{productData?.price}</Text>
            </View>
            <Text style={styles.ProductInfo}>{productData?.category}</Text>
            <Text style={styles.ProductInfo}>{productData?.type}</Text>
            <Text style={styles.ProductDesc}>{productData?.description}</Text>
          </View>
          {/* BRAND DETAILS SECTION  */}
          {/* <View style={styles.BrandDetails}>
            <Text>SHOW BRAND DETAILS</Text>
          </View> */}
          {/* SIMILER PRODUCT SECTION  */}
          {/* <View style={styles.SimilerProd}>
            <Text>SHOW SIMILER PRODUCTS</Text>
          </View> */}
          {/* RATINGS AND REVIEW SECTION  */}
          <View style={styles.ReviewContainer}>
            <View style={styles.ratingTitleContainer}>
              <Text style={styles.ratingTitleText}>Rating & Reviews</Text>
            </View>
            {/* -------------RATING AND REVIEW  SECTION --------- */}
            <View style={styles.ratingTextContainer}>
              <View>
                <Text style={styles.ratingTextDigit}>
                  {calculateRating(review)}
                </Text>
              </View>
              {/* STARTS SECTION  */}
              <View style={styles.starsContainer}>
                {/* <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={40}
                  ratingBackgroundColor="transparent"
                /> */}
                <View style={styles.StarReviewCard}>
                  <StarIcon
                    name="star"
                    color={
                      calculateRating(review) >= 1
                        ? COLORS?.primarySilver
                        : COLORS?.primaryBlack
                    }
                    size={30}
                  />
                  <StarIcon
                    name="star"
                    color={
                      calculateRating(review) >= 2
                        ? COLORS?.primarySilver
                        : COLORS?.primaryBlack
                    }
                    size={30}
                  />
                  <StarIcon
                    name="star"
                    color={
                      calculateRating(review) >= 3
                        ? COLORS?.primarySilver
                        : COLORS?.primaryBlack
                    }
                    size={30}
                  />
                  <StarIcon
                    name="star"
                    color={
                      calculateRating(review) >= 4
                        ? COLORS?.primarySilver
                        : COLORS?.primaryBlack
                    }
                    size={30}
                  />
                  <StarIcon
                    name="star"
                    color={
                      calculateRating(review) >= 5
                        ? COLORS?.primarySilver
                        : COLORS?.primaryBlack
                    }
                    size={30}
                  />
                </View>
              </View>
            </View>
            {/* SHOWING ADDED REVIEWS  */}
            <View style={styles.showReviewContainer}>
              {/* SHOW REVIEW TITLE CONTAINER  */}
              <View style={styles.reviewTitleconatiner}>
                <Text style={styles.reviewHeadText}>
                  {review?.length} reviews
                </Text>
              </View>
              {/* RATE PRODUCT BTN  */}
              <TouchableOpacity
                style={styles.rateBtn}
                onPress={() => HandleAddReview(productData?._id)}>
                <PencilIcon
                  name="pencil"
                  color={COLORS.primaryBlack}
                  size={15}
                />
                <Text style={styles.RatebtnText}>Rate Product</Text>
              </TouchableOpacity>
            </View>
            {/* ---------USER'S REVIEW ON PRODUCTS------ */}
            <View style={styles.UserReviewContainer}>
              <FlatList
                style={{flex: 1}}
                contentContainerStyle={{gap: 8}}
                showsHorizontalScrollIndicator={false}
                data={review}
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                  <View style={styles.reviewCard}>
                    <View style={styles.UserDetailsReview}>
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 50,
                          left: 0,
                          position: 'relative',
                        }}
                        source={{uri: productData?.img}}
                        alt="Image"
                      />
                      <Text style={styles.UserOfReview}>Mayur Shelke</Text>
                    </View>
                    <View style={styles.stardateContainer}>
                      <View style={styles.StarReviewCard}>
                        <StarIcon
                          name="star"
                          color={
                            item?.rating >= 1
                              ? COLORS?.primarySilver
                              : COLORS?.primaryBlack
                          }
                          size={20}
                        />
                        <StarIcon
                          name="star"
                          color={
                            item?.rating >= 2
                              ? COLORS?.primarySilver
                              : COLORS?.primaryBlack
                          }
                          size={20}
                        />
                        <StarIcon
                          name="star"
                          color={
                            item?.rating >= 3
                              ? COLORS?.primarySilver
                              : COLORS?.primaryBlack
                          }
                          size={20}
                        />
                        <StarIcon
                          name="star"
                          color={
                            item?.rating >= 4
                              ? COLORS?.primarySilver
                              : COLORS?.primaryBlack
                          }
                          size={20}
                        />
                        <StarIcon
                          name="star"
                          color={
                            item?.rating >= 5
                              ? COLORS?.primarySilver
                              : COLORS?.primaryBlack
                          }
                          size={20}
                        />
                      </View>
                      <Text style={{color: COLORS.primaryBlack}}>
                        {item?.dateCreated.split('T')[0]}
                      </Text>
                    </View>
                    <Text style={styles.ReviewText}>{item?.description}</Text>
                    {/* REVIEW IMAGES CONTAINER  */}
                    {item?.media && (
                      <View style={styles.ReviewImagesContainer}>
                        <Image
                          style={styles.ReviewImg}
                          source={{uri: item?.media}}
                        />
                      </View>
                    )}
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.addButtonContainer}>
        <RedButton
          handleClick={() => HandleAddtoCart(productData)}
          name="ADD TO CART"
        />
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    position: 'relative',
    // marginBottom: 25,
  },
  Detail_Img: {
    paddingTop: 20,
    alignItems: 'center',
    position: 'relative',
  },
  Detail_Image: {
    height: 300,
    width: 200,
    borderRadius: 20,
  },
  footer: {
    marginBottom: 25,
    padding: 10,
  },
  productDetailsContainer: {
    // flex: 1,
    padding: 10,
  },
  productDetails: {
    // flex: 1,
  },
  BrandName: {
    fontFamily: FONTFAMILY.Metropolis_bold,
    color: COLORS.primaryBlack,
    fontSize: 25,
  },
  Price: {
    color: COLORS.primaryBlack,
    paddingRight: 10,
    fontSize: 25,
  },
  ProductInfo: {
    color: COLORS.primarygrey,
    paddingTop: 5,
  },
  ProductDesc: {
    color: COLORS.primaryBlack,
    justifyContent: 'center',
    paddingTop: 5,
    fontSize: 15,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
    // backgroundColor: 'trans',
  },
  BrandDetails: {
    backgroundColor: 'blue',
  },
  SimilerProd: {
    backgroundColor: 'yellow',
  },
  ReviewContainer: {
    padding: 15,
  },
  ratingTitle: {},
  RatebtnText: {
    color: COLORS.primaryBlack,
  },
  ratingTitleText: {
    color: COLORS.primaryBlack,
    fontSize: 25,
    fontFamily: FONTFAMILY.Metropolis_bold,
  },
  rateBtn: {
    borderRadius: 10,
    borderColor: COLORS.primaryBlack,
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ratingTextContainer: {
    padding: SPACING.space_10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingTextDigit: {
    fontSize: SPACING.space_30,
    fontFamily: FONTFAMILY.Metropolis_bold,
    color: COLORS.primaryBlack,
    alignSelf: 'center',
  },
  ratingText: {
    fontSize: SPACING.space_18,
    fontFamily: FONTFAMILY.Mertopolis_medium,
    color: COLORS.primaryBlack,
  },
  starsContainer: {
    justifyContent: 'center',
    marginLeft: 40,
  },
  showReviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewTitleconatiner: {},
  reviewHeadText: {
    color: COLORS.primaryBlack,
    fontSize: FONTSIZE.size_22,
    fontFamily: FONTFAMILY.Metropolis_bold,
  },
  checkboxToShowPhotos: {
    flexDirection: 'row',
    gap: 10,
  },
  UserReviewContainer: {
    marginVertical: 10,
  },
  reviewCard: {
    backgroundColor: COLORS.Card_Background,
    padding: 10,
    borderRadius: 10,
  },
  UserDetailsReview: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  UserOfReview: {
    fontFamily: FONTFAMILY.Metropolis_bold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryBlack,
  },
  stardateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  StarReviewCard: {
    flexDirection: 'row',
    padding: 5,
    gap: 5,
    justifyContent: 'space-between',
  },
  ReviewText: {
    color: COLORS.primaryBlack,
    padding: 5,
    lineHeight: SPACING.space_20,
  },
  ReviewImagesContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  ReviewImg: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  AddreviewBtn: {
    flexDirection: 'row',
    // backgroundColor: COLORS.primaryred,
    padding: 10,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    gap: 8,
    borderColor: COLORS.primaryBlack,
  },
  AddreviewText: {
    color: COLORS.primaryBlack,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.Mertopolis_medium,
  },
});
