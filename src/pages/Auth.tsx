import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../store/index";
import { useDispatch } from "react-redux";

interface LoginFormInputs {
  login: string;
  password: string;
}

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Сохроняю в локал стор данные для сравнения авторизации
  useEffect(() => {
    localStorage.setItem("login", "admin");
    localStorage.setItem("password", "password");
  }, []);

  //Использование хука useForm
  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const onSubmit = (data: { login: string; password: string }) => {
    if (
      data.login === localStorage.getItem("login") &&
      data.password === localStorage.getItem("password")
    ) {
      dispatch(login());
      navigate("/char");
    }
  };
  return (
    <>
      <section className="auth">
        <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
          <h2 className="text-center">Auth</h2>

          <input
            type="text"
            className="auth__form--login"
            id="name"
            placeholder="Login"
            {...register("login", {
              required: "!!",
            })}
          />

          <input
            type="password"
            className="auth__form--password"
            id="name"
            placeholder="Password"
            {...register("password", {
              required: "!!",
            })}
          />

          <button type="submit" className="auth__form--btn">
            Войти
          </button>
        </form>
      </section>
    </>
  );
}
