import { mapVar, cafeDetailVar, clickedCafeDetailVar } from 'services/apollo-client/LocalState';

export const onAdjustHeightButtonClick = (event: any) => {
  const cafeDetail = cafeDetailVar();
  cafeDetailVar({
    height: cafeDetail.height === 'down' ? 'up' : 'down',
    count: cafeDetail.count + 1,
  });
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

/*

  const isTouched = useReactiveVar(isTouchedVar);
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const [touchedPosY, setTouchedPosY] = useState<number>(0);
  const [draggedPosY, setDraggedPosY] = useState<number>(0);
  const [isEventAdded, setIsEventAdded] = useState<boolean>(false);

  useEffect(() => {
    const detailContainer: HTMLElement | null = document.getElementById(
      'map_cafe_detail_container',
    );
    if (!isTouched || cafeDetail.height === 'none') return;
    const differencePosY: number = touchedPosY - draggedPosY;
    const startPosY: number = cafeDetail.height === 'down' ? 25 : 75;
    const fixedPosY: number = startPosY + differencePosY <= 75 ? startPosY + differencePosY : 75;
    if (detailContainer) {
      detailContainer.style.height = `${fixedPosY}vh`;
    }
  }, [draggedPosY]);

  useEffect(() => {
    const detailContainer: HTMLElement | null = document.getElementById(
      'map_cafe_detail_container',
    );
    if (isEventAdded || !detailContainer) {
      return;
    }
    console.log(`evnet added!`);

     * 터치 시작
     detailContainer?.addEventListener(
      'touchstart',
      (event: any) => {
        console.log(`touch start`);
        isTouchedVar(true);
        const touches = event.changedTouches;
        const clientPos = {
          posX: touches[0].clientX,
          posY: touches[0].clientY,
        };
        setTouchedPosY(pxToVh(clientPos.posY).height);
      },
      false,
    );

     * 터치 움직임
    document.addEventListener(
      'touchmove',
      (event: any) => {
        if (isTouched) {
          console.log(`touch move`);
          setIsDragged(true);
          const touches = event.changedTouches;
          const clientPos = {
            posX: touches[0].clientX,
            posY: touches[0].clientY,
          };
          setDraggedPosY(pxToVh(clientPos.posY).height);
        }
      },
      false,
    );


     * 터치 종료
    document.addEventListener(
      'touchend',
      (event: any) => {
        if (isTouched && isDragged) {
          console.log(`touch end`);
          const fixedPosY: number = +detailContainer.style.height.slice(0, -2);
          if (cafeDetail.height === 'down') {
            if (fixedPosY < 25) {
              cafeDetailVar({ height: 'none', count: cafeDetailVar().count + 1 });
            } else {
              cafeDetailVar({ height: 'up', count: cafeDetailVar().count + 1 });
            }
          } else if (cafeDetail.height === 'up') {
            if (fixedPosY >= 25) {
              cafeDetailVar({ height: 'down', count: cafeDetailVar().count + 1 });
            } else {
              cafeDetailVar({ height: 'none', count: cafeDetailVar().count + 1 });
            }
          }
        }
        console.log(`end isTouched : ${isTouched}`);
        setIsDragged(false);
        isTouchedVar(false);
      },
      false,
    );

    setIsEventAdded(true);
  }, []);

  useEffect(() => {
    console.log(`event added : true!`);
  }, [isEventAdded]);

  useEffect(() => {
    console.log(`isTouched : ${isTouched}!`);
  }, [isTouched]);
*/
