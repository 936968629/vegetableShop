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
    id:null,
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

  onShow:function(){
    if (this.data.id) {
      this._fromOrder(this.data.id);
    }
  },
  _fromOrder: function (id) {
    if (id) {
      var that = this;
      //下单后，支付成功或者失败后，点左上角返回时能够更新订单状态 所以放在onshow中
      // var id = this.data.id;
      order.getOrderInfoById(id, (data) => {
        that.setData({
          orderStatus: data.status,
          productsArr: data.snap_items,
          account: data.total_price,
          basicInfo: {
            orderTime: data.create_time,
            orderNo: data.order_no
          },
        });

        // 快照地址
        var addressInfo = data.snap_address;
        addressInfo.totalDetail = address.setAddressInfo(addressInfo);
        that._bindAddress(addressInfo);
      });
    }
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

        address.submitAddress(res, (flag) => {
          if (!flag) {
            that.showTips('操作提示', '地址信息更新失败');
          }
        });
      }
    });
  },
  //地址数据绑定
  _bindAddress: function (addressInfo) {
    this.setData({
      'addressInfo': addressInfo
    });
  },
  //去付款
  pay:function(event){
    if (!this.data.addressInfo){
      this.showTips('下单提示','请填写收货地址');
      return;
    }
    if (this.data.orderStatus == 0){
      //下单页面支付
      this._firstTimePay();
    }else{
      //已创建订单
      this._oneMoreTimePay();
    }
  },
  /*第一次支付*/
  _firstTimePay: function () {
    var orderInfo = [],
      procuctInfo = this.data.productsArr;
    for (let i = 0; i < procuctInfo.length; i++) {
      orderInfo.push({
        product_id: procuctInfo[i].id,
        count: procuctInfo[i].counts
      });
    }
    var that = this;
    //支付分两步，第一步是生成订单号，然后根据订单号支付
    order.doOrder(orderInfo, (data) => {
      //订单生成成功
      if (data.pass && !data.hasOwnProperty('pro_status') ) {
        //更新订单状态
        var id = data.order_id;
        that.data.id = id;
        // that.data.fromCartFlag = false;
        //开始支付
        that._execPay(id);
      } else {
        if ( data.hasOwnProperty('pro_status') ){
          this.showTips('下单失败',data.name_status+'商品已下架');
        }else{
          that._orderFail(data);  // 下单失败 库存不足
        }
        
      }
    });
  },
  /*
  *开始支付
  * params: id - {int}订单id
  */
  _execPay: function (id) {
    var that = this;
    order.execPay(id, (statusCode) => {
      if (statusCode != 0) {
        //将已经下单的商品从购物车删除
        that.deleteProducts();
        var flag = statusCode == 2;
        wx.navigateTo({
          url: '../pay-result/pay-result?id=' + id
          + '&flag=' + flag + '&from=order'
        });
      }
    });
  },
  //将已经下单的商品从购物车删除
  deleteProducts: function () {
    var ids = [], arr = this.data.productsArr;
    for (let i = 0; i < arr.length; i++) {
      ids.push(arr[i].id);
    }
    cart.delete(ids);
  },
  /*
  *下单失败
  * params:
  * data - {obj} 订单结果信息
  * */
  _orderFail: function (data) {
    var nameArr = [],
      name = '',
      str = '',
      pArr = data.pStatusArray;
    for (let i = 0; i < pArr.length; i++) {
      if (!pArr[i].haveStock) {
        name = pArr[i].name;
        if (name.length > 15) {
          name = name.substr(0, 12) + '...';
        }
        nameArr.push(name);
        if (nameArr.length >= 2) {
          break;
        }
      }
    }
    str += nameArr.join('、');
    if (nameArr.length > 2) {
      str += ' 等';
    }
    str += ' 缺货';
    wx.showModal({
      title: '下单失败',
      content: str,
      showCancel: false,
      success: function (res) {
      }
    });
  },
  /*
  * 提示窗口
  * params:
  * title - {string}标题
  * content - {string}内容
  * flag - {bool}是否跳转到 "我的页面"
  */
  showTips: function (title, content, flag) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success: function (res) {
        if (flag) {
          wx.switchTab({
            url: '/pages/my/my'
          });
        }
      }
    });
  },
  
})