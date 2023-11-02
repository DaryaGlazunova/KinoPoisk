import React from "react";
import ProfileImage from "../../assets/icons/header/profile-user-account.png";
import "./_style.scss";

interface ProfilePopupInterfaceProps {
  userEmail: string | null;
  logOut: () => void;
}

const ProfilePopup: React.FC<ProfilePopupInterfaceProps> = ({
  userEmail,
  logOut,
}) => {
  return (
    <div className="profile-popup">
      <div className="profile-popup__container">
        <h3 className="profile-popup__user-email">{userEmail}</h3>
        <div className="profile-popup__body">
          <div className="profile-popup__favorites">Избранное</div>
        </div>
        <button
          className="profile-popup__logout-button"
          onClick={() => logOut()}
        >
          Выход
        </button>
      </div>
    </div>
  );
};

export default ProfilePopup;
