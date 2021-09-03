export interface IPosition {
  latitude: number;
  longitude: number;
}

export interface ICafeInfo {
  name: string;
  mapPos: naver.maps.LatLng;
  latitude: string;
  longitude: string;
  distance: number;
  address?: string;
}
