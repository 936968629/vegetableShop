import {Token} from "/utils/token.js";
App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var token = new Token();
    //获取token
    token.getTokenFromServer();
  },
  
});