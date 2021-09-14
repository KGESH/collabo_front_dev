import { ICafeInfo, IPosition } from 'types/Map';
import 'components/naver-map/style/NaverMap.css';
import {
  mapVar,
  currentMarkerVar,
  currentPositionVar,
  cafeInfoVar,
} from 'services/apollo-client/LocalState';
import { getDistance } from 'components/naver-map/MapFunctions';
import img from 'resources/images/currentPosition/currentPosition.png';

const initMap = () => {
  /**
   * 지도 생성
   * 현재 위치 받아서 가운데 놓기
   * 전역 변수에 저장
   */

  const cafeList: ICafeInfo[] = cafeInfoVar();

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
    icon: {
      url: './currentPositionIcon.png',
      size: new naver.maps.Size(40, 40),
      scaledSize: new naver.maps.Size(40, 40),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(12, 34),
    },
  });

  /**
   * cafeList를 받아와 지도에 표시
   */
  const cafeMarkers: naver.maps.Marker[] = [];
  const cafeInfomations: naver.maps.InfoWindow[] = [];
  cafeList.map((cafe: ICafeInfo) => {
    /*
      현재 위치 & 카페 위치를 기반으로 한 작업
      1. 거리 구하기 (경도, 위도 좌표값을 통한 계산)
      2. 경로 구하기 (카카오맵 앱 URL SCHEME)
      */

    cafeMarkers.push(
      new naver.maps.Marker({
        position: cafe.mapPos,
        map: map,
        icon: {
          url: './cafeIcon.png',
          size: new naver.maps.Size(25, 25),
          scaledSize: new naver.maps.Size(25, 25),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(12, 34),
        },
      }),
    );

    const contentString = [
      '<div class="iw_inner">',
      '   <h3>' + cafe.name + '</h3>',
      '   <p>거리 : ' + cafe.distance.toString() + 'km<br />',
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
      const cafeInfo: ICafeInfo = cafe;
      const position: IPosition = currentPositionVar();
      const kakaoScheme: string = `kakaomap://route?sp=${position.latitude},${position.longitude}&ep=${cafeInfo.latitude},${cafeInfo.longitude}&by=CAR`;
      const now: Date = new Date();
      console.log(position.latitude, position.longitude);
      console.log(cafeInfo.latitude, cafeInfo.longitude, now);
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
   * 맵에서 클릭한 위치 표시
   */
  /*
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

  */

  /**
   * map, currentMarker 전역변수 저장
   */
  mapVar(map);
  currentMarkerVar(currentMarker);
};

export default initMap;
