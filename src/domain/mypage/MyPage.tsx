import React, { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import 'domain/mypage/style/MyPage.css';
import Navbar from 'components/navbar/Navbar';
import QRCode from 'qrcode.react';
import Header from 'components/header/Header';
import { useReactiveVar } from '@apollo/client';
import { currentUserVar, currentJwtVar } from 'services/apollo-client/LocalState';
import { GCP_IP } from 'services/apollo-client/apollo';

const GET_USER = gql`
  mutation GET_KAKAO_USER_BY_JWT($jwt: String!) {
    getKakaoUserByJwt(jwt: $jwt) {
      user {
        cafe_list {
          cafe_name
          code
          card_img
        }
      }
      jwt
    }
  }
`;

const MyPage = () => {
  const user = useReactiveVar(currentUserVar);
  const jwt = useReactiveVar(currentJwtVar);
  console.log(user);
  console.log(jwt);
  const [getUser, { loading, data, error }] = useMutation(GET_USER);
  const cardClick = (index: number) => {
    document.getElementsByClassName('my_qr_box')[index].classList.toggle('hidden');
  };

  useEffect(() => {
    if (jwt) {
      getUser({ variables: { jwt } });
    }
  }, [jwt]);

  return (
    <>
      <div className='my_group'>
        <Header menu={true} />
        <div>
          <div className='my_point_group'>
            <em>
              <strong id='point_value'>{user?.point}</strong>
            </em>
          </div>
        </div>
        <div className='my_wallet_group'>
          <div className='my_wallet_inner'>
            {data?.getKakaoUserByJwt?.user?.cafe_list?.map((w: any, index: number) => (
              <div className='my_wallet__card' onClick={() => cardClick(index)}>
                <img src={w.card_img} alt='' />
                <div className='my_qr_box hidden'>
                  <div className='my_qr_code'>
                    {/* user정보에 있는 '카페이름'과 해당 카페의 'Code'를 가져와서 아래 링크로 가는 QR코드를 생성한다. */}
                    <QRCode
                      value={`${GCP_IP}:3000/qrcheck/${w.cafe_name}/${w.code}`}
                      size={100}
                      level={'L'}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default MyPage;
