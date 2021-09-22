import { useEffect } from 'react';
import useGeolocation from 'react-hook-geolocation';
import {
  currentLocationVar,
  cafeInfoVar,
  clickedCafeDetailVar,
} from 'services/apollo-client/LocalState';
import { useReactiveVar } from '@apollo/client';
import { ICafeInfo } from 'types/Map';
import { getDistance } from 'components/naver-map/MapFunctions';

const GetCurrentLocation = () => {
  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0,
  });
  const cafeInfo = useReactiveVar(cafeInfoVar);

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

    /**
     * 새로운 위치를 갱신할때 마다 하는 작업
     *  1. 각 카페의 거리 갱신
     *  2. 선택된 카페(map cafe detail 참고)의 거리 갱신
     */
    if (cafeInfoVar().length) {
      cafeInfoVar(
        cafeInfoVar().map((cafeInfo: ICafeInfo, index: number): ICafeInfo => {
          const distaceString: string = getDistance(
            geolocation.latitude,
            geolocation.longitude,
            +cafeInfo.latitude,
            +cafeInfo.longitude,
          );
          console.log(cafeInfo.name, distaceString);
          const cafeInfoRenewByDistance: ICafeInfo = {
            id: cafeInfo.id,
            name: cafeInfo.name,
            mapPos: cafeInfo.mapPos,
            latitude: cafeInfo.latitude,
            longitude: cafeInfo.longitude,
            distance: +distaceString,
            address: cafeInfo.address,
            beans: cafeInfo.beans,
            phone: cafeInfo.phone,
          };
          if (cafeInfo.id === clickedCafeDetailVar()?.id) {
            clickedCafeDetailVar(cafeInfoRenewByDistance);
          }
          return cafeInfoRenewByDistance;
        }),
      );
    }
  }, [geolocation]);

  return <></>;
};

export default GetCurrentLocation;
