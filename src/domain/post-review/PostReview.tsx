import React, { useEffect } from 'react';
import ReviewForm from 'components/review-form/ReviewForm';
import { Link } from 'react-router-dom';
import {
  hashTagListVar,
  uploadImgListVar,
  reviewContentVar,
  uploadImgBase64ListVar,
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
  const base64Img = useReactiveVar(uploadImgBase64ListVar);
  const [upload, { loading, data, error }] = useMutation(POST_REVIEW);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(`imgList list`);
    console.log(imgList);
    upload({
      variables: {
        review: { content, hash_tag_list: tagList, files: imgList },
      },
    });
  };

  if (error) {
    console.log(`post error!`);
    console.log(error);
  }
  useEffect(() => {
    if (!loading && data) {
      console.log(data);
    }
  }, [data]);

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
