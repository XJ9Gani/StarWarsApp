import { useCallback, useState } from "react";
import { useEffect } from "react";
import { Loader } from "../components";
import "../style/Char.scss";
import { NavLink } from "react-router-dom";
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

  console.log(characters);

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
          {characters.map(({ name }) => (
            <li key={name} className="char__container--item">
              {name}
              <NavLink to={`/entety`}>View</NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={getPrevPage}
          disabled={page <= 1}
          className="char__container--prev"
        >
          Previous
        </button>
        <button
          onClick={getNextPage}
          className="char__container--next"
          disabled={page >= 9}
        >
          Next
        </button>
      </section>
    </>
  );
}