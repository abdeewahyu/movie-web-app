const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  // Encode query terlebih dahulu agar lebih bersih
  const encodedQuery = encodeURIComponent(query);
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodedQuery}`
  );

  // atau bisa ditulis juga seperti ini
  // const response = fetch(${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)})

  const data = await response.json();
  return data.results;
};
