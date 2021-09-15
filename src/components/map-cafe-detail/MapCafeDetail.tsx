import React, { useEffect } from 'react';
import 'components/map-cafe-detail/style/MapCafeDetail.css';
import { ICafeInfo } from 'types/Map';
import { IHashTag } from 'types/HashTag';
import {
  mapVar,
  currentMarkerVar,
  currentPositionVar,
  cafeInfoVar,
  clickedHashTagVar,
  clickedCafeDetailVar,
  isCafeDetailExistVar,
} from 'services/apollo-client/LocalState';
import { useReactiveVar } from '@apollo/client';

const MapCafeDetail = () => {
  const clickedCafeDetail = useReactiveVar(clickedCafeDetailVar);
  console.log(123);
  return (
    <>
      <div className='map_cafe_detail'>
        {clickedCafeDetail?.name}
        <br />
        {clickedCafeDetail?.distance}
        <br />
        {clickedCafeDetail?.id}
        <br />
      </div>
    </>
  );
};

export default MapCafeDetail;
