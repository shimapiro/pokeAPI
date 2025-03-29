import React from "react";

const PokemonCard = ({ poke }) => {
  return (
    <div className="px-10 py-4 border rounded shadow text-center">
      <p className="text-xl font-bold">{poke.name}</p>
      <img
        className="mx-auto mt-2"
        src={poke.sprites.front_default}
        alt={poke.name}
      />
      <p>タイプ</p>
      <p className="mt-1 text-sm text-gray-500">
        {poke.types.map((t) => t.type.name).join(",")}
      </p>
    </div>
  );
};

export default PokemonCard;
