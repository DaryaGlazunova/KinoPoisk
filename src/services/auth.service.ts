import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import firebaseApp from "../firebase";
import { IntefaceUserState } from "../redux/user/userSlider";

const localStorageUserAuthDataName = "userDetails";

const register = async (email: string, password: string) => {
  const auth = getAuth(firebaseApp);
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};

const login = async (email: string, password: string) => {
  const auth = getAuth(firebaseApp);
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  saveUserTokenToLocalStorage({
    email: user.email,
    id: user.uid,
    token: user.refreshToken,
  });
  return user;
};

function removeUserTokenFromLocalStorage() {
  localStorage.removeItem(localStorageUserAuthDataName);
}
function saveUserTokenToLocalStorage(tokenDetails: IntefaceUserState) {
  localStorage.setItem(
    localStorageUserAuthDataName,
    JSON.stringify(tokenDetails)
  );
}

function checkAutoLogin() {
  const tokenDetailsString = localStorage.getItem(localStorageUserAuthDataName);

  let tokenDetails = { email: null, id: null, token: null };

  if (tokenDetailsString) {
    tokenDetails = JSON.parse(tokenDetailsString);
  }

  return tokenDetails;
}

const AuthService = {
  register,
  login,
  removeUserTokenFromLocalStorage,
  saveUserTokenToLocalStorage,
  checkAutoLogin,
};

export default AuthService;
