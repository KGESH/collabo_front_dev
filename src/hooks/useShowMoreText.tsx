import React, { useEffect, useState } from 'react';

/**
 * 더 보기, 접기 Hook
 * @param content 글자 수 제한 할 string
 * @param limit  최대 글자 수
 */
export const useShowMoreText = (content: string, limit: number) => {
  const [text, setText] = useState(content);
  const [isToggled, setIsToggled] = useState(false);
  const toggleShowMore = () => setIsToggled(!isToggled);

  useEffect(() => {
    isToggled ? setText(content) : setText(content.slice(0, limit));
  }, [isToggled]);

  return { text, toggleShowMore };
};
