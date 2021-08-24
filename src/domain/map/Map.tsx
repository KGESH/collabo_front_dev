import React from 'react';
import 'domain/map/style/Map.css';
import NaverMap from 'components/naver-map/NaverMap';
import MapSearchBar from 'components/map-search-bar/MapSearchBar';
import Navbar from 'components/navbar/Navbar';
import MapHashTag from 'components/map-hash-tag/MapHashTag';

const Map = () => {
  return (
    <React.Fragment>
      <header className='map__header'>
        <MapSearchBar/>
        <MapHashTag/>
      </header>
      <section className='map__section'>
        <NaverMap />
      </section>
      <footer className='map__footer'>
        <Navbar />
      </footer>
    </React.Fragment>
  );
};

export default Map;
