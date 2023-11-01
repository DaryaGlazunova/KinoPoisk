import React from "react";
import { Link } from "react-router-dom";
import { IPropsRegister } from "../../../types/auth";
import { TextField } from "@mui/material";

const RegisterPage: React.FC<IPropsRegister> = (props: IPropsRegister) => {
  const { register, errors } = props;

  return (
    <>
      <h3 className="auth__title">Регистрация</h3>
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
        {...register("password", { required: true, minLength: 6 })}
      />

      <TextField
        error={!!errors.confirmPassword}
        type="confirmPassword"
        className="auth__input"
        fullWidth={true}
        margin="normal"
        label="confirmPassword"
        variant="outlined"
        placeholder="Повторите ваш пароль"
        helperText={
          errors.confirmPassword ? `${errors.confirmPassword.message}` : ""
        }
        {...register("confirmPassword", { required: true, minLength: 6 })}
      />

      <button type="submit" className="auth__button">
        Регистрация
      </button>
      <div className="auth__bottom">
        <Link to={"/login"}>Уже есть аккаунт?</Link>
      </div>
    </>
  );
};

export default RegisterPage;
