// pages/my-order/my-order.js 我的订单
import {MyOrder} from "./myOrderModel.js";
import {Order} from "../order/orderModel.js";
var myOrder = new MyOrder();
var order = new Order();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:0,
    orderArr:[],
    nodata:false,
    timeArr:[],
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
    var newOrderFlag = order.hasNewOrder(); 
    if( newOrderFlag == true){
      this._getOrders();
    }
    
  },
  _getOrders: function (callback) {
    myOrder.getOrders(this.data.pageIndex, (res) => {
      var data = res.data;
      var tiArr = {};
      console.log(data)
      
      if (data.length > 0) {
        this.data.orderArr.push.apply(this.data.orderArr, data);

        // for (let i in this.data.orderArr){
        //   var currentData = this.data.orderArr[i];
        //   if(currentData['status'] == 1){
        //     tiArr[i] = currentData['end_time']
        //   }
        // }
        // this.tfunc(this.data.orderArr);
        this.setData({
          orderArr: this.data.orderArr
        });
        var timer = setInterval(this.tfunc, 1000);
      }
      else {
        console.log("nodata")
        this.setData({
          nodata:true
        })
      }
      console.log(tiArr)
      
      this.setData({
        pageIndex:this.data.pageIndex+1,
      })
      callback && callback();
    })
  },
  //确认收货
  confirmreceive:function(e){
    var id = myOrder.getDataSet(e,'id');
    var uid = myOrder.getDataSet(e,'uid');
    var orderArrm = this.data.orderArr;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认收货?',
      success:function(res){
        if (res.confirm) {
          myOrder.editOrderStatus(id,uid,(data)=>{
            console.log(data)
            if(data.code == 1){
              //修改成功
              for (var i in orderArrm){
                if (orderArrm[i]['id'] == data.id){
                  orderArrm[i]['status'] = 5;
                }
              }
              that.setData({
                orderArr: orderArrm
              })
            }
          })
        
        } else if (res.cancel) {
        
        }
      }
    })
  },
  //订单详情
  showOrderDetailInfo:function(e){
    var id = myOrder.getDataSet(e, 'id');
    wx.navigateTo({
      url: '../order/order?from=order&id='+ id,
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
  //去付款
  rePay:function(e){
    var id = myOrder.getDataSet(e, 'id');
    wx.navigateTo({
      url: '../order/order?from=order&id=' + id,
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getOrders();
  },
  //时间处理函数
  tfunc:function(){
    var tiArr = {};
    var ntim = new Date(); //当前时间戳 
    for (let i in this.data.orderArr){
      let timstr;
      var currentData = this.data.orderArr[i];
      if(currentData['status'] == 1){
        tiArr[i] = currentData['end_time']
        timstr = currentData['end_time']
        var _tm = timstr.replace(/-/g, '\/'); //目标时间字段串里的-替换成/,格式化的需要 
        var ftim = new Date(_tm); //格式化目标时间 
        var rs = this.timGap(ntim.getTime(), ftim.getTime()); //调用取时间差方法 
        //var _str = rs.d + '天' + rs.h + '小时' + rs.m + '分钟' + rs.s + '秒'; //将返回的数据拼接字符串
        var _str = rs.h + ':' + rs.m + ':' + rs.s;
        this.data.orderArr[i]['timedown'] = _str;
      }
    }
    this.setData({
      orderArr: this.data.orderArr
    });
  },
  //取时间差方法 
  timGap:function (ntim, ftim) {
    var date3 = ftim - ntim; //时间差值毫秒数 
    var days = Math.floor(date3 / (24 * 3600 * 1000)); //取天数 
    var level1 = date3 % (24 * 3600 * 1000);//取天数后剩下的毫秒数 
    var hours = Math.floor(level1 / (3600 * 1000)); //取小时数 
    var level2 = level1 % (3600 * 1000);//取小时后剩下的毫秒数 
    var minutes = Math.floor(level2 / (60 * 1000));//取分钟 

    var level3 = level2 % (60 * 1000);//取分钟后剩下的毫秒数 
    var seconds = Math.floor(level3 / 1000);//取秒 
    //定义对象 
    var tim = {};
    //赋值 
    tim['d'] = days;
    tim['h'] = hours;
    tim['m'] = minutes;
    tim['s'] = seconds;
    return tim; //返回数据 
  } 

  
})