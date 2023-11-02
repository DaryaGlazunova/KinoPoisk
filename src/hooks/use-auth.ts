import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AuthService from "../services/auth.service";
import { IntefaceUserState } from "../redux/user/userSlider";

export function useAuth() {
  let tokenDetails: IntefaceUserState = useSelector(
    (state: RootState) => state.user
  );

  if (!tokenDetails.email) {
    tokenDetails = AuthService.checkAutoLogin();
  }

  const { email, id, token } = { ...tokenDetails };

  return {
    isLoggedIn: !!email,
    email,
    id,
    token,
  };
}
