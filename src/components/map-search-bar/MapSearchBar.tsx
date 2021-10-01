import React, { useState } from 'react';
import 'components/map-search-bar/style/MapSearchBar.css';
import SearchBarMenuImg from 'resources/images/searchBarImg.png';
import SearchBarBackImg from 'resources/images/back_arrow.png';
import {
  mapVar,
  cafeInfoVar,
  searchInputVar,
  searchBoardExistVar,
  searchResultListVar,
  cafeInfoSortByDistanceVar,
  cafeInfoSortByNameVar,
  sortTypeVar,
  mapMenuExistVar,
} from 'services/apollo-client/LocalState';
import {
  compareByDistance,
  compareByName,
  onSearchBarSubmit,
  onSearchBarImgClick,
  onSearchBarInputChange,
  onSearchBarInputClick,
  onSearchBarDeleteButtonClick,
  onSearchBarSearchButtonClick,
  onSearchListClick,
  onMenuSpaceClick,
} from 'components/map-search-bar/MapSearchBarFunction';
import { useReactiveVar } from '@apollo/client';
import { ICafeInfo } from 'types/Map';
import { useEffect } from 'react';
import { createFuzzyMatcher } from 'components/auto-complete-search/CreateFuzzyMatcher';

const MapSearchBar = () => {
  const cafeInfo = useReactiveVar(cafeInfoVar);
  const searchInput = useReactiveVar(searchInputVar);
  const searchBoardExist = useReactiveVar(searchBoardExistVar);
  const searchResultList = useReactiveVar(searchResultListVar);
  const cafeInfoSortByDistance = useReactiveVar(cafeInfoSortByDistanceVar);
  const cafeInfoSortByName = useReactiveVar(cafeInfoSortByNameVar);
  const sortType = useReactiveVar(sortTypeVar);
  const mapMenuExist = useReactiveVar(mapMenuExistVar);

  useEffect(() => {
    const cafeInfoDistance: ICafeInfo[] = [...cafeInfo].sort(compareByDistance);
    const cafeInfoName: ICafeInfo[] = [...cafeInfo].sort(compareByName);
    searchResultListVar(sortType === 'distance' ? cafeInfoDistance : cafeInfoName);
    cafeInfoSortByDistanceVar(cafeInfoDistance);
    cafeInfoSortByNameVar(cafeInfoName);
  }, [cafeInfo]);

  useEffect(() => {
    const regex = createFuzzyMatcher(searchInput);
    const regexMinusOne = createFuzzyMatcher(searchInput.trim().substr(0, searchInput.length - 1));
    const regexRemoveSpace = createFuzzyMatcher(searchInput.trim());
    searchResultListVar(
      (sortType === 'distance' ? cafeInfoSortByDistance : cafeInfoSortByName).filter(
        (cafe: ICafeInfo, index: number) =>
          regex.test(cafe.name.toLowerCase()) ||
          regexMinusOne.test(cafe.name.toLowerCase()) ||
          regexRemoveSpace.test(cafe.name.toLowerCase()),
      ),
    );
  }, [sortType]);

  useEffect(() => {
    const mapMenu: HTMLElement | null = document.getElementById('header__map_menu');
    const mapMenuContainer: HTMLElement | null = document.getElementById('map_menu__container');
    if (mapMenu && mapMenuContainer && mapMenuExist) {
      mapMenu.style.animation = 'fadein 0.3s';
      mapMenu.style.width = '100vw';
      mapMenuContainer.style.width = '60vw';
    } else if (mapMenu && mapMenuContainer && !mapMenuExist) {
      mapMenu.style.animation = 'fadeout 0.3s';
      mapMenu.style.width = '0vw';
      mapMenuContainer.style.width = '0vw';
    }
  }, [mapMenuExist]);

  return (
    <>
      {searchBoardExist ? (
        <div className='header__search_board'>
          <div className='search_board__sort_type'>
            <div className='sort_type__buttons'>
              <label
                htmlFor='distance'
                id='distance'
                onClick={(event: any) => {
                  sortTypeVar(event.target.id);
                  console.log(sortType);
                }}
              >
                <div id='distance' className='sort_list__border'>
                  {'거리순'}
                </div>
              </label>
              <label
                htmlFor='name'
                id='name'
                onClick={(event: any) => {
                  sortTypeVar(event.target.id);
                  console.log(sortType);
                }}
              >
                <div id='name' className='sort_list__border'>
                  {'이름순'}
                </div>
              </label>
            </div>
          </div>
          <div className='search_board__division_line'></div>
          <div className='search_board__search_list'>
            <ul className='search_list__container'>
              {searchResultList.map((cafe: ICafeInfo, index: number) => {
                return (
                  <li
                    key={index}
                    className='search_list__cafe_info'
                    id={cafe.id.toString()}
                    onClick={onSearchListClick}
                  >
                    <div className='cafe_info__cafe_name'>{cafe.name}</div>
                    <div className='cafe_info__cafe_distance'>{cafe.distance + 'km'}</div>
                    <div className='cafe_info__cafe__address'>{cafe.address}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
      <div id='header__map_menu' onClick={onMenuSpaceClick}>
        <div id='map_menu__container'>
          {mapMenuExist ? (
            <>
              <div className='container__user_info'></div>
              <div className='container__menu'></div>
            </>
          ) : null}
        </div>
      </div>
      <form className='header__search_bar' onSubmit={onSearchBarSubmit}>
        <img
          className={searchBoardExist ? 'search_bar__img return' : 'search_bar__img menu'}
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
