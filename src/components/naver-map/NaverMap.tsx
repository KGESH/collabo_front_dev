import React, { useState, useEffect, useRef } from 'react';
import 'components/naver-map/style/NaverMap.css';
import initMap from 'components/naver-map/InitMap';
import useGeolocation from 'react-hook-geolocation';
import { useReactiveVar } from '@apollo/client';
import { mapVar, markerVar } from 'components/naver-map/InitMap';
import { makeVar } from '@apollo/client';

export interface position {
  latitude: number;
  longitude: number;
}

const NaverMap = () => {
  /**
   * currentPosition : 현재 좌표
   * isMap : 지도 생성 여부
   */
  const [currentPosition, setCurrentPosition] = useState<position>({
    latitude: 0,
    longitude: 0,
  });
  const [isMap, setIsMap] = useState<boolean>(false);
  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0,
  });

  const map = useReactiveVar(mapVar);
  const currentMarker = useReactiveVar(markerVar);

  /**
   * 지도가 이미 생성되어 있거나 (0, 0) 좌표이면 지도를 생성하지 않음
   * 지도가 이미 생성되어 있으면 현재 위치의 마커 현재 위치로
   *
   */
  useEffect(() => {
    console.log(geolocation);
    console.log(
      `${geolocation.latitude}, ${geolocation.longitude}, ${geolocation.timestamp}, hook`,
    );
    if (!geolocation.error && geolocation.latitude) {
      setCurrentPosition({
        latitude: geolocation.latitude,
        longitude: geolocation.longitude,
      });
      if (!isMap && currentPosition.latitude) {
        initMap(currentPosition);
        setIsMap(true);
      } else if (isMap) {
        console.log(markerVar(), currentMarker, `makeVar`);
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
