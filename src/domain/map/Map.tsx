import React from 'react';
import 'domain/map/style/Map.css';
import NaverMap from 'components/naver-map/NaverMap';
import MapSearchBar from 'components/map-search-bar/MapSearchBar';
import Navbar from 'components/navbar/Navbar';
import MapHashTag from 'components/map-hash-tag/MapHashTag';
import MapCafeDetail from 'components/map-cafe-detail/MapCafeDetail';
import { isCafeDetailExistVar } from 'services/apollo-client/LocalState';
import { useReactiveVar } from '@apollo/client';

const Map = (props: any) => {
  const isCafeDetailExist = useReactiveVar(isCafeDetailExistVar);
  return (
    <div>
      <header className='map__header'>
        <MapSearchBar />
        <MapHashTag />
      </header>
      <section className='map__section'>
        <NaverMap props={props.match.params} />
        <MapCafeDetail />
      </section>
      <footer className='map__footer'>
        <Navbar />
      </footer>
    </div>
  );
};

export default Map;
