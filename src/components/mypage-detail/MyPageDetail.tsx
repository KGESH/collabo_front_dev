import React from 'react';

interface IMyPageProps {
  cafeName: string;
  cafeCardUrl: string;
  subscribedMonth?: number;
  roasteryCardUrl?: string;
  children?: React.ReactNode;
}
export default ({ cafeName, cafeCardUrl, children }: IMyPageProps) => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <img src={cafeCardUrl} className='' />
        <p>{cafeName}</p>
        <main>{children}</main>
      </div>
    </>
  );
};
