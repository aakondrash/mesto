export default class UserInfo {
  constructor(profileName, profileInfo) {
    this._name = profileName;
    this._info = profileInfo;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      info: this._info.textContent,
    };
    return userInfo;
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._info.textContent = userInfo.job;
  }
}
