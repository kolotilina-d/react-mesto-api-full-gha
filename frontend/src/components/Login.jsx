import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.email, values.pass);
  }

  return (
    <section className="login">
      <Link to="/sign-up" className="login__to-registration">
        Регистрация
      </Link>
      <h2 className="login__title">Вход</h2>
      <form className="login__form" name="login" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          className="login__input"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
        />
        <input
          name="pass"
          type="password"
          className="login__input"
          placeholder="Пароль"
          value={values.pass || ""}
          autoComplete="on"
          onChange={handleChange}
        />
        <input type="submit" className="login__submit" value={"Войти"} />
      </form>
    </section>
  );
}
