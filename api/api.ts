const API_KEY = "659fcb8c58aae2c9fa0ee430456f44bd";
const BASE_URL = "https://api.themoviedb.org/3";

export const movieApi = {
  getNowPlayingMovie: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1&region=kr`
    )
      .then((res) => res.json())
      .catch((e) => console.log(e)),
  getTrendingMovie: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko`)
      .then((res) => res.json())
      .catch((e) => console.log(e)),
  getUpcommingMovie: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&page=1&region=kr`
    )
      .then((res) => res.json())
      .catch((e) => console.log(e)),
  search: async ({queryKey}: any) => {
    const [_, query] = queryKey;
    return await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&page=1&query=${query}&include_adult=false`
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));
  },
  detail: async ({queryKey}: any) => {
    const [_, id] = queryKey;
    return await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko&append_to_response=videos,images`
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));
  },
};

export const tvApi = {
  getNowPlayTv: () =>
    fetch(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=ko&page=1&region=kr`
    )
      .then((res) => res.json())
      .catch((e) => console.log(e)),
  getTrendingTv: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=ko`)
      .then((res) => res.json())
      .catch(console.log),
  getTopRatedTv: () =>
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=ko&page=1&region=kr`
    )
      .then((res) => res.json())
      .catch((e) => console.log(e)),
  search: async ({queryKey}: any) => {
    const [_, query] = queryKey;
    return await fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko&page=1&query=${query}&include_adult=false`
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));
  },
  detail: async ({queryKey}: any) => {
    const [_, id] = queryKey;
    return await fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=ko&append_to_response=videos,images`
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));
  },
};
