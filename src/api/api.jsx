export const getPokemonList = (initialURL) => {
  return fetch(initialURL).then((res) => res.json());
};
export const getPokemonDetail = (initialURL) => {
  return fetch(initialURL).then((res) => res.json());
};
