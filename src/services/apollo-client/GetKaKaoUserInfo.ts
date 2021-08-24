import { gql } from '@apollo/client';

export const GET_KAKAO_USER_BY_JWT = gql`
  mutation GET_KAKAO_USER_BY_JWT($jwt: String!) {
    getKakaoUserByJwt(jwt: $jwt) {
      id
      name
      email
      point
    }
  }
`;

export const GET_KAKAO_USER = gql`
  mutation {
    authUser {
      id
      name
      email
      point
    }
  }
`;
