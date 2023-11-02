import { IntefaceUserState } from "../redux/user/userSlider";
const localStorageUserAuthDataName = "userDetails";

export function saveTokenInLocalStorage(tokenDetails: IntefaceUserState) {
  localStorage.setItem(
    localStorageUserAuthDataName,
    JSON.stringify(tokenDetails)
  );
}

export function removeTokenFromLocalStorage() {
  localStorage.removeItem(localStorageUserAuthDataName);
}

export function checkAutoLogin() {
  const tokenDetailsString = localStorage.getItem(localStorageUserAuthDataName);
  let tokenDetails = null;

  if (tokenDetailsString) {
    tokenDetails = JSON.parse(tokenDetailsString);
  }

  return tokenDetails;
}
