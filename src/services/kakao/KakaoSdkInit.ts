import useExternalScript from 'hooks/useExternalScript';

const KakaoSdkInit = () => {
  const key = 'ebaaf325637b20ae7519bd8d770f8f70';
  window.Kakao.init(key);
  if (window?.Kakao?.isInitialized()) {
    console.log(`kakao init `);
  }
};

export default KakaoSdkInit;
