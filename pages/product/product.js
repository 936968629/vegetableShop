// pages/product/product.js
import {Product} from "productModel.js";
import {Cart} from "../cart/cartModel.js";
var product = new Product();
var cart = new Cart();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productCount:1,
    currentTabsIndex:0,
    countsArr:[1,2,3,4,5,6,7,8,9,10],
    hide_good_box:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id = options.id;
      this._loadData(id);
      this.setData({
        'cartTotalCounts': cart.getCartTotalCounts(),
      });
  },

  // onReady:function(){
  // },

  _loadData:function(id){
    product.getDetailInfo(id,(res)=>{
      // console.log(res);
      this.setData({
        'product':res
      });
    });
  },
  //下拉框选择
  bindPickerChange:function(event){
    var index = event.detail.value;//数组下标
    var selectedCount = this.data.countsArr[index];
    // console.log(selectedCount);
    this.setData({
      'productCount': selectedCount,
    });
  },
  //tab选项卡切换
  onTabsItemTap:function(event){
    var index = product.getDataSet(event,'index');
    this.setData({
      'currentTabsIndex':index
    });
  },
  //加入购物车
  onAddingToCard:function(e){
    //动画效果
    this.finger = {}; var topPoint = {};
    this.finger['x'] = e.touches["0"].clientX;
    this.finger['y'] = e.touches["0"].clientY;
    topPoint = this.gettTopPoint();

    this.linePos = app.bezier([this.finger, topPoint], 30);

    this.startAnimation();
    this.addToCard();
    setTimeout(()=>{
      //即时修改购物车数量
      this.setData({
        'cartTotalCounts': cart.getCartTotalCounts(),
      });
    },1000)
    
  },
  addToCard: function () {
    var tempObj = {};
    var keys = ['id', 'name', 'main_img_url', 'price'];
    for (var key in this.data.product) {
      if (keys.indexOf(key) >= 0) {
        tempObj[key] = this.data.product[key];
      }
    }
    cart.add(tempObj, this.data.productCount);
  },
  //跳到购物车页面
  ToCart:function(e){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  startAnimation: function () {
    var index = 0, that = this,
      bezier_points = that.linePos['bezier_points'];
    this.setData({
      hide_good_box: false,
      bus_x: that.finger['x'],
      bus_y: that.finger['y']
    })
    this.timer = setInterval(function () {
      index++;
      that.setData({
        bus_x: bezier_points[index]['x'],
        bus_y: bezier_points[index]['y']
      })
      if (index >= 28) {
        clearInterval(that.timer);
        that.setData({
          hide_good_box: true,
          hideCount: false,
          count: that.data.count += 1
        })
      }
    }, 33);
  },
  //获取停止动画坐标
  gettTopPoint:function(){
    var ww = app.globalData.ww;
    var hh = app.globalData.hh;
    var topPoint = {};
    topPoint['x'] = ww - 38;
    topPoint['y'] = 18;
    // if(ww > 400){
    //   topPoint['x'] = ww-38;
    //   topPoint['y'] = 18;
    // }else if(ww <= 400 && ww>370){
    //   topPoint['x'] = ww - 38;
    //   topPoint['y'] = 18;
    // }else if(ww <= 370){
    //   topPoint['x'] = ww-38;
    //   topPoint['y'] = 18;
    // }
    return topPoint;
  }
})