export const makeImagePath = (path: string, size: string = "w500") => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
