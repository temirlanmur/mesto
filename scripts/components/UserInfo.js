export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(profileDescriptionSelector);
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
}
