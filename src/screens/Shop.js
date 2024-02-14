import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {useRoute} from '@react-navigation/native';

const Shop = () => {
  const route = useRoute();
  const currentScreenName = route.name;
  return (
    <View style={{flex: 1}}>
      <Header currentScreenName={currentScreenName} />
      <Text></Text>
    </View>
  );
};

export default Shop;

const styles = StyleSheet.create({});
