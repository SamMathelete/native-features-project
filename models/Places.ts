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
  constructor(
    title: string,
    imageUri: string,
    location: location,
    id?: string
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.location = location;
    this.id = id ? id : "0";
  }
}

export default Place;
