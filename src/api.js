import axios from 'axios';
import { API_KEY } from './key.js';

const URL = 'https://api.thecatapi.com/v1/breeds';
const URL_BREED = 'https://api.thecatapi.com/v1/images/search';

export async function fetchBreeds() {
  const { data } = await axios.get(`${URL}?api_key=${API_KEY}`);
  //   console.log(data);
  return data;
}

export async function fetchCatByBreed(breedId) {
  const { data } = await axios.get(
    `${URL_BREED}?breed_ids=${breedId}&api_key=${API_KEY}`
  );
  //   console.log(data);
  return data;
}

// fetchBreeds();
// fetchCatByBreed();
