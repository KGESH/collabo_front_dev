import React, { useState } from 'react';
import 'components/map-search-bar/style/MapSearchBar.css';
import SearchBarMenuImg from 'resources/images/searchBarImg.png';
import SearchBarBackImg from 'resources/images/back_arrow.png';
import { cafeInfoVar } from 'services/apollo-client/LocalState';
import { useReactiveVar } from '@apollo/client';
import { ICafeInfo } from 'components/naver-map/MapInterface';
import { mapVar } from 'services/apollo-client/LocalState';
import { useEffect } from 'react';
import { createFuzzyMatcher } from 'components/map-search-bar/MapSearchFunction';

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
    if (!searchResultList.length) {
      const cafeInfoDistance: ICafeInfo[] = [...cafeInfo];
      const cafeInfoName: ICafeInfo[] = [...cafeInfo];
      setSearchResultList(cafeInfoDistance.sort(compareByDistance));
      setCafeInfoSortByDistance(cafeInfoDistance.sort(compareByDistance));
      setCafeInfoSortByname(cafeInfoName.sort(compareByName));
    }
  }, [cafeInfo]);

  useEffect(() => {
    const regex = createFuzzyMatcher(searchInput);
    setSearchResultList(
      (sortType === 'distance'
        ? cafeInfoSortByDistance
        : cafeInfoSortByname
      ).filter((cafe: ICafeInfo) => regex.test(cafe.name.toLowerCase())),
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

  const onSearchBarInputChange = (event: any) => {
    setSearchInput(event.target.value);
    if (event.target.value) {
      setSearchBoardExist(true);
    }
    const regex = createFuzzyMatcher(event.target.value);
    setSearchResultList(
      (sortType === 'distance'
        ? cafeInfoSortByDistance
        : cafeInfoSortByname
      ).filter((cafe: ICafeInfo) => regex.test(cafe.name.toLowerCase())),
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
    console.log(event.currentTarget.id);
    const cafeName: string = event.currentTarget.id;
    const target: ICafeInfo[] = searchResultList.filter(
      (cafe) => cafe.name === cafeName,
    );
    console.log(target);
    setSearchBoardExist(false);
    const map = mapVar();
    if (map) {
      map.setCenter(target[0].mapPos);
    }
  };

  return (
    <>
      {searchBoardExist ? (
        <div className='header__search_board'>
          <div className='search_board__sort_list'>
            <>
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
            </>
          </div>
          <div className='search_board__search_list'>
            <ul className='search_list__container'>
              {searchResultList.map((cafe: ICafeInfo) => {
                return (
                  <li
                    className='search_list__cafe_info'
                    id={cafe.name}
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
