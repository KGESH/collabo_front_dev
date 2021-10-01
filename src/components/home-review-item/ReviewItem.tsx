import React, { useState } from 'react';
import mockImg from 'resources/images/home/mockImg.png';
import mockUser from 'resources/images/home/mockUser.png';
import { useShowMoreText } from 'hooks/useShowMoreText';
import 'components/home-review-item/style/ReviewItem.css';
import { BrowserRouter, Link, useHistory } from 'react-router-dom';
/** IReview Props 예정 */
import { IReview, IComment } from 'types/Review';
const ReviewItem = ({
  user_name,
  content,
  location,
  image_list,
  hash_tag_list,
  comment_list,
  like_count,
}: any) => {
  const { text, toggleShowMore } = useShowMoreText(content, 30);
  const [isToggled, setIsToggled] = useState(false);
  const history = useHistory();

  return (
    <section className='item_header'>
      <div className='flex mb-2'>
        <img className='mx-2 my-auto' src={mockUser} />
        <div className='item_owner_container'>
          <span className='item_owner text-lg'>{user_name}</span>
          <span className='item_average_star text-xs'>평균 ★★★☆☆</span>
        </div>
      </div>
      <div className='item_image_slide'>
        <img className='item_image' src={mockImg} />
      </div>
      <div className='item_content_container'>
        <div className='flex '>
          <button type='button' className='item_btn like_btn' />
          <button type='button' className='item_btn comment_btn' />
          <button
            type='button'
            className='item_btn location_btn'
            onClick={() => {
              history.push('/map/cafe/142090');
            }}
          />
        </div>
        {/** 줄바꿈 해결해야 함 */}
        <div className='flex break-words whitespace-pre-wrap '>
          <span className='item_content_onwer mx-1'>{user_name} </span>
          <span className='mock_content mx-2'>{text} </span>
          <span
            className='text-sm my-auto'
            onClick={() => {
              toggleShowMore();
              setIsToggled(!isToggled);
            }}
          >
            {isToggled ? undefined : '...더보기'}
          </span>
        </div>
        <div className='item_tag_list'>
          {hash_tag_list.map((tag: string, index: number) => (
            <div className='item_tag'>{tag}</div>
          ))}
        </div>
      </div>
      <div className='item_comment_container'>
        {comment_list.map((comment: IComment, index: number) => {
          return (
            <div className='item_comment'>
              <span className='text-sm'>{comment.user_name} - </span>
              <span className='text-xs'>{comment.content} </span>
              <span className='text-xs'>{index}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ReviewItem;
