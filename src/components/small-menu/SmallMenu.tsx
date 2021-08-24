import React, { useState } from 'react';
import 'components/small-menu/style/SmallMenu.css';

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
      {modal ?
        <div className='sm_modal_group'>
          <div>{mode}의 모달</div>
        </div>
        : ''}
    </>
  );
}