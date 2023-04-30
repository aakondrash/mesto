export default class UserInfo {
  constructor(profileName, profileInfo, userId, profileAvatar) {
    this._name = profileName;
    this._info = profileInfo;
    this._id = userId;
    this._avatar = profileAvatar;
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

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
