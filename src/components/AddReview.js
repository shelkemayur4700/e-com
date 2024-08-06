import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import {Rating} from 'react-native-ratings';
import CameraIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import {CreateReviewApi, getAllProdPurchase} from '../thunk/review';
import {requestCameraPermission, requestStoragePermission} from '../utills';
import LoaderComp from './LoaderComp';
import {RedButton} from './RedButton';

const AddReview = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [imageUri, setImageUri] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [isProdNotBought, setIsProdNotBought] = useState(false);
  const [Loading, setLoading] = useState(false);
  const id = route?.params?.id; // PRODUCT ID
  console.log('id', id);
  //METHOD TO HANDLE BACK PRESS
  const handleClick = () => {
    navigation.goBack();
  };
  //METHOD TO ADD MEDIA
  const handleAddPhoto = () => {
    handleOpenModal();
  };

  //METHOD TO OPEN MODAL
  const handleOpenModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  //METHOD TO HANDLE CAMERA
  const handleCamera = async () => {
    console.log('Camera clicked');
    setIsModalVisible(false);
    await requestCameraPermission();
    const result = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: true,
    });
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else {
      console.log('camera response', result);
      const file = {
        name: result.assets[0]?.fileName,
        type: result.assets[0]?.type,
        size: result.assets[0]?.fileSize,
        uri: result.assets[0]?.uri,
      };
      setImageUri(file);
    }
  };

  //METHOD TO HANDLE GALLERY
  const handleGallery = async () => {
    setIsModalVisible(false);
    await requestStoragePermission();
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else {
      const file = {
        name: result.assets[0]?.fileName,
        type: result.assets[0]?.type,
        size: result.assets[0]?.fileSize,
        uri: result.assets[0]?.uri,
      };
      setImageUri(file);
    }
  };
  //METHOD TO CHECK PRODUCT IS BOUGHT BY USER OR NOT
  const handleCheckProd = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('LogInUser');
      let userData = JSON.parse(userDetails);
      setLoading(true);
      const response = await dispatch(
        getAllProdPurchase({id: userData?._id}),
      ).unwrap();
      response?.userProductsID?.some(item => {
        if (item == id?.toString()) {
          setIsProdNotBought(false);
          console.log('product is bought');
          setLoading(false);
          return true;
        } else {
          console.log('product is not bought');
          setIsProdNotBought(true);
          setLoading(false);
          return false;
        }
      });
    } catch (error) {
      setLoading(false);
      console.log('error from handle check response', error);
    }
  };
  //FINAL API CALL
  const handleAddReview = async () => {
    try {
      const user = await AsyncStorage.getItem('LogInUser');
      let formData = new FormData();
      formData.append('description', reviewText);
      formData.append('rating', rating);
      formData.append('file', {
        uri: imageUri.uri,
        name: imageUri.name,
        type: imageUri.type,
        size: imageUri.size,
      });

      const payload = {
        userid: JSON.parse(user)?._id,
        productid: id,
      };
      setLoading(true);
      let response = await dispatch(CreateReviewApi({...payload, formData}));
      console.log('response of api ', response.payload.message);
      if (response.payload.message === 'Review added') {
        setLoading(false);
        navigation.goBack();
      }
    } catch (error) {
      setLoading(false);
      console.log('error from add review', error);
    }
  };
  useEffect(() => {
    if (id) {
      handleCheckProd();
    }
  }, [id]);
  return (
    <KeyboardAvoidingView>
      {Loading && <LoaderComp />}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {isProdNotBought && (
          <View style={styles.NotBoughtContainer}>
            <Text style={styles.NotBoughtHead}>
              Haven't purchased this product?
            </Text>
            <Text style={styles.NotBoughtText}>
              Sorry!You are not allowed to review
            </Text>
            <Text style={styles.NotBoughtText}>
              this product since you haven't bought it.
            </Text>
            <TouchableOpacity
              style={styles.ShoppingButton}
              onPress={() => handleClick()}>
              <Text style={{color: COLORS.primarywhite}}>
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!isProdNotBought && (
          <View style={styles.maincontainer}>
            <View style={styles.TitleContainer}>
              <Text style={styles.titletext}>What is your rate?</Text>
            </View>
            {/* STARS SECTION */}
            <View style={styles.startsection}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={50}
                ratingBackgroundColor="transparent"
                onFinishRating={rate => setRating(rate)}
              />
            </View>
            {/* SECOND HEADING */}
            <View style={styles.Heading2Container}>
              <Text style={styles.titletext}>Please share your</Text>
              <Text style={styles.titletext}>opinion about the product</Text>
            </View>
            {/* TEXT INPUT FIELD */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.Reviewinput}
                placeholder="Your review"
                onChangeText={text => setReviewText(text)}
                multiline
                value={reviewText}
              />
              {/* CAMERA BUTTON SECTION */}
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'flex-start',
                  alignSelf: 'baseline',
                }}>
                <TouchableOpacity
                  style={styles.cameraSection}
                  onPress={handleAddPhoto}>
                  <View style={styles.cameraIconBackground}>
                    <CameraIcon
                      name="camera"
                      size={40}
                      color={COLORS.primarywhite}
                    />
                  </View>
                  <Text style={styles.cameraText}>Add photos</Text>
                </TouchableOpacity>

                <View style={styles.imagePreview}>
                  <Image source={{uri: imageUri?.uri}} style={styles.image} />
                </View>
              </View>
            </View>
            {/* SUBMIT BUTTON */}
            <View style={styles.submitButtonContainer}>
              <RedButton name="SEND REVIEW" handleClick={handleAddReview} />
            </View>
            {/* MODAL FOR CAMERA AND GALLERY */}
            <Modal isVisible={isModalVisible} onBackdropPress={handleOpenModal}>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => handleCamera()}>
                  <Text style={styles.modalButtonText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => handleGallery()}>
                  <Text style={styles.modalButtonText}>Gallery</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddReview;

const styles = StyleSheet.create({
  maincontainer: {
    // flex: 1,
    padding: SPACING.space_10,
    position: 'relative',
  },
  scrollViewContent: {
    // flexGrow: 1,
  },
  TitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titletext: {
    fontSize: SPACING.space_22,
    color: COLORS.primaryBlack,
    fontFamily: FONTFAMILY.Metropolis_bold,
  },
  startsection: {
    alignItems: 'center',
    paddingVertical: SPACING.space_30,
  },
  Heading2Container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.space_20,
  },
  inputContainer: {
    padding: SPACING.space_10,
    gap: 20,
  },
  Reviewinput: {
    height: 180,
    backgroundColor: COLORS.Card_Background,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryBlack,
    padding: SPACING.space_10,
    borderRadius: SPACING.space_10,
    fontFamily: FONTFAMILY.Metropolis_regular,
    flexWrap: 'wrap',
  },
  cameraSection: {
    backgroundColor: COLORS.Card_Background,
    paddingVertical: SPACING.space_20,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cameraIconBackground: {
    backgroundColor: COLORS.primaryred,
    padding: SPACING.space_10,
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlack,
    fontFamily: FONTFAMILY.Mertopolis_medium,
    marginTop: SPACING.space_6,
  },
  submitButtonContainer: {
    marginTop: SPACING.space_20 * 3,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 0,
    borderRadius: 10,
  },
  modalButton: {
    backgroundColor: COLORS.primaryred,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagePreview: {
    marginTop: SPACING.space_10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 10,
  },
  NotBoughtContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '80%',
    padding: SPACING.space_20,
  },
  NotBoughtHead: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.Metropolis_bold,
    color: COLORS.primaryBlack,
  },
  NotBoughtText: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.Metropolis_medium,
    color: COLORS.primaryBlack,
  },
  ShoppingButton: {
    backgroundColor: COLORS.primaryred,
    padding: SPACING.space_10,
    borderRadius: SPACING.space_10,
    marginTop: SPACING.space_20,
    alignItems: 'center',
    paddingHorizontal: SPACING.space_18,
  },
});
