import LottieView from 'lottie-react-native';
import React from 'react';
import {Modal, View} from 'react-native';

export default function LoaderComp() {
  return (
    <Modal transparent={true} animationType="none">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          source={require('../Assets/LOADER.json')}
          autoPlay
          loop
          justifyContent="center"
          height={'40%'}
          width={'20%'}
        />
      </View>
    </Modal>
  );
}
