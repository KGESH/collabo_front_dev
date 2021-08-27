import React, { useState, useEffect, useRef } from 'react';
import 'components/naver-map/style/NaverMap.css';
import initMap from 'components/naver-map/InitMap';
import { ICafeInfo } from 'components/naver-map/MapInterface';
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
  if (!loading && data) {
    data.getAllCafe.map((cafe: any) => {
      const name: string = cafe.cafe_info.cafe_name;
      const [latitude, longitude]: string[] =
        cafe.cafe_info.position.split(',');
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
      cafeInfoVar(cafeInfo);
      //console.log(name, latitude, longitude, `info`);
    });
  }

  /**
   * positionVar : 현재 좌표
   * isMapExist : 지도 생성 여부
   * clikedHashTag : 현재 지도의 해쉬 태그
   */

  const [isMapExist, setIsMapExist] = useState<boolean>(false);
  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0,
  });
  const clickedHashTag = useReactiveVar(clickedHashTagVar);

  /**
  * 해쉬 태그 클릭 감지
  */
  useEffect(()=>{
    console.log(clickedHashTag);
  },[clickedHashTag]);

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
      if (!isMapExist && currentPosition.latitude) {
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

  const trigger = (event: any) => {
    const list: any = document.getElementById('menu_list');
    list.classList.toggle('open');
    event.currentTarget.classList.toggle('active');
  };

  return (
    <React.Fragment>
      <div id='map' />
    </React.Fragment>
  );
};

export default NaverMap;
