// pages/product/product.js
import {Product} from "productModel.js";
import {Cart} from "../cart/cartModel.js";
var product = new Product();
var cart = new Cart();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productCount:1,
    currentTabsIndex:0,
    countsArr:[1,2,3,4,5,6,7,8,9,10]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id = options.id;
      this._loadData(id);
  },

  onReady:function(){

  },

  _loadData:function(id){
    product.getDetailInfo(id,(res)=>{
      console.log(res);
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
  onAddingToCard:function(){
    this.addToCard();
    //即时修改购物车数量
    this.setData({
      'cartTotalCounts': cart.getCartTotalCounts(),
    });
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
})