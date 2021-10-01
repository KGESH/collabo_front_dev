import React, { useEffect, useState } from 'react';
import 'components/map-cafe-detail/style/MapCafeDetail.css';
import { ICafeInfo } from 'types/Map';
import { IHashTag } from 'types/HashTag';
import {
  mapVar,
  currentMarkerVar,
  clickedCafeDetailVar,
  cafeDetailHeightVar,
  kakaoSchemeVar,
} from 'services/apollo-client/LocalState';
import { useReactiveVar } from '@apollo/client';
import cafeImg from 'resources/images/bacs_cafe_img.png';
import {
  onAdjustHeightButtonClick,
  onDetailImgClick,
} from 'components/map-cafe-detail/MapCafeDetailFunction';

const MapCafeDetail = () => {
  const clickedCafeDetail = useReactiveVar(clickedCafeDetailVar);
  const cafeDetailHeight = useReactiveVar(cafeDetailHeightVar);
  const kakaoScheme = useReactiveVar(kakaoSchemeVar);

  useEffect(() => {
    console.log(cafeDetailHeight);
  }, [cafeDetailHeight]);

  useEffect(() => {
    const detailContainer: HTMLElement | null = document.getElementById(
      'map_cafe_detail_container',
    );
    if (detailContainer && cafeDetailHeight === 'down') {
      detailContainer.style.height = '20vh';
    } else if (detailContainer && cafeDetailHeight === 'up') {
      detailContainer.style.height = '40vh';
    }
  }, [cafeDetailHeight]);

  return (
    <>
      <div id='map_cafe_detail_container'>
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
            onClick={onDetailImgClick}
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
        {cafeDetailHeight === 'up' ? (
          <div className='de_vi__content_group1'>
            <div className='de_vi_first_block'>
              <div className='de_vi_first__check_img'>
                <img src='/detail/boll.svg' alt='' />
                <img src='/detail/check.svg' alt='' id='check' />
              </div>
              <div className='de_vi_first__data_group'>
                <div className='de_vi_first__branch'>
                  {clickedCafeDetail?.name}
                </div>
                <div className='de_vi_first__day_and_time'>
                  8.15 일 | 오후 3:00
                </div>
              </div>
            </div>
            <div className='de_vi_second_block'>
              <div className='de_vi_second__visit_times'>3번째 방문</div>
              <div className='de_vi_second__data_group'>
                <div className='de_vi_second__menu'>카라멜 마끼야또</div>
                <div className='de_vi_second__price'>1,500원</div>
              </div>
            </div>
            <div className='de_vi_third_block'>
              <div className='de_vi_third__flavour'>맛 5.6</div>
              <div className='de_vi_third__atmosphere'>분위기 7.2</div>
              <div className='de_vi_third__price'>가격 4.4</div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MapCafeDetail;
