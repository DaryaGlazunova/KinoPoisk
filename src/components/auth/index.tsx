import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./login";
import RegisterPage from "./register";
import "./_style.scss";
import { useAppDispatch } from "../../redux/store";
import { setUser } from "../../redux/user/userSlider";
import AuthService from "../../services/auth.service";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormValues } from "../../types/auth";
interface AuthRootComponentProps {}

const AuthRootComponent: React.FC<AuthRootComponentProps> = () => {
  const loacation = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    console.log(email, password);
    try {
      const user = await AuthService.login(email, password);
      dispatch(
        setUser({
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
        })
      );
      navigate("/");
    } catch (error) {
      alert("Ошибка при авторизации! " + error);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      const user = await AuthService.register(email, password);
      dispatch(
        setUser({
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
        })
      );
      navigate("/");
    } catch (error) {
      alert("Ошибка при регистрации! " + error);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormValues>();

  const handleSubmitForm: SubmitHandler<IFormValues> = async (data) => {
    console.log("data", data);
    if (location.pathname === "/login") {
      handleLogin(data.email, data.password);
    } else {
      if (data.password === data.confirmPassword) {
        handleRegister(data.email, data.password);
      } else {
        // throw new Error(AppErrors.PasswordDoNotMatch)
      }
    }
  };

  return (
    <div className="auth">
      <div className="auth__background">
        <div className="auth__shape"></div>
        <div className="auth__shape"></div>
      </div>
      <form
        className="auth__form"
        action=""
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        {loacation.pathname === "/login" ? (
          <LoginPage errors={errors} register={register} />
        ) : loacation.pathname === "/register" ? (
          <RegisterPage errors={errors} register={register} />
        ) : null}
      </form>
    </div>
  );
};

export default AuthRootComponent;
