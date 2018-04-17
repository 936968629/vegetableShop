import {Token} from "/utils/token.js";
App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var token = new Token();
    //获取token
    token.getTokenFromServer();

    this.screenSize();
  },
  screenSize: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var ww = res.windowWidth;
        var hh = res.windowHeight;
        that.globalData.ww = ww;
        that.globalData.hh = hh;
      }
    })
  },
  //购物车运动轨迹
  bezier: function (points, times) {
    var bezier_points = [];
    var start_points = points[0];
    var end_points = points[1];
    var distanceX = end_points['x']-start_points['x'];
    var distanceY = Math.abs(end_points['y']-start_points['y']);
    for (var i = 1; i < times; i++){
      var per_x = distanceX /30;
      var per_y = distanceY /30;
      var point_F = {};
      point_F['x'] = start_points['x'] + per_x * i;
      point_F['y'] = start_points['y'] - per_y * i;
      bezier_points.push(point_F);
    }
    bezier_points.push(end_points);
    return {
      'bezier_points': bezier_points
    };
  },
  globalData: {
    
  },  
});