import { NavLink } from "react-router-dom";
import "../style/Header.scss";
import { useCallback } from "react";
export default function Header() {
  const activeLinkHandler = useCallback(
    ({ isActive }: any) =>
      isActive ? `container__link link_active` : `container__link not-active`,
    []
  );

  return (
    <header className="header">
      <nav className="container">
        <NavLink to="/char" className={activeLinkHandler}>
          Characters
        </NavLink>
        <NavLink to="/planet" className={activeLinkHandler}>
          Planets
        </NavLink>
        <NavLink to="/spaceship" className={activeLinkHandler}>
          SpaceShips
        </NavLink>
      </nav>
    </header>
  );
}
