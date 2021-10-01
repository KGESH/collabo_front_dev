import {
  cafeDetailHeightVar,
  isCafeDetailExistVar,
  clickedCafeDetailVar,
  searchInputVar,
  searchBoardExistVar,
  searchResultListVar,
  cafeInfoSortByDistanceVar,
  cafeInfoSortByNameVar,
  sortTypeVar,
  mapMenuExistVar,
} from 'services/apollo-client/LocalState';
import { ICafeInfo } from 'types/Map';
import { mapVar } from 'services/apollo-client/LocalState';
import { createFuzzyMatcher } from 'components/auto-complete-search/CreateFuzzyMatcher';

const compareByDistance = (a: ICafeInfo, b: ICafeInfo) => {
  return a.distance > b.distance ? 1 : b.distance > a.distance ? -1 : 0;
};

const compareByName = (a: ICafeInfo, b: ICafeInfo) => {
  return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
};

const onSearchBarImgClick = () => {
  if (searchBoardExistVar()) {
    searchBoardExistVar(false);
  } else {
    mapMenuExistVar(true);
  }
};

const onSearchBarSubmit = (event: any) => {
  event.preventDefault();
  console.log(123, searchInputVar());
  if (searchInputVar() !== '') {
    searchBoardExistVar(true);
  }
};

const onSearchBarInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value: string = event.target.value;
  searchInputVar(value);
  const regex = createFuzzyMatcher(value);
  const regexMinusOne = createFuzzyMatcher(value.trim().substr(0, value.trim().length - 1));
  const regexRemoveSpace = createFuzzyMatcher(value.trim());
  searchResultListVar(
    (sortTypeVar() === 'distance' ? cafeInfoSortByDistanceVar() : cafeInfoSortByNameVar()).filter(
      (cafe: ICafeInfo, index: number) =>
        regex.test(cafe.name.toLowerCase()) ||
        regexMinusOne.test(cafe.name.toLowerCase()) ||
        regexRemoveSpace.test(cafe.name.toLowerCase()),
    ),
  );
  console.log(searchResultListVar());
};

const onSearchBarInputClick = () => {
  searchBoardExistVar(true);
};

const onSearchBarDeleteButtonClick = () => {
  searchInputVar('');
  searchResultListVar(
    sortTypeVar() === 'distance' ? cafeInfoSortByDistanceVar() : cafeInfoSortByNameVar(),
  );
  //setSearchBoardExist(false);
};

const onSearchBarSearchButtonClick = () => {
  if (searchBoardExistVar()) {
  } else {
    searchBoardExistVar(true);
  }
};

const onSearchListClick = (event: any) => {
  const cafeId: number = +event.currentTarget.id;
  console.log(cafeId);
  const target: ICafeInfo | undefined = searchResultListVar()?.find((cafe: ICafeInfo) => {
    if (cafe.id === cafeId) {
      return true;
    }
  });
  if (target) {
    console.log(target);
    searchBoardExistVar(false);
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

const onMenuSpaceClick = (event: any) => {
  mapMenuExistVar(event.target.id !== 'header__map_menu');
};

export {
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
};
