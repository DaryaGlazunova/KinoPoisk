import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface IPropsLogin<TFieldValues extends IFormValues = IFormValues> {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}

export interface IFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IPropsRegister<
  TFieldValues extends IFormValues = IFormValues
> {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  email: string;
  password: string;
}
