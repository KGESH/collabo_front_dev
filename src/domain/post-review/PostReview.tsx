import React from 'react';
import ReviewForm from 'components/review-form/ReviewForm';
import { Link } from 'react-router-dom';
import {
  hashTagListVar,
  uploadImgVar,
  reviewContentVar,
} from 'services/apollo-client/LocalState';
import 'domain/post-review/style/PostReview.css';
import { useReactiveVar } from '@apollo/client';

const PostReview = () => {
  const content = useReactiveVar(reviewContentVar);
  return (
    <>
      <header className='review__header'>
        <Link to='/'>
          back <br />
          img
        </Link>
        <span className='review_title'>새 게시물</span>
        <button
          onClick={() => {
            console.log(content);
          }}
        >
          submit
        </button>
      </header>
      <ReviewForm />
    </>
  );
};
export default PostReview;
