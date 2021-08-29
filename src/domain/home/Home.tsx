import React, { useEffect } from 'react';
import 'domain/home/style/Home.css';
import { useReactiveVar } from '@apollo/client';
import { currentUserVar } from 'services/apollo-client/LocalState';
import PostReviewIcon from 'resources/images/PostReview.svg';
import { Link } from 'react-router-dom';
const Home = () => {
  const user = useReactiveVar(currentUserVar);
  const main_img: string[] = ['A', 'B', 'C', 'D', 'E'];

  useEffect(() => {
    console.log(`Home/ current user`);
    console.log(user);
  }, [user]);

  return (
    <>
      <header>
        <Link to='/PostReview'>
          <img src={PostReviewIcon} />
        </Link>
      </header>
      <div className='hash_tag'>해쉬 태그</div>
      {main_img.map((img, index) => (
        <div key={index}>
          <div className='main_img'>메인_이미지{img}</div>
          <div className='thingthing'>하트, 돋보기, 지도 ...</div>
        </div>
      ))}
    </>
  );
};

export default Home;
