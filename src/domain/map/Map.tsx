import React from 'react';
import type { HomeProps } from 'types/Props';
import 'domain/map/style/Map.css';
import NaverMap from 'components/naver-map/NaverMap';

const Map = () => (
  <div className='map'>
    <div className='map__container'>
      <NaverMap />
    </div>
  </div>
);

export default Map;
