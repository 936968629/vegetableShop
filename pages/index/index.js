// pages/index/index.js
import {Index} from 'indexModel.js';
var index = new Index();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },
  //加载幻灯片
  _loadData:function(){
    index.getBannerData(1,(res)=>{
      console.log(res);
      this.setData({
        'bannerData':res
      });
    })
  },
  //加载最热商品
  _loadHotProduct:function(){

  },

  onPullDownRefresh:function(){
    // wx.stopPullDownRefresh();
    console.log(1);
    wx.showToast({

      title: '没事儿别乱拉',//提示信息

      icon: 'success',//成功显示图标

      duration: 1000//时间

    })
  }
})