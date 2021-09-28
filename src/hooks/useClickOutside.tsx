import React, { RefObject, useEffect, useRef } from 'react';

type ClickEvent = MouseEvent | TouchEvent;
/**
 * 선택 컴포넌트 이외의 영역 클릭 이벤트 Hook
 * ex) 모달 밖의 영역 클릭시 모달창 끄기
 * @param ref 클릭 이벤트 적용 받지 않을 컴포넌트
 * @param onClickHandler 전달받은 컴포넌트 이외의 영역이 클릭되었을 때, 실행 될 함수
 */
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  onClickHandler: (event: ClickEvent) => void,
): void => {
  useEffect(() => {
    const listner = (event: ClickEvent) => {
      const element = ref?.current;

      if (!element || element.contains(event.target as Node)) {
        return;
      }
      onClickHandler(event);
    };

    document.addEventListener('mousedown', listner);
    document.addEventListener('touchstart', listner);

    return () => {
      document.removeEventListener('mousedown', listner);
      document.removeEventListener('touchstart', listner);
    };
  }, [ref, onClickHandler]);
};
