import React from 'react';
import LottieView from 'lottie-react-native';
import {Modal, View} from 'react-native';

export default function LoaderComp() {
  return (
    <Modal transparent={true} animationType="none">
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LottieView
          source={require('../Assets/Images/LOADER.json')}
          autoPlay
          loop
          justifyContent='center'
          height={'30%'}
          width={'30%'}
        />
      </View>
    </Modal>
  );
}
