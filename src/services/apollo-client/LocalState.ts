import { makeVar } from '@apollo/client';
import { IUser } from 'types/User';

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
