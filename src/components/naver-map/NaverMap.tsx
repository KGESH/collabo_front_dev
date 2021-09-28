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
  currentLocationVar,
  cafeInfoVar,
  clickedHashTagVar,
} from 'services/apollo-client/LocalState';
import { useReactiveVar } from '@apollo/client';
import { getDistance } from 'components/naver-map/MapFunctions';

const NaverMap = (props: any) => {
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
  const currentLocation = useReactiveVar(currentLocationVar);
  const {type, id} = props.props;

  useEffect(() => {
    if (!loading && data && !cafeInfo.length && currentLocation.latitude) {
      data.getAllCafe.map((cafe: any, index: number) => {
        const id: number = cafe.cafe_id;
        const name: string = cafe.cafe_info.cafe_name;
        const address: string = cafe.cafe_info.address;
        const beans: string = cafe.cafe_info.beans;
        const phone: string = cafe.cafe_info.phone;
        const [latitude, longitude]: string[] =
          cafe.cafe_info.location.split(',');
        const mapPos: naver.maps.LatLng = new naver.maps.LatLng(
          +latitude,
          +longitude,
        );
        const distaceString: string = getDistance(
          +currentLocation.latitude,
          +currentLocation.longitude,
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
          beans: beans,
          phone: phone,
        });
        cafeInfoVar(cafeInfo);
      });
    }
  }, [currentLocation, loading]);

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
    if (!isMapExist && cafeInfo.length && currentLocation.latitude) {
      initMap(type, id);
      setIsMapExist(true);
    } else if (isMapExist) {
      const currentMarker = currentMarkerVar();
      if (currentMarker) {
        currentMarker.setOptions({
          position: new naver.maps.LatLng(
            currentLocation.latitude,
            currentLocation.longitude,
          ),
        });
      }
    }
  }, [currentLocation, loading]);

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
