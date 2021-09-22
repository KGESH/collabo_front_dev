import React, { useState } from 'react';
import 'components/map-search-bar/style/MapSearchBar.css';
import SearchBarMenuImg from 'resources/images/searchBarImg.png';
import SearchBarBackImg from 'resources/images/back_arrow.png';
import {
  cafeInfoVar,
  cafeDetailHeightVar,
  isCafeDetailExistVar,
  clickedCafeDetailVar,
} from 'services/apollo-client/LocalState';
import { useReactiveVar } from '@apollo/client';
import { ICafeInfo } from 'types/Map';
import { mapVar } from 'services/apollo-client/LocalState';
import { useEffect } from 'react';
import { createFuzzyMatcher } from 'components/auto-complete-search/CreateFuzzyMatcher';

const MapSearchBar = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchBoardExist, setSearchBoardExist] = useState<boolean>(false);
  const cafeInfo = useReactiveVar(cafeInfoVar);
  const [searchResultList, setSearchResultList] = useState<ICafeInfo[]>([]);
  const [cafeInfoSortByDistance, setCafeInfoSortByDistance] = useState<
    ICafeInfo[]
  >([]);
  const [cafeInfoSortByname, setCafeInfoSortByname] = useState<ICafeInfo[]>([]);
  const [sortType, setSortType] = useState('distance');

  const compareByDistance = (a: ICafeInfo, b: ICafeInfo) => {
    return a.distance > b.distance ? 1 : b.distance > a.distance ? -1 : 0;
  };

  const compareByName = (a: ICafeInfo, b: ICafeInfo) => {
    return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
  };

  useEffect(() => {
    const cafeInfoDistance: ICafeInfo[] = [...cafeInfo];
    const cafeInfoName: ICafeInfo[] = [...cafeInfo];
    setSearchResultList(cafeInfoDistance.sort(compareByDistance));
    setCafeInfoSortByDistance(cafeInfoDistance.sort(compareByDistance));
    setCafeInfoSortByname(cafeInfoName.sort(compareByName));
  }, [cafeInfo]);

  useEffect(() => {
    const regex = createFuzzyMatcher(searchInput);
    const regexMinusOne = createFuzzyMatcher(
      searchInput.trim().substr(0, searchInput.length - 1),
    );
    const regexRemoveSpace = createFuzzyMatcher(searchInput.trim());
    setSearchResultList(
      (sortType === 'distance'
        ? cafeInfoSortByDistance
        : cafeInfoSortByname
      ).filter(
        (cafe: ICafeInfo, index: number) =>
          regex.test(cafe.name.toLowerCase()) ||
          regexMinusOne.test(cafe.name.toLowerCase()) ||
          regexRemoveSpace.test(cafe.name.toLowerCase()),
      ),
    );
  }, [sortType]);

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

  const onSearchBarInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value: string = event.target.value;
    setSearchInput(value);
    const regex = createFuzzyMatcher(value);
    const regexMinusOne = createFuzzyMatcher(
      value.trim().substr(0, value.trim().length - 1),
    );
    const regexRemoveSpace = createFuzzyMatcher(value.trim());
    setSearchResultList(
      (sortType === 'distance'
        ? cafeInfoSortByDistance
        : cafeInfoSortByname
      ).filter(
        (cafe: ICafeInfo, index: number) =>
          regex.test(cafe.name.toLowerCase()) ||
          regexMinusOne.test(cafe.name.toLowerCase()) ||
          regexRemoveSpace.test(cafe.name.toLowerCase()),
      ),
    );
    console.log(searchResultList);
  };

  const onSearchBarInputClick = () => {
    setSearchBoardExist(true);
  };

  const onSearchBarDeleteButtonClick = () => {
    setSearchInput('');
    setSearchResultList(
      sortType === 'distance' ? cafeInfoSortByDistance : cafeInfoSortByname,
    );
    //setSearchBoardExist(false);
  };

  const onSearchBarSearchButtonClick = () => {
    if (searchBoardExist) {
    } else {
      setSearchBoardExist(true);
    }
  };

  const onSearchListClick = (event: any) => {
    const cafeId: number = +event.currentTarget.id;
    console.log(cafeId);
    const target: ICafeInfo | undefined = searchResultList?.find(
      (cafe: ICafeInfo) => {
        if (cafe.id === cafeId) {
          return true;
        }
      },
    );
    if (target) {
      console.log(target);
      setSearchBoardExist(false);
      const map = mapVar();
      if (map) {
        map.setCenter(target.mapPos);
        map.setZoom(19);
      }
      cafeDetailHeightVar('down');
      isCafeDetailExistVar(true);
      clickedCafeDetailVar(target);
    }
  };

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
                  setSortType(event.target.id);
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
                  setSortType(event.target.id);
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
                    <div className='cafe_info__cafe_distance'>
                      {cafe.distance + 'km'}
                    </div>
                    <div className='cafe_info__cafe__address'>
                      {cafe.address}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
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
