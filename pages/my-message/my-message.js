// pages/my-message/my-message.js
import {MyMessage} from './myMessageModel.js';
var myMessgae = new MyMessage()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
    messageData:[],
    nodata:false
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
      var arr = data.data;
      if(arr.length > 0){
        var allMessage = this.data.messageData.concat(arr)
        this.setData({
          messageData:allMessage,
          page:this.data.page++
        })
      }else{
        this.setData({
          nodata: true
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._show(this.data.page)
  },

})