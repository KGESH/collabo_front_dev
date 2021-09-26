import React, { useEffect, useRef } from 'react';

export const useClick = (onClick: any) => {
  const element = useRef();

  useEffect(() => {
    if (element.current) {
      //element.current.addEventListener('onClick', onClick)
    }
  }, []);

  return { element };
};
