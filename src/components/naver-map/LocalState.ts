import { makeVar } from '@apollo/client';
import { IPosition } from 'components/naver-map/MapInterface';
import { ICafeInfo } from 'components/naver-map/MapInterface';

export const mapVar = makeVar<naver.maps.Map | null>(null);
export const currentMarkerVar = makeVar<naver.maps.Marker | null>(null);
export const currentPositionVar = makeVar<IPosition>({
  latitude: 0,
  longitude: 0,
});
export const cafeInfoVar = makeVar<ICafeInfo[]>([]);