import { useRoutes } from "react-router-dom";
import {
  Characters,
  Auth,
  Planets,
  SpaceShips,
  CharacterPage,
  PlanetPage,
  SpaceShipsPage,
} from "../pages";

export default function AppRouter() {
  const routes = useRoutes([
    { path: "/", element: <Auth /> },
    { path: "/char", element: <Characters /> },
    { path: "/planet", element: <Planets /> },
    { path: "/spaceship", element: <SpaceShips /> },
    { path: "/character/:id", element: <CharacterPage /> },
    { path: "/planet/:id", element: <PlanetPage /> },
    { path: "/spaceship/:id", element: <SpaceShipsPage /> },
  ]);

  return routes;
}
