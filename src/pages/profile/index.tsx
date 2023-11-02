import React from "react";
import ProfileImage from "../../assets/icons/header/profile-user-account.png";
import "./_index.scss";
import ProfilePopup from "../../components/profile-popup";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { removeUser } from "../../redux/user/userSlider";
import AuthService from "../../services/auth.service";

const Profile: React.FC = () => {
  const [hiddenPopup, setHidden] = React.useState(true);

  const dispatch = useAppDispatch();
  const userEmail = useSelector((state: RootState) => state.user.email);

  const logOut = () => {
    dispatch(removeUser());
    AuthService.removeUserTokenFromLocalStorage();
  };

  return (
    <div className="profile">
      <img
        onMouseEnter={() => setHidden(false)}
        className="profile__image"
        src={ProfileImage}
        alt=""
      />
      <div
        className="profile__popup"
        onMouseLeave={() => setHidden(true)}
        hidden={hiddenPopup}
      >
        <ProfilePopup userEmail={userEmail} logOut={logOut} />
      </div>
    </div>
  );
};

export default Profile;
