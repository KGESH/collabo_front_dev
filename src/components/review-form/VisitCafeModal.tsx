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
  const [getCafeList, { loading, data, error }] = useMutation(GET_KAKAO_USER_BY_JWT);
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
      cafeListVar([...cafeList, ...res.map((elemelt: ICafeList, index: number) => elemelt)]);
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
      <ul className=' flex flex-col overflow-y-scroll items-center '>
        {cafeList.map((cafe: ICafeList, index: number) => (
          <li key={index}>
            <div className='w-full h-auto border'>{cafe.cafe_name}</div>
            <div className='w-full h-auto'>{cafe.visit_times}</div>
            <div className='w-full h-auto'>{1} </div>
            <div className='w-full h-auto border'>{cafe.cafe_name}</div>
            <div className='w-full h-auto'>{cafe.visit_times}</div>
            <div className='w-full h-auto'>{2} </div>
            <div className='w-full h-auto border'>{cafe.cafe_name}</div>
            <div className='w-full h-auto'>{cafe.visit_times}</div>
            <div className='w-full h-auto'>{3} </div>
            <div className='w-full h-auto border'>{cafe.cafe_name}</div>
            <div className='w-full h-auto'>{cafe.visit_times}</div>
            <div className='w-full h-auto'>{4} </div>
            <div className='w-full h-auto border'>{cafe.cafe_name}</div>
            <div className='w-full h-auto'>{cafe.visit_times}</div>
            <div className='w-full h-auto'>{5} </div>
            <div className='w-full h-auto border'>{cafe.cafe_name}</div>
            <div className='w-full h-auto'>{cafe.visit_times}</div>
            <div className='w-full h-auto'>{6} </div>
            <div className='w-full h-auto border'>{cafe.cafe_name}</div>
            <div className='w-full h-auto'>{cafe.visit_times}</div>
            <div className='w-full h-auto'>{7} </div>
            <div className='w-full h-auto border'>{cafe.cafe_name}</div>
            <div className='w-full h-auto'>{cafe.visit_times}</div>
            <div className='w-full h-auto'>{8} </div>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default VisitCafeModal;
