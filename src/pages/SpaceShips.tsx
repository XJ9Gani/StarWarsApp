import { useCallback, useState } from "react";
import { useEffect } from "react";
import { Loader } from "../components";
import "../style/Ship.scss";
import { NavLink } from "react-router-dom";
import Ship from "../types/spaceships";
export default function SpaceShip() {
  const [ships, setShips] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://swapi.dev//api/starships/?page=${page}`
        );
        const result = await response.json();
        setShips(result.results);
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
      <section className="ship">
        <ul className="ship__container">
          {ships.map((ships: Ship, index) => (
            <li key={ships.name} className="ship__container--item">
              <NavLink to={`/spaceship/${index + 1}`} className="name">
                {ships.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={getPrevPage}
          disabled={page <= 1}
          className="ship__container--prev"
        >
          <strong>❮</strong>
        </button>
        <button
          onClick={getNextPage}
          className="ship__container--next"
          disabled={page >= 9}
        >
          <strong>❯</strong>
        </button>
      </section>
    </>
  );
}
