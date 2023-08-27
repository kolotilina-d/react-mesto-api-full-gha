import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegistration }) {
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
    onRegistration(values.email, values.pass);
  }

  return (
    <section className="login">
      <Link to="/sign-in" className="login__to-registration">
        Вход
      </Link>
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" name="register" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          className="login__input"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <input
          name="pass"
          type="password"
          autoComplete="on"
          className="login__input"
          placeholder="Пароль"
          value={values.pass || ""}
          onChange={handleChange}
          required
        />
        <input
          type="submit"
          className="login__submit"
          value={"Зарегистрироваться"}
        />
      </form>
      <span className="login__text">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="login__link">
          Войти
        </Link>
      </span>
    </section>
  );
}
