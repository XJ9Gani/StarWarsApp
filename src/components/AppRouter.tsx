import { useRoutes } from "react-router-dom";
import {
  Characters,
  Auth,
  Planets,
  SpaceShips,
  EntityDetailPage,
} from "../pages";
export default function AppRouter() {
  const routes = useRoutes([
    { path: "/", element: <Auth /> },
    { path: "/char", element: <Characters /> },
    { path: "/planet", element: <Planets /> },
    { path: "/spaceship", element: <SpaceShips /> },
    { path: "/entety", element: <EntityDetailPage /> },
  ]);

  return routes;
}
