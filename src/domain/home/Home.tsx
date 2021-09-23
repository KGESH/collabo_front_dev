import React, { useEffect } from 'react';
import 'domain/home/style/Home.css';
import { useReactiveVar, gql, useMutation } from '@apollo/client';
import {
  currentUserVar,
  homeTagListVar,
} from 'services/apollo-client/LocalState';
import { ReactComponent as PostReviewIcon } from 'resources/images/PostReview.svg';
import { ReactComponent as HeaderLogo } from 'resources/images/CaLogo.svg';
import { Link } from 'react-router-dom';
import Navbar from 'components/navbar/Navbar';

export const GET_KAKAO_USER = gql`
  mutation {
    authUser {
      user {
        id
        name
        email
        home_tag_list
      }
      jwt
    }
  }
`;

const Home = () => {
  const user = useReactiveVar(currentUserVar);
  const filtertagList = useReactiveVar(homeTagListVar);
  const main_img: string[] = ['A', 'B', 'C', 'D', 'E'];
  const [getUser, { loading, data, error }] = useMutation(GET_KAKAO_USER);

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (data?.authUser?.user) {
      console.log('loading done');
      console.log(data.authUser.user.home_tag_list);
      homeTagListVar(data.authUser.user.home_tag_list);
    }
  }, [loading]);

  useEffect(() => {
    console.log(`Home/ current user`);
    console.log(user);
  }, [user]);

  return (
    <>
      <header className='home__header'>
        <HeaderLogo className='header_logo' />
        <Link to='/PostReview'>
          <PostReviewIcon className='header_review_icon' />
        </Link>
      </header>
      <section className='home__content'>
        <ul className='hash_tag_filter'>
          {filtertagList?.map((tag: string, index: number) => {
            return (
              <li key={index}>
                <input
                  className='filter'
                  type='radio'
                  id={tag}
                  onClick={() => console.log(`clicked filter:${index}`)}
                />
                <label htmlFor={tag}>
                  <div id={tag} className='border'>
                    {tag}
                  </div>
                </label>
              </li>
            );
          })}
          <button>+</button>
        </ul>
      </section>
      <div className='hash_tag'>해쉬 태그</div>
      {main_img.map((img, index) => (
        <div key={index}>
          <div className='main_img'>메인_이미지{img}</div>
          <div className='thingthing'>하트, 돋보기, 지도 ...</div>
        </div>
      ))}
      <Navbar />
    </>
  );
};

export default Home;
