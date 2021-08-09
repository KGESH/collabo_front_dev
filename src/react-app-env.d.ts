/// <reference types="react-scripts" />
/**
 * 카카오 SDK를 사용하기 위해
 * window.Kakao 접근하기 위한 Hack
 */
interface Window {
  Kakao: any;
}
