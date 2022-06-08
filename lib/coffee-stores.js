import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_KEY,
});

const getListOfCoffeeStoresPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 10,
  });
  const unsplashPhotos = photos.response.results
  return unsplashPhotos.map(result => result.urls['small'])
 
}


export const fetchCoffeeStores = async (latLong = "32.08791222,34.7272057") => {
  try{
    const photos = await getListOfCoffeeStoresPhotos()
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: process.env.FOURSQUERE_AUTH
        }
      };
    
    const res = await fetch(`https://api.foursquare.com/v3/places/search?query=coffee&ll=${latLong}&limit=10`, options)
    const data = await res.json()
    return data.results.map((venue,index) => {
      return {
        id: venue.fsq_id,
        address: venue.location.address || "",
        name: venue.name,
        city: venue.location.region,
        distance: venue.distance,
        imgUrl: photos[index]
      }
    });
  } catch (error){
    if (
      !process.env.NEXT_PUBLIC_FOURSQUERE_AUTH ||
      !process.env.NEXT_PUBLIC_UNSPLASH_KEY
    ) {
      console.error(
        "🚨 Make sure to setup your API keys, checkout the docs on Github 🚨"
      );
    }
    console.log("Something went wrong fetching coffee stores", error);
    return [];
  }
}