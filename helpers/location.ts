export const getMapPreview = (lat: number, lon: number) => {
  const imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat%3A${lon}%2C${lat}&zoom=14.3497&marker=lonlat%3A${lon}%2C${lat}%3Btype%3Aawesome%3Bcolor%3A%23bb3f73%3Bsize%3Ax-large%3Bicon%3Apaw&apiKey=9be5c488ed1148868f09f04899fd3518`;
  return imagePreviewUrl;
};
