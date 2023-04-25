import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?';

const REQUEST_OPTIONS = {
  key: '34369155-5d93acadffc22e75da017de5a',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
};

async function getImages(query, page) {
  REQUEST_OPTIONS.q = query;
  REQUEST_OPTIONS.page = page;

  console.log(REQUEST_OPTIONS);

  const options = new URLSearchParams(REQUEST_OPTIONS);

  try {
    const response = await axios.get(`${BASE_URL}${options}`);

    return response;
  } catch (error) {
    console.log(error.message);
  }
}

export default getImages;