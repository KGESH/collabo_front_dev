import {
  mapVar,
  cafeDetailHeightVar,
  clickedCafeDetailVar,
} from 'services/apollo-client/LocalState';

export const onAdjustHeightButtonClick = (event: any) => {
  const cafeDetailHeight = cafeDetailHeightVar();
  cafeDetailHeightVar(cafeDetailHeight === 'down' ? 'up' : 'down');
};

export const onDetailImgClick = () => {
  const map = mapVar();
  const clickedCafeDetail = clickedCafeDetailVar();
  if (map && clickedCafeDetail) {
    map.setCenter(new naver.maps.LatLng(+clickedCafeDetail.latitude, +clickedCafeDetail.longitude));
  }
};

/** px값을 vw, vh값으로 변환하는 함수 */

export const pxToVh = (px: number) => {
  const size = {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight,
  };
  const convertedVh = {
    width: (px / size.width) * 100,
    height: (px / size.height) * 100,
  };
  return convertedVh;
};

function dragElement(elmnt: any) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  elmnt.onmousedown = dragMouseDown;
  function dragMouseDown(e: any) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e: any) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
    elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    console.log('현재 요소의 위치 y는 ' + elmnt.top + ', x는' + elmnt.left + '입니다.');
  }
}
