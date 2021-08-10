import React, { useEffect, useState } from 'react';
import 'components/naver-map/style/NaverMap.css';
import { cafeList } from 'components/naver-map/CafeList';
import type { mapProps } from 'components/naver-map/CafeList';

type position = {
  latitude: number;
  longitude: number;
  isMap: boolean;
};

const NaverMap = () => {
  const [currentPosition, setCurrentPosition] = useState<position>({
    latitude: 0,
    longitude: 0,
    isMap: false,
  });

  useEffect(() => {
    const initMap = () => {
      if (currentPosition.latitude === 0) return;
      if (currentPosition.isMap === false) {
        currentPosition.isMap = true;
        const map = new naver.maps.Map('map', {
          center: new naver.maps.LatLng(
            currentPosition.latitude,
            currentPosition.longitude,
          ), //지도의 초기 중심 좌표
          zoom: 19, //지도의 초기 줌 레벨
          minZoom: 10, //지도의 최소 줌 레벨
          maxZoom: 21,
          zoomControl: true, //줌 컨트롤의 표시 여부
          zoomControlOptions: {
            //줌 컨트롤의 옵션
            position: naver.maps.Position.TOP_RIGHT,
          },
          disableKineticPan: false,
        });
        const currentMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            currentPosition.latitude,
            currentPosition.longitude,
          ),
          map: map,
        });
        const cafeMarkers: naver.maps.Marker[] = [];
        const cafeInfomations: naver.maps.InfoWindow[] = [];
        cafeList.map((cafe: mapProps) => {
          /*
          현재 위치 & 카페 위치를 기반으로 한 작업
          1. 거리 구하기 (경도, 위도 좌표값을 통한 계산)
          2. 경로 구하기 (카카오맵 앱 URL SCHEME)
          */
          const currentLatitude: number = +currentPosition.latitude;
          const currentLongitude: number = +currentPosition.longitude;
          const cafeLatitude: number = +cafe.latitude;
          const cafeLongitude: number = +cafe.longitude;

          var distance: number = 0;
          if (
            currentLatitude !== cafeLatitude ||
            currentLongitude !== cafeLongitude
          ) {
            var radlat1 = (Math.PI * currentLatitude) / 180;
            var radlat2 = (Math.PI * cafeLatitude) / 180;
            var theta = currentLongitude - cafeLongitude;
            var radtheta = (Math.PI * theta) / 180;
            var distance =
              Math.sin(radlat1) * Math.sin(radlat2) +
              Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (distance > 1) {
              distance= 1;
            }
            distance= Math.acos(distance);
            distance= (distance* 180) / Math.PI;
            distance= distance* 60 * 1.1515;
            distance= distance* 1.609344;
          }

          const kakaoScheme: string = `kakaomap://route?sp=${currentLatitude},${currentLongitude}&ep=${cafeLatitude},${cafeLongitude}&by=CAR`;
          const distaceString: string = distance.toFixed(2);


          cafeMarkers.push(
            new naver.maps.Marker({
              position: cafe.mapPos,
              map: map,
            }),
          );

          var contentString = [
            '<div class="iw_inner">',
            '   <h3>' + cafe.name + '</h3>',
            '   <p>거리 : ' + distaceString + 'km<br />',
            '       <a href=' + kakaoScheme + ' target="_blank">카카오맵</a>',
            '   </p>',
            '</div>',
          ].join('');
          cafeInfomations.push(
            new naver.maps.InfoWindow({
              content: contentString,
              borderWidth: 5,
            }),
          );

          const i = cafeMarkers.length - 1;
          naver.maps.Event.addListener(cafeMarkers[i], 'click', () => {
            var marker: naver.maps.Marker = cafeMarkers[i],
              infoWindow: naver.maps.InfoWindow = cafeInfomations[i];
            if (infoWindow.getMap()) {
              infoWindow.close();
            } else {
              infoWindow.open(map, marker);
            }
          });
          return 0;
        });
        currentMarker.setOptions({
          position: new naver.maps.LatLng(
            currentPosition.latitude,
            currentPosition.longitude,
          ),
        });
      }
    };
    initMap();
  });

  var options = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0,
  };

  navigator.geolocation.getCurrentPosition(
    (position: GeolocationPosition) => {
      setCurrentPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        isMap: currentPosition.isMap,
      });
      console.log(
        `${currentPosition.latitude},${currentPosition.longitude},${currentPosition.isMap}`,
      );
    },
    (error: GeolocationPositionError) => {
      console.error(error.message);
    },
    options,
  );

  return (
    <>
      <React.Fragment>
        <div id='map'></div>
      </React.Fragment>
    </>
  );
};

export default NaverMap;
