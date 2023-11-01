import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { checkAutoLogin } from "../utils/auth";

export function useAuth() {
  const { email, id, token } = useSelector((state: RootState) => state.user);

  return {
    isLoggedIn: !!email,
    email,
    id,
    token,
  };
}
