import { useEffect, useState } from "react";
import { getPokemonDetail, getPokemonList } from "./api/api";
import Navbar from "./components/Navbar";
import PokemonCard from "./components/PokemonCard";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    getPokemonList(initialURL).then((data) => {
      console.log("一覧データ:", data);
      setNextURL(data.next);
      setPrevURL(data.previous);
      const detailPokemons = data.results.map((detailPokemon) =>
        getPokemonDetail(detailPokemon.url)
      );

      Promise.all(detailPokemons)
        .then((detailPokemonData) => {
          setLoading(false);
          console.log("URL", detailPokemonData);
          setPokemon(detailPokemonData);
        })
        .catch((err) => {
          console.error("ポケモン取得失敗", err);
          alert("読み込み失敗");
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, []);

  const loadPage = (initialURL) => {
    setLoading(true);

    getPokemonList(initialURL)
      .then((data) => {
        setNextURL(data.next);
        setPrevURL(data.previous);

        const detailPokemons = data.results.map((detailPokemon) =>
          getPokemonDetail(detailPokemon.url)
        );

        return Promise.all(detailPokemons);
      })
      .then((detailPokemonData) => {
        setPokemon(detailPokemonData);
      })
      .catch((err) => {
        console.error("ページ取得失敗", err);
        alert("読み込みに失敗しました。");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="mt-3 w-full justify-center flex items-center flex-col">
        {loading ? (
          <p className="text-2xl">ポケモン捜索中...</p>
        ) : (
          <>
            <p className="text-2xl">ポケモンゲットだぜ！！</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
              {pokemon.map((poke) => (
                <PokemonCard key={poke.id} poke={poke} />
              ))}
            </div>
            <div className="mt-4">
              {prevURL && (
                <button
                  onClick={() => loadPage(prevURL)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  前へ
                </button>
              )}
              {nextURL && (
                <button
                  onClick={() => loadPage(nextURL)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  次へ
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
