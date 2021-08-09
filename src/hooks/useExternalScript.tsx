import { useEffect } from 'react';

/**
 * 외부 스크립트를 html에 붙여서 사용해야 할때
 * 스크립트 url을 인자로 받아서 사용
 */

const useExternalScript = (resourceUrl: string) => {
  useEffect(() => {
    const script: HTMLScriptElement = document.createElement('script');
    script.src = resourceUrl;
    script.async = false;
    document.body.appendChild(script);
    console.log('fin script attach');

    return () => {
      document.body.removeChild(script);
      console.log('return script attach');
    };
  }, [resourceUrl]);
};

export default useExternalScript;
