// pages/my-message/my-message.js
import {MyMessage} from './myMessageModel.js';
var myMessgae = new MyMessage()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,

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
    this._show(this.data.page);
  },

  _show:function(page){
    myMessgae.getData(page,10,(data)=>{
      console.log(data)
      if(data.length > 0){
        this.setData({
          
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})