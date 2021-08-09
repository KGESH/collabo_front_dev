const KakaoSdkInit = () => {
  const { Kakao } = window;
  const key = 'ebaaf325637b20ae7519bd8d770f8f70';
  Kakao.init(key);
  if (Kakao?.isInitialized()) {
    console.log(`kakao init `);
  }
};

export default KakaoSdkInit;
