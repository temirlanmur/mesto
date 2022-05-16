export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector, profileAvatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(profileDescriptionSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  // returns user data
  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      profileDescription: this._profileDescription.textContent
    };
  }

  // sets user data
  setUserInfo({ profileName, profileDescription }) {
    this._profileName.textContent = profileName;
    this._profileDescription.textContent = profileDescription;
  }

  // sets user avatar
  setAvatar(avatarLink) {
    this._profileAvatar.src = avatarLink;
  }
}
