import React, { useState, useEffect, useRef } from 'react';
import 'components/naver-map/style/NaverMap.css';
import initMap from 'components/naver-map/InitMap';
import { ICafeInfo } from 'components/naver-map/MapInterface';
import { GET_CAFES } from 'components/naver-map/MapGql';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import useGeolocation from 'react-hook-geolocation';
import {
  mapVar,
  currentMarkerVar,
  currentPositionVar,
} from 'components/naver-map/LocalState';
import { useReactiveVar } from '@apollo/client';

const NaverMap = () => {
  /**
   * Load cafe_info
   */
  const cafeInfo: ICafeInfo[] = [];
  const { loading, data, error } = useQuery(GET_CAFES, {});
  if (!loading && data) {
    data.getAllCafe.map((cafe: any) => {
      const name: string = cafe.cafe_info.name;
      const [latitude, longitude] : string[] = cafe.cafe_info.position.split(',');
      const mapPos: naver.maps.LatLng = new naver.maps.LatLng(
        +latitude,
        +longitude,
      );
      cafeInfo.push({
        name: name,
        mapPos: mapPos,
        latitude: latitude,
        longitude: longitude,
      });
      //console.log(name, latitude, longitude, `info`);
    });
  }

  /**
   * positionVar : 현재 좌표
   * isMapExist : 지도 생성 여부
   */

  const [isMapExist, setIsMapExist] = useState<boolean>(false);
  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0,
  });

  /**
   * 지도가 이미 생성되어 있거나 (0, 0) 좌표이면 지도를 생성하지 않음
   * 지도가 이미 생성되어 있으면 현재 위치의 마커 현재 위치로
   *
   */
  useEffect(() => {
    //console.log(geolocation);
    /*console.log(
      `${geolocation.latitude}, ${geolocation.longitude}, ${geolocation.timestamp}, hook`,
    );*/
    if (!geolocation.error && geolocation.latitude) {
      currentPositionVar({
        latitude: geolocation.latitude,
        longitude: geolocation.longitude,
      });
      const currentPosition = currentPositionVar();
      if (!isMapExist && cafeInfo.length && currentPosition.latitude) {
        initMap(cafeInfo);
        setIsMapExist(true);
      } else if (isMapExist) {
        const currentMarker = currentMarkerVar();
        if (currentMarker) {
          currentMarker.setOptions({
            position: new naver.maps.LatLng(
              currentPosition.latitude,
              currentPosition.longitude,
            ),
          });
        }
      }
    }
  }, [geolocation]);

  return (
    <>
      <React.Fragment>
        <div id='map'></div>
      </React.Fragment>
    </>
  );
};

export default NaverMap;
