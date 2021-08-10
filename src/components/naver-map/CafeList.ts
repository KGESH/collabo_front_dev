type mapProps = {
  name: string;
  mapPos: naver.maps.LatLng;
};

export const cafeList: mapProps[] = [
  {
    name: "UCL",
    mapPos: new naver.maps.LatLng(37.49739247636679, 127.024500411214),
  },
  {
    name: "세븐일레븐",
    mapPos: new naver.maps.LatLng(37.49767168345585, 127.02554903835262),
  },
  {
    name: "카페클라라",
    mapPos: new naver.maps.LatLng(37.48640383639625, 127.02645485355671),
  },
  {
    name: "스타벅스강남",
    mapPos: new naver.maps.LatLng(37.497880153876324, 127.02858793754639),
  },
  {
    name: "스타벅스역삼",
    mapPos: new naver.maps.LatLng(37.50087464820226, 127.03521371164268),
  },
  {
    name: "강남역",
    mapPos: new naver.maps.LatLng(37.49801595240376, 127.027617928316),
  }
];

export type {mapProps};