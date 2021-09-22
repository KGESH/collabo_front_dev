import {
  mapVar,
  cafeDetailHeightVar,
  clickedCafeDetailVar,
} from 'services/apollo-client/LocalState';

export const onAdjustHeightButtonClick = (event: any) => {
  const cafeDetailHeight = cafeDetailHeightVar();
  cafeDetailHeightVar(cafeDetailHeight === 'down' ? 'up' : 'down');
};

export const onDetailImgClick = () => {
  const map = mapVar();
  const clickedCafeDetail = clickedCafeDetailVar();
  if (map && clickedCafeDetail) {
    map.setCenter(
      new naver.maps.LatLng(
        +clickedCafeDetail.latitude,
        +clickedCafeDetail.longitude,
      ),
    );
  }
};
