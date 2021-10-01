import React, { useEffect } from 'react';
import ReviewForm from 'components/review-form/ReviewForm';
import { Link, useHistory } from 'react-router-dom';
import {
  hashTagListVar,
  uploadImgListVar,
  reviewContentVar,
  currentUserVar,
} from 'services/apollo-client/LocalState';
import 'domain/post-review/style/PostReview.css';
import { useReactiveVar } from '@apollo/client';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

const POST_REVIEW = gql`
  mutation POST_REVIEW($review: ReviewInput!) {
    postReview(review: $review) {
      success
      message
    }
  }
`;

const PostReview = () => {
  const user = useReactiveVar(currentUserVar);
  const content = useReactiveVar(reviewContentVar);
  const tagList = useReactiveVar(hashTagListVar);
  const imgList = useReactiveVar(uploadImgListVar);
  const [upload, { error }] = useMutation(POST_REVIEW);
  const history = useHistory();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!imgList || !content || !tagList) {
      return;
    }

    upload({
      variables: {
        review: { content, hash_tag_list: tagList, files: imgList },
      },
    });

    history.push('/');
  };

  if (error) {
    console.log(`post error!`);
    console.log(error);
  }

  return (
    <>
      <header className='review__header'>
        <Link to='/'>
          back <br />
          img
        </Link>
        <span className='review_title'>새 게시물</span>
        <button onClick={handleSubmit}>submit</button>
      </header>
      <ReviewForm />
    </>
  );
};
export default PostReview;
