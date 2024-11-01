import { useCallback, useState } from "react";
import { useEffect } from "react";
import { Loader } from "../components";
import { NavLink } from "react-router-dom";
import Planet from "../types/planet";
import "../style/Planets.scss";

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://swapi.dev/api/planets/?page=${page}`
        );
        const result = await response.json();
        setPlanets(result.results);
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
      <section className="planet">
        <ul className="planet__container">
          {planets.map((planet: Planet, index) => (
            <li key={planet.name} className="planet__container--item">
              <NavLink to={`/planet/${index + 1}`} className="name">
                {planet.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={getPrevPage}
          disabled={page <= 1}
          className="planet__container--prev"
        >
          <strong>❮</strong>
        </button>
        <button
          onClick={getNextPage}
          className="planet__container--next"
          disabled={page >= 9}
        >
          <strong>❯</strong>
        </button>
      </section>
    </>
  );
}
