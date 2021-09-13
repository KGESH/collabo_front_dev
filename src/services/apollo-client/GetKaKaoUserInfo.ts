import { gql } from '@apollo/client';

export const GET_KAKAO_USER_BY_JWT = gql`
<<<<<<< HEAD
  mutation GET_KAKAO_USER_BY_JWT($jwt: String!) {
=======
  query GET_KAKAO_USER_BY_JWT($jwt: String!) {
>>>>>>> main
    getKakaoUserByJwt(jwt: $jwt) {
      id
      name
      email
      point
<<<<<<< HEAD
      profile_img
=======
>>>>>>> main
    }
  }
`;

export const GET_KAKAO_USER = gql`
<<<<<<< HEAD
  mutation {
=======
  query {
>>>>>>> main
    authUser {
      id
      name
      email
      point
<<<<<<< HEAD
      profile_img
=======
>>>>>>> main
    }
  }
`;
