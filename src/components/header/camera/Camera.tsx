import React from 'react';
import 'components/header/camera/style/Camera.css';
import { Link } from 'react-router-dom';

export default () => {


  return (
    <>
      <Link to='/qrscan'>
        <div className='plus-btn'>
          <div id='fucking_stick_1' />
          <div id='fucking_stick_2' />
        </div>
      </Link>
    </>
  );
}