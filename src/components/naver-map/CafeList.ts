export interface mapProps {
  name: string;
  mapPos: naver.maps.LatLng;
  latitude: string;
  longitude: string;
};

export const cafeList: mapProps[] = [
  {
    name: "UCL",
    mapPos: new naver.maps.LatLng(37.49739247636679, 127.024500411214),
    latitude: "37.49739247636679",
    longitude: "127.024500411214",
  },
  {
    name: "세븐일레븐",
    mapPos: new naver.maps.LatLng(37.49767168345585, 127.02554903835262),
    latitude: "37.49767168345585",
    longitude: "127.02554903835262",
  },
  {
    name: "카페클라라",
    mapPos: new naver.maps.LatLng(37.48640383639625, 127.02645485355671),
    latitude: "37.48640383639625",
    longitude: "127.02645485355671",
  },
  {
    name: "스타벅스강남",
    mapPos: new naver.maps.LatLng(37.497880153876324, 127.02858793754639),
    latitude: "37.497880153876324",
    longitude: "127.02858793754639",
  },
  {
    name: "스타벅스역삼",
    mapPos: new naver.maps.LatLng(37.50087464820226, 127.03521371164268),
    latitude: "37.50087464820226",
    longitude: "127.03521371164268",
  },
  {
    name: "강남역",
    mapPos: new naver.maps.LatLng(37.49801595240376, 127.027617928316),
    latitude: "37.49801595240376",
    longitude: "127.027617928316",
  },
  {
    name: "서울역",
    mapPos: new naver.maps.LatLng(37.555169668605146, 126.9708312340773),
    latitude: "37.555169668605146",
    longitude: "126.9708312340773",
  },
  {
    name: "스타벅스인덕원",
    mapPos: new naver.maps.LatLng(37.4001928018823, 126.97634548623328),
    latitude: "37.4001928018823",
    longitude: "126.97634548623328",
  },
  {
    name: "카민",
    mapPos: new naver.maps.LatLng(37.39011081480149, 126.9948019917303),
    latitude: "37.39011081480149",
    longitude: "126.9948019917303",
  },
  {
    name: "롯데타워",
    mapPos: new naver.maps.LatLng(37.51262182019996, 127.1025318612988),
    latitude: "37.51262182019996",
    longitude: "127.1025318612988",
  },
  {
    name: "연준이집",
    mapPos: new naver.maps.LatLng(37.39258645515426, 126.99530974796347),
    latitude: "37.39258645515426",
    longitude: "126.99530974796347",
  }
];