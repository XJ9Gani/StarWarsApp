import "bootstrap/dist/css/bootstrap.min.css";
import { AppRouter, Header } from "./components";
import { useLocation } from "react-router-dom";
import "./style/Common.scss";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  const location = useLocation();
  const isAuth = location.pathname === "/";
  return (
    <>
      <section className="bg">
        <Provider store={store}>
          {!isAuth && <Header />}
          <AppRouter />
        </Provider>
      </section>
    </>
  );
}

export default App;
