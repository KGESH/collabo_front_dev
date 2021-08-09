import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { useQuery, useMutation } from '@apollo/react-hooks';

const KAKAO_LOGIN_MUTATION = gql`
  mutation KakaoLoginMutation($kakaoAuthCode: String) {
    getKakaoToken(kakaoAuthCode: $kakaoAuthCode) {
      access_token
    }
  }
`;

export const KakaoLoginMutation = (code: string) => {
  const [getKakaoToken, { data, loading, error }] =
    useMutation(KAKAO_LOGIN_MUTATION);

  getKakaoToken({ variables: { kakaoAuthCode: code } });
};
