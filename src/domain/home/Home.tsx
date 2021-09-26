import React, { useEffect, useState } from 'react';
import 'domain/home/style/Home.css';
import { useReactiveVar, gql, useMutation } from '@apollo/client';
import { currentUserVar, homeTagListVar } from 'services/apollo-client/LocalState';
import { ReactComponent as PostReviewIcon } from 'resources/images/PostReview.svg';
import { ReactComponent as HeaderLogo } from 'resources/images/home/CaLogo.svg';
import { ReactComponent as AddFilterBtn } from 'resources/images/home/add_filter_btn.svg';
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
  const user = useReactiveVar(currentUserVar);
  const filtertagList = useReactiveVar(homeTagListVar);
  const isFilterModalOpen = useState(false);
  const mockContent =
    'Mock Data Start\n This second Line\nThis 3 Line\nThis 4 Line\nThis 5 Line\nEND';
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
        <HeaderLogo className='mx-auto' />
        <Link to='/PostReview' className='flex mr-2 justify-center items-center'>
          <PostReviewIcon />
        </Link>
      </header>
      <section className='flex flex-auto flex-wrap border-b border-gray-100'>
        <ul className='flex mx-auto my-auto items-center overflow-x-scroll'>
          {filtertagList?.map((tag: string, index: number) => {
            return (
              <li className='mt-6' key={index}>
                <label htmlFor={tag}>
                  <input
                    type='checkbox'
                    className='filter'
                    id={tag}
                    onClick={() => console.log(`clicked filter:${index}`)}
                  />
                  <div
                    id={tag}
                    className='flex-1 mx-5 my-3 px-3 py-1 border rounded-full text-xs text-gray-600;'
                  >
                    {tag}
                  </div>
                </label>
              </li>
            );
          })}
        </ul>
        <AddFilterBtn className=' my-auto mx-auto w-6 h-6 rounded-full border-2 text-gray-600' />
      </section>
      {/* Mock */}
      <ReviewItem
        user_name={'user'}
        content={mockContent}
        hash_tag_list={['mock', 'data', 'list']}
        comment_list={[mockComent, mockComent, mockComent]}
      />

      <Navbar />
    </>
  );
};

export default Home;
