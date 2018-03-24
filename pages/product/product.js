// pages/product/product.js
import {Product} from "productModel.js";
var product = new Product();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productCount:1,
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
  }
 


})