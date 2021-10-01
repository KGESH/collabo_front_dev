import React, { useEffect, useState } from 'react';
import 'domain/home/style/Home.css';
import { useReactiveVar, gql, useMutation } from '@apollo/client';
import { currentUserVar, homeTagListVar } from 'services/apollo-client/LocalState';
import { ReactComponent as PostReviewIcon } from 'resources/images/PostReview.svg';
import { ReactComponent as HeaderLogo } from 'resources/images/home/CaLogo.svg';
import { ReactComponent as FilterAddButton } from 'resources/images/home/add_filter_btn.svg';
import { Link } from 'react-router-dom';
import Navbar from 'components/navbar/Navbar';
import ReviewItem from 'components/home-review-item/ReviewItem';
import { IComment } from 'types/Review';

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
  const MOCK: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const user = useReactiveVar(currentUserVar);
  const filtertagList = useReactiveVar(homeTagListVar);
  const isFilterModalOpen = useState(false);
  const mockContent = 'Mock Data Start This second Line This 3 Line\nThis 4 Line\nThis 5 Line\nEND';
  const mockComent: IComment = {
    user_name: 'mockUser',
    content: 'mock Comment',
    post_date: Date.now(),
  };
  const [getUser, { loading, data, error }] = useMutation(GET_KAKAO_USER);

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (data?.authUser?.user) {
      console.log('loading done');
      console.log(data?.authUser.user.home_tag_list);
      homeTagListVar(data?.authUser.user.home_tag_list);
    }
  }, [loading]);

  useEffect(() => {
    console.log(`Home/ current user`);
    console.log(user);
  }, [user]);

  return (
    <>
      <header className='home__header'>
        {/* <HeaderLogo className='header_logo' /> */}
        <span className='header_logo'>Ca</span>
        {user ? (
          <Link to='/PostReview' className='header_post_btn'>
            <PostReviewIcon />
          </Link>
        ) : null}
      </header>
      {user ? (
        <section className='filter_container'>
          <ul className='filter_list'>
            {filtertagList?.map((tag: string, index: number) => {
              return (
                <li key={index}>
                  <label htmlFor={tag}>
                    <input type='checkbox' className='filter' id={tag} />
                    <div id={tag}>{tag}</div>
                  </label>
                </li>
              );
            })}
          </ul>
          <div className='rounded-full'>
            <FilterAddButton className='filter_add_btn' />
          </div>
        </section>
      ) : null}

      {/* Mock */}
      {MOCK.map((e: any, i: any) => (
        <ReviewItem
          user_name={'user'}
          content={mockContent}
          hash_tag_list={['mock', 'data', 'llll']}
          comment_list={[mockComent, mockComent, mockComent]}
        />
      ))}

      <Navbar />
    </>
  );
};

export default Home;
