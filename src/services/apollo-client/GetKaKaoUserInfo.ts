import { gql } from '@apollo/client';

export const GET_KAKAO_USER_BY_JWT = gql`
  mutation GET_KAKAO_USER_BY_JWT($jwt: String!) {
    getKakaoUserByJwt(jwt: $jwt) {
      user {
        id
        name
        nickname
        email
        point
        profile_img
      }
      jwt
    }
  }
`;

export const GET_KAKAO_USER = gql`
  mutation {
    authUser {
      user {
        id
        name
        nickname
        email
        point
        profile_img
      }
      jwt
    }
  }
`;
