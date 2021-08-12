import React from 'react';
import 'domain/home/style/Home.css';

const Home = () => {
  const main_img: string[] = ['A', 'B', 'C', 'D', 'E'];

  return (
    <>
      <div className='hash_tag'>해쉬 태그</div>
      {main_img.map((img,index) => (
        <div key={index}>
          <div className='main_img'>메인_이미지{img}</div>
          <div className='thingthing'>하트, 돋보기, 지도 ...</div>
        </div>
      ))}

    </>
  );
};

export default Home;