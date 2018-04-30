// pages/my-order/my-order.js 我的订单
import {MyOrder} from "./myOrderModel.js";
var myOrder = new MyOrder();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:1,
    orderArr:[],
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
    this._getOrders();
  },
  _getOrders: function (callback) {
    myOrder.getOrders(this.data.pageIndex, (res) => {
      var data = res.data;
      console.log(data)
      if (data.length > 0) {
        this.data.orderArr.push.apply(this.data.orderArr, data);
        this.setData({
          orderArr: this.data.orderArr
        });
      }
      else {
        this.data.isLoadedAll = true;
      }
      callback && callback();
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

})