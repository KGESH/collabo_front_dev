import React, { useState, useEffect, useRef } from 'react';
import 'components/naver-map/style/NaverMap.css';
import initMap from 'components/naver-map/InitMap';
import { ICafeInfo } from 'types/Map';
import { GET_CAFES } from 'components/naver-map/MapGql';
import { useQuery } from '@apollo/client';
import useGeolocation from 'react-hook-geolocation';
import {
  mapVar,
  currentMarkerVar,
  currentPositionVar,
  cafeInfoVar,
} from 'services/apollo-client/LocalState';
import { useReactiveVar } from '@apollo/client';
import { clickedHashTagVar } from 'services/apollo-client/LocalState';
import { getDistance } from 'components/naver-map/MapFunctions';

const NaverMap = () => {
  window.addEventListener(
    'load',
    () => {
      setTimeout(() => {
        window.scrollTo(0, 1);
      }, 100);
    },
    false,
  );

  /**
   * Load cafe_info
   */
  const cafeInfo: ICafeInfo[] = [];
  const { loading, data, error } = useQuery(GET_CAFES, {});

  /**
   * isMapExist : 지도 생성 여부
   * clikedHashTag : 현재 지도의 해쉬 태그
   */

  const [isMapExist, setIsMapExist] = useState<boolean>(false);
  const clickedHashTag = useReactiveVar(clickedHashTagVar);
  const currentPosition = useReactiveVar(currentPositionVar);

  useEffect(() => {
    if (!loading && data && !cafeInfo.length && currentPosition.latitude) {
      data.getAllCafe.map((cafe: any) => {
        const id: number = cafe.cafe_id;
        const name: string = cafe.cafe_info.cafe_name;
        const address: string = cafe.cafe_info.address;
        const [latitude, longitude]: string[] =
          cafe.cafe_info.position.split(',');
        const mapPos: naver.maps.LatLng = new naver.maps.LatLng(
          +latitude,
          +longitude,
        );
        const distaceString: string = getDistance(
          +currentPosition.latitude,
          +currentPosition.longitude,
          +latitude,
          +longitude,
        );
        cafeInfo.push({
          id: id,
          name: name,
          mapPos: mapPos,
          latitude: latitude,
          longitude: longitude,
          distance: +distaceString,
          address: address,
        });
        cafeInfoVar(cafeInfo);
        //console.log(name, latitude, longitude, `info`);
      });
    }
  }, [currentPosition, loading]);

  /**
   * 해쉬 태그 클릭 감지
   */
  useEffect(() => {
    console.log(clickedHashTag);
  }, [clickedHashTag]);

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
    if (!isMapExist && cafeInfo.length && currentPosition.latitude) {
      initMap();
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
  }, [currentPosition, loading]);

  const trigger = (event: any) => {
    const list: any = document.getElementById('menu_list');
    list.classList.toggle('open');
    event.currentTarget.classList.toggle('active');
  };

  return (
    <>
      <div id='map' />
    </>
  );
};

export default NaverMap;
