import { useCallback, useState } from "react";
import { useEffect } from "react";
import { Loader } from "../components";
import "../style/Char.scss";
import { NavLink } from "react-router-dom";
import Character from "../types/character";
export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?page=${page}`
        );
        const result = await response.json();
        setCharacters(result.results);
        setLoading(true);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const getPrevPage = useCallback(() => {
    setPage(page - 1);
    setLoading(true);
  }, [page]);
  const getNextPage = useCallback(() => {
    setPage(page + 1);
    setLoading(true);
  }, [page]);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <section className="char">
        <ul className="char__container">
          {characters.map((character: Character, index) => (
            <li key={character.name} className="char__container--item">
              <NavLink to={`/character/${index + 1}`} className="name">
                {character.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={getPrevPage}
          disabled={page <= 1}
          className="char__container--prev"
        >
          <strong>❮</strong>
        </button>
        <button
          onClick={getNextPage}
          className="char__container--next"
          disabled={page >= 9}
        >
          <strong>❯</strong>
        </button>
      </section>
    </>
  );
}
