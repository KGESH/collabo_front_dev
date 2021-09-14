import React, { useEffect, useState } from 'react';
import Modal from 'components/modal-frame/Modal';
import { IModalFrameProps } from 'types/Props';
import { gql, useMutation, useReactiveVar } from '@apollo/client';
import { cafeListVar } from 'services/apollo-client/LocalState';
import { ICafeList } from 'types/Review';

export const GET_KAKAO_USER_BY_JWT = gql`
  mutation GET_KAKAO_USER_BY_JWT($jwt: String!) {
    getKakaoUserByJwt(jwt: $jwt) {
      user {
        cafe_list {
          cafe_name
          visit_times
          card_img
          code
        }
      }
    }
  }
`;

const VisitCafeModal = (props: IModalFrameProps) => {
  const { isOpen, handleClose } = props;
  const jwt = localStorage.getItem('jwt');
  const [getCafeList, { loading, data, error }] = useMutation(
    GET_KAKAO_USER_BY_JWT,
  );
  const cafeList = useReactiveVar(cafeListVar);

  if (error) {
    console.log(jwt);
    console.log(error);
  }

  useEffect(() => {
    if (!loading && data?.getKakaoUserByJwt?.user?.cafe_list) {
      //console.log(data?.getKakaoUserByJwt);
      console.log(data.getKakaoUserByJwt.user.cafe_list[0]);
      const res: ICafeList[] = data.getKakaoUserByJwt.user.cafe_list;
      cafeListVar([...cafeList, ...res.map((elemelt: ICafeList) => elemelt)]);
    }
  }, [loading, data]);

  useEffect(() => {
    if (isOpen) {
      getCafeList({ variables: { jwt } });
    } else {
      cafeListVar([]);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} header='방문 카페'>
      {cafeList.map((cafe: ICafeList) => (
        <>
          <div>{cafe.cafe_name}</div>
          <div>{cafe.visit_times}</div>
          <div>{cafe.card_img}</div>
          <div>등등 데이터들</div>
        </>
      ))}
    </Modal>
  );
};

export default VisitCafeModal;
