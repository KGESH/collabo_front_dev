import React from 'react';
import 'components/modal-frame/style/Modal.css';
import { IModalFrameProps } from 'types/Props';

const Modal = (props: IModalFrameProps) => {
  const { isOpen, handleClose, header, children } = props;

  return (
    <div className={isOpen ? 'openModal modal' : 'modal'}>
      {isOpen ? (
        <section>
          <header>
            {header}
            <button className='close' onClick={handleClose}>
              &times;
            </button>
          </header>
          <main>{children}</main>
          <footer>
            <button className='close' onClick={handleClose}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
