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
    this._loadHotProduct();
    this._loadNewProduct();
  },
  //加载幻灯片...
  _loadData:function(){
    index.getBannerData(1,(res)=>{
      console.log(res);
      this.setData({
        'bannerData':res
      });
    });
    index.getThemeData((res)=>{
      console.log(res);
      this.setData({
        'themeData':res
      });
    });
  },

  //加载最热商品
  _loadHotProduct:function(){
    index.getHotData((res)=>{
      console.log(res);
      this.setData({
        'hotData':res
      });
    });
  },
  //加载最新商品
  _loadNewProduct:function(){

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