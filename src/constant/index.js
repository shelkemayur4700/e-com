import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const primarywhite = '#FFFFFF';
export const primaryBlack = '#222222';
export const primaryred = '#DB3022';
export const primarygrey = '#9B9B9B';
export const primarySilver = '#FFBA49';
export const Card_Background = '#e9ecef';

export const Bold_Font = 'Metropolis-Bold';
export const Header_FONT_SIZE = 30;
export const BASE_URL = 'https://fakestoreapi.com';

{/* ------------------MAIN BUTTON COMPONENT------------------- */}
export const MainButton = ({handleClick, name}) => {
  console.log('calling main button');
  return (
    <>
      <View>
        <TouchableOpacity onPress={() => handleClick()}>
          <Text style={styles.Checkout}>{name}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  Checkout: {
    // flex: 1,
    backgroundColor: primaryred,
    color: primarywhite,
    height: 44,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
});
