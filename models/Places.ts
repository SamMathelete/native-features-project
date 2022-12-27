export interface location {
  latitude: number;
  longitude: number;
}

export class Place {
  title: string = "";
  imageUri: string = "";
  location: location = {
    latitude: 0.0,
    longitude: 0.0,
  };
  id: string = "";
  constructor(title: string, imageUri: string, location: location) {
    this.title = title;
    this.imageUri = imageUri;
    this.location = location;
    this.id = new Date().toString() + Math.random().toString();
  }
}

export default Place;
