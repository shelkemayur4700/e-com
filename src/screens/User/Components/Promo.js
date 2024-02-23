import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Promo = ({navigation}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row-reverse'}}>
      <View style={{flex: 3, backgroundColor: 'yellow'}}></View>
      <View style={{flex: 2, backgroundColor: 'green'}}></View>
      <View style={{flex: 1, backgroundColor: 'red'}}></View>
    </View>
    // </View>
  );
};

export default Promo;

const styles = StyleSheet.create({});
