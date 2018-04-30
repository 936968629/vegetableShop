// pages/my/my.js
import {My} from './myModel.js';
import {Address} from '../../utils/address.js';
var my = new My();
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
    this._loadData();
    this._getAddressInfo();
  },
  _loadData:function(){
    my.getUserInfo( (data)=>{
      this.setData({
        userInfo:data
      })
    });
  },
  _getAddressInfo:function(){
    address.getAddress((addressInfo) => {
      this._bindAddressInfo(addressInfo);
    });
  },
  /*绑定地址信息*/
  _bindAddressInfo: function (addressInfo) {
    this.setData({
      addressInfo: addressInfo
    });
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
  },
  //地址管理
  editAddress: function (event) {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        console.log(res);
        var addressInfo = {
          name: res.userName,
          mobile: res.telNumber,
          totalDetail: address.setAddressInfo(res)
        }

        that._bindAddressInfo(addressInfo);

        //保存地址
        address.submitAddress(res, (flag) => {
          if (!flag) {
            that.showTips('操作提示', '地址信息更新失败！');
          }
        });
      }
    })
  }
})