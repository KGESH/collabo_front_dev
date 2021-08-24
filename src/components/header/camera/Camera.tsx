import React from 'react';
import 'components/header/camera/style/Camera.css';
import { Link } from 'react-router-dom';

export default () => {

  const exeDeepLink = () => {
    const url: string = 'camera://';
    location.href = url;
  };

  return (
    <>
      <div className='plus-btn' onClick={exeDeepLink}>
        <div id='fucking_stick_1' />
        <div id='fucking_stick_2' />
      </div>
    </>
  );
}