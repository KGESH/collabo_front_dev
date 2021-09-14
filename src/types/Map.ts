export interface IPosition {
  latitude: number;
  longitude: number;
}

export interface ICafeInfo {
  id: number;
  name: string;
  mapPos: naver.maps.LatLng;
  latitude: string;
  longitude: string;
  distance: number;
  address?: string;
}
