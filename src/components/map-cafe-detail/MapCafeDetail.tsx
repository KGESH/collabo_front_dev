import React, { useEffect, useState } from 'react';
import 'components/map-cafe-detail/style/MapCafeDetail.css';
import { ICafeInfo } from 'types/Map';
import { IHashTag } from 'types/HashTag';
import {
  mapVar,
  currentMarkerVar,
  currentPositionVar,
  clickedCafeDetailVar,
  cafeDetailHeightVar,
  kakaoSchemeVar,
} from 'services/apollo-client/LocalState';
import { useReactiveVar } from '@apollo/client';
import cafeImg from 'resources/images/bacs_cafe_img.png';
import { onAdjustHeightButtonClick } from 'components/map-cafe-detail/MapCafeDetailFunction';

const MapCafeDetail = () => {
  const clickedCafeDetail = useReactiveVar(clickedCafeDetailVar);
  const cafeDetailHeight = useReactiveVar(cafeDetailHeightVar);
  const kakaoScheme = useReactiveVar(kakaoSchemeVar);

  useEffect(() => {
    console.log(cafeDetailHeight);
  }, [cafeDetailHeight]);

  return (
    <>
      <div className='map_cafe_detail_container'>
        <div className='container__adjust_height_box'>
          <div
            className='adjust_height_box__bar'
            onClick={onAdjustHeightButtonClick}
          ></div>
        </div>
        <div className='container__cafe_info_box'>
          <img
            className='cafe_info_box__cafe_img'
            src={cafeImg}
            alt='cafe Img'
          />

          {/**구분 */}
          {/**이름, 주소, 거리, 평점, 게시물, 방문횟수, 전화번호, 카카오스키마, 원두 */}
          <div className='cafe_info_box__cafe_info'>
            <div className='cafe_info__datas'>
              <div className='datas__name'>{clickedCafeDetail?.name}</div>
              <div className='datas__sub_datas'>
                {clickedCafeDetail?.address}
              </div>
              <div className='datas__sub_datas'>
                {clickedCafeDetail?.distance + 'km'}
              </div>
              <div className='datas__sub_datas'>{clickedCafeDetail?.beans}</div>
              <div className='datas__sub_datas'>{clickedCafeDetail?.phone}</div>
              <div className='datas__sub_datas'>
                <a href={kakaoScheme}>카카오맵</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapCafeDetail;
