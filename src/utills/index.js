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
