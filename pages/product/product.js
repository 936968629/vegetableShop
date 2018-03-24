// pages/product/product.js
import {Product} from "productModel.js";
var product = new Product();
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
      var id = options.id;
      this._loadData(id);
  },

  onReady:function(){

  },

  _loadData:function(id){

  }
 


})