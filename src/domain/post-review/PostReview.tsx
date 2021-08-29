import React from 'react';
import ReviewForm from 'components/review-form/ReviewForm';
import { Link } from 'react-router-dom';
import 'domain/post-review/style/PostReview.css';

const PostReview = () => {
  return (
    <>
      <header className='review__header'>
        <Link to='/'>
          back <br />
          img
        </Link>
        <span className='review_title'>새 게시물</span>
        <button>submit</button>
      </header>
      <ReviewForm />
    </>
  );
};
export default PostReview;
