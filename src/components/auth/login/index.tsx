import React from "react";

import { Link } from "react-router-dom";
// import { useInput } from "../../../hooks/use-input";
import { TextField } from "@mui/material";
import { IPropsLogin } from "../../../types/auth";

const LoginPage: React.FC<IPropsLogin> = (props: IPropsLogin) => {
  const { register, errors } = props;

  return (
    <>
      <h3 className="auth__title">Вход</h3>
      <TextField
        error={!!errors.email}
        fullWidth={true}
        margin="normal"
        className="auth__input"
        label="Email"
        variant="outlined"
        placeholder="Введите ваш email"
        helperText={errors.email ? `${errors.email.message}` : ""}
        {...register("email", { required: true })}
      ></TextField>
      <TextField
        error={!!errors.password}
        type="password"
        fullWidth={true}
        className="auth__input"
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Введите ваш пароль"
        helperText={errors.password ? `${errors.password.message}` : ""}
        {...register("password", { required: true })}
      />

      <button className="auth__button" type="submit">
        Вход
      </button>
      <div className="auth__bottom">
        <Link to={"/register"}>Регистрация</Link>
        <Link to={"/password-recovery"}>Забыли пароль?</Link>
      </div>
    </>
  );
};

export default LoginPage;
