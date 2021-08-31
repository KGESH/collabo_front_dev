import React, { useState } from 'react';
import { setConstantValue } from 'typescript';

/**
 * Input Tag에서 입력받은 값의 유효성을 검증
 * 값의 유효성 검사는 두번째 인자로 전달받은 함수로 함
 * 유효한 값이면 해당 값과 이벤트 핸들러를 반환
 */
const useInput = (
  initialValue: string,
  validator: (value: string) => boolean,
) => {
  const [value, setValue] = useState(initialValue);
  const clear = () => setValue('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    const willUpdate = validator(value);

    if (willUpdate) {
      setValue(value);
    }
  };

  return { value, onChange, clear };
};

export { useInput };
