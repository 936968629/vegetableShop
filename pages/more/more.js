// pages/more/more.js
import {More} from "./moreModel.js";
var more = new More();
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
    var type = options.type;
    if(type === 'hot'){
      type = '最热商品';
    }else if(type === 'new'){
      type = '最新商品';
    }else if(type === 'all'){
      type = '所有商品';
    }else{
      type = '商品查找';
    }
    wx.setNavigationBarTitle({
      title: type,
    });
    this._loadData(type);
  },

  _loadData:function(type){
    var page = 1;
    more.getData(type,page,(res)=>{
      console.log(res);
      this.setData({
        'allProducts':res
      });
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

})