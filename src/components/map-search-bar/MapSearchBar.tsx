import React, { useState } from 'react';
import 'components/map-search-bar/style/MapSearchBar.css';
import SearchBarMenuImg from 'resources/images/searchBarImg.png';
import SearchBarBackImg from 'resources/images/back_arrow.png';
import { cafeInfoVar } from 'services/apollo-client/LocalState';
import { useReactiveVar } from '@apollo/client';
import { ICafeInfo } from 'components/naver-map/MapInterface';

const MapSearchBar = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchBoardExist, setSearchBoardExist] = useState<boolean>(false);
  const cafeInfo = useReactiveVar(cafeInfoVar);

  const onSearchBarSubmit = (event: any) => {
    event.preventDefault();
    if (searchInput) {
      setSearchBoardExist(true);
    }
  };

  const onSearchBarImgClick = () => {
    if (searchBoardExist) {
      setSearchBoardExist(false);
    } else {
    }
  };

  const onSearchBarInputChange = (event: any) => {
    setSearchInput(event.target.value);
    if (event.target.value) {
      setSearchBoardExist(true);
    }
  };

  const onSearchBarInputClick = () => {
    setSearchBoardExist(true);
  };

  const onSearchBarDeleteButtonClick = () => {
    setSearchInput('');
    //setSearchBoardExist(false);
  };

  const onSearchBarSearchButtonClick = () => {
    if (searchBoardExist) {
    } else {
    }
  };

  return (
    <>
      {searchBoardExist ? (
        <div className='header__search_board'>
          <div className='search_board__search_list'>123</div>
        </div>
      ) : null}
      <form className='header__search_bar' onSubmit={onSearchBarSubmit}>
        <img
          className={
            searchBoardExist ? 'search_bar__img return' : 'search_bar__img menu'
          }
          src={searchBoardExist ? SearchBarBackImg : SearchBarMenuImg}
          alt='검색'
          onClick={onSearchBarImgClick}
        />
        <input
          className='search_bar__input'
          type='search'
          placeholder='바닐라가 땡기는 오늘, 검색!'
          role='combobox'
          aria-expanded='true'
          onChange={onSearchBarInputChange}
          onClick={onSearchBarInputClick}
          value={searchInput}
        />
        <div className='search_bar__buttons'>
          {searchInput ? (
            <button
              className='search_bar__button delete_button'
              type='button'
              onClick={onSearchBarDeleteButtonClick}
            >
              <img
                src='//yaimg.yanolja.com/joy/sunny/static/images/btn-etc-close.svg'
                alt='지우기'
              />
            </button>
          ) : null}
          <button
            className='search_bar__button search_button'
            type='submit'
            onClick={onSearchBarSearchButtonClick}
          >
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
