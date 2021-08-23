import React, { useState } from 'react';

export default ({ mode }: any) => {

  const [modal, setModal] = useState(false);

  return (
    <>
      <div className='de_vi_first__spot' onClick={() => {
        modal ? setModal(false) : setModal(true);
      }}>
        <div className='dot' />
        <div className='dot' />
        <div className='dot' />
      </div>
      {modal ? console.log('ppap') : ''}
    </>
  );
}