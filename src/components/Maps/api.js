const googleMapKey = "AIzaSyBiVml745I01csNBt-j0bYJ-XadAAZbB-c";
async function getAutoCompletePlace(searchKey) {
  const result = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=${searchKey}&key=${googleMapKey}`
  );
  return result;
}

async function getGeometric(placeId) {
  const geoResult = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,geometry&key=${googleMapKey}`
  );
  return geoResult;
}

async function getLocationLatLong(exLat, exLong) {
  const locationResult = fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${exLat},${exLong}&key=${googleMapKey}`
  );
  return locationResult;
}
async function getShortLocationLatLong(exLat, exLong) {
  const locationResult = fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${exLat},${exLong}&location_type=ROOFTOP&result_type=street_address&key=${googleMapKey}`
  );
  return locationResult;
}

export default {
  getAutoCompletePlace,
  getGeometric,
  getLocationLatLong,
  getShortLocationLatLong,
};
