import { makeVar } from '@apollo/client';
import { position } from 'components/naver-map/NaverMap';

export const mapVar = makeVar<naver.maps.Map | null>(null);
export const markerVar = makeVar<naver.maps.Marker | null>(null);
export const currentPositionVar = makeVar<position>({
  latitude: 0,
  longitude: 0,
});