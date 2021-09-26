import React, { useState } from 'react';
import mockImg from 'resources/images/home/mockImg.png';
import mockUser from 'resources/images/home/mockUser.png';
import { useShowMoreText } from 'hooks/useShowMoreText';
import 'components/home-review-item/style/ReviewItem.css';
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

  return (
    <section className='flex-col'>
      <div className='flex'>
        <img className='item_owner_img' src={mockUser} />
        <div className='item_owner_container'>
          <span className='item_owner'>{user_name}</span>
          <span className='item_average_star'>별점</span>
        </div>
      </div>
      <div className='item_image_slide'>
        <div>
          <img className='item_image' src={mockImg} />
        </div>
      </div>
      <div className='item_content_container'>
        <div className='item_button_list'>
          <button type='button' className='item_button button_like' />
          <button type='button' className='item_button button_comment' />
          <button type='button' className='item_button button_location' />
        </div>
        <>
          <span className='item_content_onwer'>{user_name} </span>
          {/** 줄바꿈 해결해야 함 */}
          <span className='mock_content'>{text} </span>
          <span
            onClick={() => {
              toggleShowMore();
              setIsToggled(!isToggled);
            }}
          >
            {isToggled ? undefined : '...더보기'}
          </span>
        </>
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
              <span>{comment.user_name} - </span>
              <span>{comment.content} </span>
              <span>{index}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ReviewItem;
