export interface location {
  latitude: number;
  longitude: number;
}

class Place {
  title: string = "";
  imageUri: string = "";
  address: string = "";
  location: location = {
    latitude: 0.0,
    longitude: 0.0,
  };
  id: string = "";
  constructor(
    title: string,
    imageUri: string,
    address: string,
    location: location
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
    this.id = new Date().toString() + Math.random().toString();
  }
}

export default Place;
