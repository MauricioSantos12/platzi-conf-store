import React, {
  useState,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Search from "./Search.jsx";
import useCharacters from "../hooks/useCharacters.js";
import "../assets/components/Characters.css";

const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

const Characters = () => {
  const API = "https://rickandmortyapi.com/api/character/";
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);
  const characters = useCharacters(API);

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // };

  const filteredUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  // const filteredUsers = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // });

  return (
    <div className="containerCharacters">
      {favorites.favorites.map((favorite) => (
        <li key={favorite.id}>{favorite.name}</li>
      ))}

      <div className="search">
        <Search
          search={search}
          searchInput={searchInput}
          handleSearch={handleSearch}
        />
      </div>
      <div className="characters">
        {filteredUsers.map((character) => (
          <div className="card" key={character.id}>
            <h2 className="name">{character.name}</h2>
            <img src={character.image} className="image" alt="" />
            <h4 className="propsCharacter">{character.gender}</h4>
            <h4 className="propsCharacter">{character.species}</h4>
            <h4 className="propsCharacter">{character.status}</h4>
            <h4 className="propsCharacter">
              {" "}
              <span>Location: </span>
              {character.location.name}
            </h4>
            <button type="button" onClick={() => handleClick(character)}>
              Add to favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
