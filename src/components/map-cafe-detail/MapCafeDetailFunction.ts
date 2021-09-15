import { cafeDetailHeightVar } from 'services/apollo-client/LocalState';

export const onAdjustHeightButtonClick = (event: any) => {
  const cafeDetailHeight = cafeDetailHeightVar();
  cafeDetailHeightVar(cafeDetailHeight === 'down' ? 'up' : 'down');
};
