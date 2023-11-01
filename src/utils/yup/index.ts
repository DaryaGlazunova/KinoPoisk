import * as yup from "yup";
import { AuthErrors } from "../../errors";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(AuthErrors.InvalidEmail)
    .required(AuthErrors.RequiredField),
  password: yup
    .string()
    .min(6, AuthErrors.MinLength)
    .required(AuthErrors.RequiredField),
});

export const RegisterFromSchema = yup.object().shape({
  email: yup
    .string()
    .email(AuthErrors.InvalidEmail)
    .required(AuthErrors.RequiredField),
  password: yup
    .string()
    .min(6, AuthErrors.MinLength)
    .required(AuthErrors.RequiredField)
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!@#$%&?]{6,20}$/,
      AuthErrors.InvalidPassword
    ),
  confirmPassword: yup
    .string()
    .min(6, AuthErrors.MinLength)
    .required(AuthErrors.RequiredField)
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!@#$%&?]{6,20}$/,
      AuthErrors.InvalidPassword
    )
    .oneOf([yup.ref("password")], "Passwords must match"),
});
