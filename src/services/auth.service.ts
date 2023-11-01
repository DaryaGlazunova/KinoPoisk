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
  console.log("user", user);
  saveUserTokenToLocalStorage({
    email: user.email,
    id: user.uid,
    token: user.refreshToken,
  });
  console.log("save in LS", user);
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

const AuthService = {
  register,
  login,
  removeUserTokenFromLocalStorage,
  saveUserTokenToLocalStorage,
};

export default AuthService;
