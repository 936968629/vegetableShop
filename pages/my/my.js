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
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:{
      avatarUrl: '../../imgs/icon/user@default.png',
      nickName: '未授权'
    },
    showbtn:true
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
      console.log(data)
      var mysign = false
      if ( !data.hasOwnProperty('sign') ){
        mysign = true
      }
      this.setData({
        userInfo: data,
        showbtn: mysign
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
    this._getmessCount();
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
  },
  //获取消息数量
  _getmessCount:function(){
    my.getMessageNumber((data) => {
      console.log(data)
      this.setData({
        messageCount:data.num
      })
    })
  },
  toMymessage:function(){
    wx.navigateTo({
      url: '../my-message/my-message',
    })
  },
  //用户授权
  bindGetUserInfo:function(e){
    console.log(e)
    var mysign = false;
    if ( e.detail.hasOwnProperty('userInfo') ){
      mysign = true
    }
    this.setData({
      userInfo:e.detail.userInfo,
      showbtn:mysign
    })
  }
})