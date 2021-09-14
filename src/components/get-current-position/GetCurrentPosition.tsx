import { useEffect } from 'react';
import useGeolocation from 'react-hook-geolocation';
import { currentPositionVar } from 'services/apollo-client/LocalState';
import { useReactiveVar } from '@apollo/client';

const GetCurrentPosition = () => {
  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0,
  });

  useEffect(() => {
    if (!geolocation.error && geolocation.latitude) {
      currentPositionVar({
        latitude: geolocation.latitude,
        longitude: geolocation.longitude,
      });
      console.log(
        currentPositionVar().latitude,
        currentPositionVar().longitude,
      );
    }
  }, [geolocation]);

  return <></>;
};

export default GetCurrentPosition;
