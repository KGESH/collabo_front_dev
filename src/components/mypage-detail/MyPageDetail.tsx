import React from 'react';
import './style/MyPageDetail.css';
import VisitDetail from './DetailVisit';
import ReviewDetail from './DetailReview';
import BeansDetail from './DetailBeans';
import { SECTION } from 'domain/mypage/MyPage';
import { useReactiveVar } from '@apollo/client';
import { currentUserVar } from 'services/apollo-client/LocalState';

interface IMyPageProps {
  cafeName: string;
  section: SECTION;
  cafeCardUrl: string;
  subscribedMonth?: number;
  roasteryCardUrl?: string;
  children?: React.ReactNode[];
  changeSection: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export default ({ cafeName, cafeCardUrl, section, changeSection }: IMyPageProps) => {
  const user = useReactiveVar(currentUserVar);

  return (
    <>
      <div className='flex flex-col items-center'>
        <img src={cafeCardUrl} className='' />
        <p>{cafeName}</p>
        <div className='radio_group flex'>
          <input
            className='radio'
            type='radio'
            id='visit'
            name='radios'
            onClick={changeSection}
            checked={section === SECTION.VISIT}
          />
          <label htmlFor='visit'>
            <div>방문</div>
          </label>
          <input
            className='radio'
            type='radio'
            id='review'
            name='radios'
            onClick={changeSection}
            checked={section === SECTION.REVIEW}
          />
          <label htmlFor='review'>
            <div>리뷰</div>
          </label>
          <input
            className='radio'
            type='radio'
            id='beans'
            name='radios'
            onClick={changeSection}
            checked={section === SECTION.BEANS}
          />
          <label htmlFor='beans'>
            <div>원두</div>
          </label>
        </div>
        {/* 주입 하고싶음 */}
        {/* <main>{children}</main> */}
        {section === SECTION.VISIT ? <VisitDetail /> : ''}
        {section === SECTION.REVIEW ? <ReviewDetail /> : ''}
        {section === SECTION.BEANS ? <BeansDetail /> : ''}
      </div>
    </>
  );
};
