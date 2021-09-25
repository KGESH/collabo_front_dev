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
    'mock data start fasf asdhdfa sbhfas dj bh fasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhbhfasdjdfsbhdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajhfasdhdfasbhfasdjdfsbhfdbhjdfbasdfbshdfbjabsdfhdfbasasdfbhfasdbhjfasbhjdfafhjabhjfbdasjfbasdhjbsdajfbasdfhjsdbfjhbasdfhasdfbhjasdbhjasdbhjsdjasdfdfjasbasdfbasdfasdfbhasdfbhasdfbhjsdfajh END';
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
        <HeaderLogo className='header_logo' />
        <Link to='/PostReview'>
          <PostReviewIcon className='header_review_icon' />
        </Link>
      </header>
      <section className='home__content'>
        <ul className='hash_tag_filter'>
          {filtertagList?.map((tag: string, index: number) => {
            return (
              <li className='filter_item' key={index}>
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
          <AddFilterBtn className='add_filter_btn' />
        </ul>
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
