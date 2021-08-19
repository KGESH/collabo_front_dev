import { position } from 'components/naver-map/NaverMap';
import { cafeList } from 'components/naver-map/CafeList';
import { mapProps } from 'components/naver-map/CafeList';
import { makeVar } from '@apollo/client';
import 'components/naver-map/style/NaverMap.css';
import { useReactiveVar } from '@apollo/client';
import {
  mapVar,
  currentMarkerVar,
  currentPositionVar,
} from 'components/naver-map/LocalState';
import img from 'resources/images/currentPosition/currentPosition.png';

const initMap = () => {
  /**
   * 지도 생성
   * 현재 위치 받아서 가운데 놓기
   * 전역 변수에 저장
   */

  const currentPosition = currentPositionVar();

  const map = new naver.maps.Map('map', {
    useStyleMap: true,
    center: new naver.maps.LatLng(
      currentPosition.latitude,
      currentPosition.longitude,
    ), //지도의 초기 중심 좌표
    zoom: 19, //지도의 초기 줌 레벨
    disableKineticPan: false,
  });

  /**
   * 현재 위치로 지도를 옮기는 버튼 생성
   */
  const locationBtnHtml =
    '<a href="#" class="btn_mylct" style="pointer-events: auto;"><img class="currentImg" src="currentPosition.png" alt="현재위치"/></span></a>';

  naver.maps.Event.once(map, 'init_stylemap', () => {
    //customControl 객체 이용하기
    const customControl = new naver.maps.CustomControl(locationBtnHtml, {
      position: naver.maps.Position.RIGHT_CENTER,
    });
    customControl.setMap(map);
    const domEventListener = naver.maps.Event.addDOMListener(
      customControl.getElement(),
      'click',
      () => {
        const map = mapVar();
        const currentPosition = currentPositionVar();
        if (map) {
          map.setCenter(
            new naver.maps.LatLng(
              currentPosition.latitude,
              currentPosition.longitude,
            ),
          );
        }
      },
    );
  });

  /**
   * 현재 위치에 대한 표시
   * 전역 변수에 저장
   */
  const currentMarker = new naver.maps.Marker({
    position: new naver.maps.LatLng(
      currentPosition.latitude,
      currentPosition.longitude,
    ),
    map: map,
  });

  /**
   * cafeList를 받아와 지도에 표시
   */
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

    let distance: number = 0;
    if (
      currentLatitude !== cafeLatitude ||
      currentLongitude !== cafeLongitude
    ) {
      const radlat1 = (Math.PI * currentLatitude) / 180;
      const radlat2 = (Math.PI * cafeLatitude) / 180;
      const theta = currentLongitude - cafeLongitude;
      const radtheta = (Math.PI * theta) / 180;
      distance =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (distance > 1) {
        distance = 1;
      }
      distance = Math.acos(distance);
      distance = (distance * 180) / Math.PI;
      distance = distance * 60 * 1.1515;
      distance = distance * 1.609344;
    }

    const kakaoScheme: string = `kakaomap://route?sp=${currentLatitude},${currentLongitude}&ep=${cafeLatitude},${cafeLongitude}&by=CAR`;
    const distaceString: string = distance.toFixed(2);

    cafeMarkers.push(
      new naver.maps.Marker({
        position: cafe.mapPos,
        map: map,
      }),
    );

    const contentString = [
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

    /**
     * 카페 위치 표시
     */

    const i = cafeMarkers.length - 1;
    naver.maps.Event.addListener(cafeMarkers[i], 'click', () => {
      const marker: naver.maps.Marker = cafeMarkers[i],
        infoWindow: naver.maps.InfoWindow = cafeInfomations[i];
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker);
      }
    });
    return 0;
  });

  /**
   * 현재 위치 표시
   */

  naver.maps.Event.addListener(map, 'mousedown', (e) => {
    console.log('Coord: ' + e.coord.toString());
    console.log(e.coord._lat, e.coord._lng);
    console.log(e);
    cafeMarkers.push(
      new naver.maps.Marker({
        position: new naver.maps.LatLng(e.coord._lat, e.coord._lng),
        map: map,
      }),
    );
  });

  /**
   * map, currentMarker 전역변수 저장
   */
  mapVar(map);
  currentMarkerVar(currentMarker);
};

export default initMap;
