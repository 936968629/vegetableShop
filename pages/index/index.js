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

  _loadData:function(){
    index.getBannerData(1,(res)=>{
      console.log(res);
    })
  }



})