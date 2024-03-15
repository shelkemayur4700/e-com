import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { primaryred, primarywhite } from '../constant';

{
  /* ------------------MAIN BUTTON COMPONENT------------------- */
}
export const RedButton = ({handleClick, name}) => {
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
