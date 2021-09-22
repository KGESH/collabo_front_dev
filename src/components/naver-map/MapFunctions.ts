import { ILocation } from 'types/Map';

export const getDistance = (
  currentLatitude: number,
  currentLongitude: number,
  cafeLatitude: number,
  cafeLongitude: number,
): string => {
  let distance: number = 0;
  if (currentLatitude !== cafeLatitude || currentLongitude !== cafeLongitude) {
    const radlat1 = (Math.PI * currentLatitude) / 180;
    const radlat2 = (Math.PI * cafeLatitude) / 180;
    const theta = currentLongitude - cafeLongitude;
    const radtheta = (Math.PI * theta) / 180;
    distance =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (distance > 1) {
      distance = 1;
    }
    distance = Math.acos(distance);
    distance = (distance * 180) / Math.PI;
    distance = distance * 60 * 1.1515;
    distance = distance * 1.609344;
  }
  return distance.toFixed(5);
};
