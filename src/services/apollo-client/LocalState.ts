import { makeVar } from '@apollo/client';
import { IUser } from 'types/User';
import { IPosition } from 'components/naver-map/MapInterface';
import { ICafeInfo } from 'components/naver-map/MapInterface';

/**
 * 이곳에서 전역 상태를 관리
 * Apollo Client - Reactive Variables 참조
 * (21-8-16:지성현)
 */
export const currentUserVar = makeVar<IUser | null>(null);
export const currentJwtVar = makeVar<String | null>(
  localStorage.getItem('jwt'),
);
export const isLoggedInVar = makeVar<boolean>(false);
export const isInitVar = makeVar<boolean>(false);

/**
 * 지도 관련 전역 상태
 *
 */
export const clickedHashTagVar = makeVar<string>('팔로우');
export const mapVar = makeVar<naver.maps.Map | null>(null);
export const currentMarkerVar = makeVar<naver.maps.Marker | null>(null);
export const currentPositionVar = makeVar<IPosition>({
  latitude: 0,
  longitude: 0,
});
export const cafeInfoVar = makeVar<ICafeInfo[]>([]);

/**
 * 리뷰 작성 상태
 */
export const reviewContentVar = makeVar<string>('');
export const hashTagListVar = makeVar<string[]>([]);
export const uploadImgBase64Var = makeVar<string>('');
export const uploadImgVar = makeVar<File | null>(null);
