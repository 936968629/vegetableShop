import {Base} from '../../utils/base.js';
class My extends Base{
  constructor(){
    super();
  }
  //得到用户微信信息
  getUserInfo(cb) {
    var that = this;
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            typeof cb == "function" && cb(res.userInfo);
          },
          fail: function (res) {
            typeof cb == "function" && cb({
              avatarUrl: '../../imgs/icon/user@default.png',
              nickName: '未授权',
              sign:false,
            });
          }
        });
      },

    })
  }
  //获取未读消息条数
  getMessageNumber(callback){
    var params = {
      url: 'message/num',
      sCallback: function (res) {
        callback && callback(res);
      },
    };
    this.request(params);
  }
}
export {My}