const KakaoSdkInit = () => {
  const { Kakao } = window;
  console.log(`env : ${process.env.KAKAO_JS_KEY}`);
  const key = process.env.KAKAO_JS_KEY || 'ebaaf325637b20ae7519bd8d770f8f70';
  Kakao.init(key);
  if (Kakao?.isInitialized()) {
    console.log(`kakao init `);
  }
};

export default KakaoSdkInit;
