import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

const REQUEST_OPTIONS = {
  key: '34369155-5d93acadffc22e75da017de5a',
  q: '',
};

async function getImages(query) {
  REQUEST_OPTIONS.q = query;

  const options = new URLSearchParams(REQUEST_OPTIONS);

  try {
    const response = await axios.get(`${BASE_URL}${options}`);
    return response;
  } catch (error) {
    console.log(error.message);
  }
}

export default getImages;
