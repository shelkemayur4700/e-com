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
import {useToast} from 'react-native-toast-notifications';
import FeatherIcons from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import LoaderComp from '../components/LoaderComp';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import {DeleteFavourite, GetFavourites} from '../thunk/favourite';

const Favorites = ({navigation, route}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  // const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [favProds, setFavprods] = useState([]);
  //METHOD TO GET ALL FAVOURITES BY USERID
  const GetFavByUserId = async () => {
    try {
      setLoading(true);
      const user = await AsyncStorage.getItem('LogInUser');
      const id = JSON.parse(user)?._id;
      const res = await dispatch(GetFavourites(id)).unwrap();
      // console.log('res from get fav', res);
      if (res) {
        setFavprods(res?.favProds);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // console.log('error from get favs', error);
    }
  };
  //METHOD TO DELETE ITEM FROM FAV
  const handleRemoveItem = async id => {
    console.log('product id to delete favs', id);
    try {
      setLoading(true);
      const user = await AsyncStorage.getItem('LogInUser');
      const userid = JSON.parse(user)?._id;
      const res = await dispatch(
        DeleteFavourite({userid: userid, productid: id}),
      ).unwrap();
      console.log('res from get delete', res?.message);
      if (res) {
        setLoading(false);
        GetFavByUserId();
        toast.show(res?.message, {
          type: 'danger',
        });
      }
    } catch (error) {
      setLoading(false);
      console.log('error from get favs', error);
    }
  };
  //METHOD TO ADD TO FAV
  const handleAddToFav = () => {
    navigation.navigate('HomePage', {
      screen: 'Home',
    });
  };
  useFocusEffect(
    useCallback(() => {
      GetFavByUserId();
    }, []),
  );
  return (
    <>
      <View style={styles.mainContainer}>
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
          <View style={styles.Heading}>
            <Text style={styles.HeadingText}>Favorites</Text>
          </View>
          {/* ---------------vertical scroll for filters------------ */}
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {loading && <LoaderComp />}
            <View style={styles.filtersContainer}>
              <View style={styles.filter}>
                <Text style={styles.filterName}>Men</Text>
              </View>
              <View style={styles.filter}>
                <Text style={styles.filterName}>Women</Text>
              </View>
              <View style={styles.filter}>
                <Text style={styles.filterName}>Kids</Text>
              </View>
              <View style={styles.filter}>
                <Text style={styles.filterName}>Accessories</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <ScrollView style={{padding: 10}} showsVerticalScrollIndicator={false}>
          {favProds?.length <= 0 ? (
            <View style={styles.NotBoughtContainer}>
              <Text style={styles.NotBoughtHead}>Nothing to show</Text>
              <TouchableOpacity
                style={styles.ShoppingButton}
                onPress={() => handleAddToFav()}>
                <Text style={{color: COLORS.primarywhite}}>Add to fav</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // ---------CARD-------------
            <FlatList
              style={{flex: 1}}
              contentContainerStyle={{gap: 8}}
              showsHorizontalScrollIndicator={false}
              data={favProds}
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
                      <Text style={styles.CardCategory}>{item?.category}</Text>
                    </View>
                    <View style={styles.ContainerTWO}>
                      <MaterialCommunityIcons
                        name="delete"
                        color={COLORS.primaryBlack}
                        size={20}
                        onPress={() => handleRemoveItem(item?._id)}
                      />
                      <Text style={styles.price}>₹{item?.price}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    paddingTop: 20,
    // backgroundColor: 'yellow',
    borderBottomColor: COLORS.primarygrey,
    borderBottomWidth: 1,
    // elevation: 5,
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
    fontSize: FONTSIZE.Header_FONT_SIZE,
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
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: COLORS.primaryBlack,
    borderRadius: 20,
  },
  filterName: {
    color: COLORS.primarywhite,
    fontSize: 16,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.Card_Background,
    borderRadius: 10,
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
  NotBoughtContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
    padding: SPACING.space_10,
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
