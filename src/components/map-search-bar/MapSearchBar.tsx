import React, { useState } from 'react';
import 'components/map-search-bar/style/MapSearchBar.css';
import SearchBarImg from 'resources/images/searchBarImg.png';

const MapSearchBar = () => {
  const [searchInput, setSearchInput] = useState<string>('');

  return (
    <>
      <form
        className='header__search_bar'
        onSubmit={(event: any) => {
          event.preventDefault();
        }}
      >
        <img className='search_bar__img' src={SearchBarImg} alt='검색' />
        <input
          className='search_bar__input'
          type='search'
          placeholder='바닐라가 땡기는 오늘, 검색!'
          role='combobox'
          aria-expanded='true'
          onChange={(event: any) => {
            setSearchInput(event.target.value);
          }}
          value={searchInput}
        />
        <div className='search_bar__buttons'>
          {searchInput ? (
            <button
              className='search_bar__btn'
              type='button'
              onClick={() => {
                setSearchInput('');
              }}
            >
              <img
                src='//yaimg.yanolja.com/joy/sunny/static/images/btn-etc-close.svg'
                alt='지우기'
              />
            </button>
          ) : null}
          <button className='search_bar__btn' type='submit'>
            <img
              src='//yaimg.yanolja.com/joy/sunny/static/images/icon-search-black-line-2.svg'
              alt='검색'
            />
          </button>
        </div>
      </form>
    </>
  );
};

export default MapSearchBar;
