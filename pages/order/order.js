// pages/order/order.js
import {Order} from "./orderModel.js";
import {Cart} from "../cart/cartModel.js";
import {Address} from "../../utils/address.js";
var order = new Order();
var cart = new Cart();
var address = new Address();
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
    //接受传递的参数
    this.data.account = options.account;
    var productArr;
    productArr = cart.getCartDataFromLocal(true);
    // console.log(productArr);
    this.setData({
      'productsArr': productArr,
      'account': options.account,
      'orderStatus': 0
    });
    address.getAddress((res) => {
      this._bindAddress(res);
    });
  },
  //微信里修改地址
  editAddress: function (event) {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        // console.log(res);
        var addressInfo = {
          'name': res.userName,
          'mobile': res.telNumber,
          'totalDetail': address.setAddressInfo(res),
        };
        that._bindAddress(addressInfo);

        // address.submitAddress(res, (flag) => {
        //   if (!flag) {
        //     that.showTips('操作提示', '地址信息更新失败');
        //   }
        // });
      }
    });
  },
  //地址数据绑定
  _bindAddress: function (addressInfo) {
    this.setData({
      'addressInfo': addressInfo
    });
  },

})