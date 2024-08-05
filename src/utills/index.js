import {PERMISSIONS, request} from 'react-native-permissions';

//METHOD TO GET PERMISSION TO GET CURRENT LOCATION
export const getLocationPermission = async () => {
  const permissionGranted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location Permission',
      message: 'we need to access location',
    },
    error => console.log(error.message),
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    },
  );
  return permissionGranted === PermissionsAndroid.RESULTS.GRANTED;
};

//METHOD TO GET PERMISSIONS FOR CAMERA
export const requestCameraPermission = async () => {
  console.log('request camera permission');
  const result = await request(PERMISSIONS.ANDROID.CAMERA);
  console.log('result of camera permission', result);
  return result === 'granted';
};

//METHOD TO GET LOCAL STORAGE PERMISSIONS
export const requestStoragePermission = async () => {
  console.log('request storage permission');
  const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
  console.log('result of storage permission', result);
  return result;
};
