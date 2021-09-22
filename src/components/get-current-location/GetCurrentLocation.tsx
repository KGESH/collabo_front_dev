import { useEffect } from 'react';
import useGeolocation from 'react-hook-geolocation';
import { currentLocationVar } from 'services/apollo-client/LocalState';
import { useReactiveVar } from '@apollo/client';

const GetCurrentLocation = () => {
  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0,
  });

  useEffect(() => {
    if (!geolocation.error && geolocation.latitude) {
      currentLocationVar({
        latitude: geolocation.latitude,
        longitude: geolocation.longitude,
      });
      console.log(
        currentLocationVar().latitude,
        currentLocationVar().longitude,
      );
    }
  }, [geolocation]);

  return <></>;
};

export default GetCurrentLocation;
