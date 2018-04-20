// pages/my/my.js
import {My} from './myModel.js';
var my = new My();
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
  
  },

 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  //跳转到我的订单
  toMyorder:function(event){
    // var id = my.getDataSet(event,'id');
    wx.navigateTo({
      url: '../my-order/my-order',
    })
  }

})