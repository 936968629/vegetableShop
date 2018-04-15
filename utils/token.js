import { Config } from 'config.js';
class Token {
  constructor() {
    this.tokenUrl = Config.resturl + 'token/user';
    this.verifyUrl = Config.restUrl + 'token/verify';
  }
  verify() {
    var token = wx.getStorageSync('token');
    if (!token) {
      //从服务器获取令牌
      this.getTokenFromServer();
    }
    this._verifyFromServer(token);
  }
  //从服务器获取token
  getTokenFromServer(callback) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          data: {
            code: res.code,
          },
          header:{
            'content-type': 'application/json',
          },
          success: function (res) {
            //console.log("token:" + res.data.token);
            wx.setStorageSync('token', res.data.token);
            callback && callback(res.data.token);
          },

        })
      }
    });
  }
  //校验token
  _verifyFromServer(token) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token: token,
      },
      success: function (res) {
        var valid = res.data.isValid;
        if (!valid) {
          //校验失败，重新获取
          that.getTokenFromServer();
        }
      }
    });
  }
}
export { Token };
