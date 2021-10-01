import React, { useRef } from 'react';
import 'components/modal-frame/style/Modal.css';
import { IModalFrameProps } from 'types/Props';

const Modal = (props: IModalFrameProps) => {
  const { isOpen, handleClose, header, children } = props;

  return (
    <>
      {isOpen ? (
        <div className='modal' onClick={handleClose}>
          <section onClick={(e) => e.stopPropagation()} className='modal_content'>
            <header>{header}</header>
            <main className='modal_main'>{children}</main>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
