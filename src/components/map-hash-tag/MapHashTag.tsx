import React from 'react';
import 'components/map-hash-tag/style/MapHashTag.css';
import { HashTagList } from 'components/map-hash-tag/HashTagList';
import { IHashTag } from 'types/HashTag';
import { clickedHashTagVar } from 'services/apollo-client/LocalState';
import { useReactiveVar } from '@apollo/client';

const MapHashTag = () => {
  const clickedHashTag = useReactiveVar(clickedHashTagVar);

  return (
    <div className='map__hash_tag_container'>
      <div className='container__hash_tag_list'>
        {HashTagList.map((tag: IHashTag) => {
          return (
            <>
              <input
                className='hash_tag_list__radio_btn'
                type='radio'
                id={tag.name}
                name='radios'
                onClick={(event: any) => {
                  clickedHashTagVar(event.currentTarget.id);
                }}
                checked={clickedHashTag === tag.name}
              />
              <label htmlFor={tag.name}>
                <div id={tag.name} className='hash_tag_list__border'>
                  {tag.name}
                </div>
              </label>
            </>
          );
        })}
      </div>
      <button>추가</button>
    </div>
  );
};

export default MapHashTag;
