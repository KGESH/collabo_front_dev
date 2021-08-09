import { Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const KakaoCallback = () => {
  const location = useLocation();
  const { jwt } = queryString.parse(location.search);
  if (jwt) {
    /**
     * 테스트용
     * 쿠키로 바꿔줘야함
     * */
    localStorage.setItem('jwt', jwt as string);
    console.log(`jwt = ${jwt}`);
  }

  alert('stop!');

  return <Redirect to='/' />;
};

export default KakaoCallback;
