// pages/theme/theme.js
import {Theme} from "themeModel.js";
var theme = new Theme();
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
      var name = options.name;
      this.data.name = name;
      
      this._onload(id);
  },

  onReady:function(){
    wx.setNavigationBarTitle({
      title: this.data.name,
    })
  },

  //加载数据
  _onload:function(id){
    theme.getThemeData(id,(res)=>{
      console.log(res);
      this.setData({
        'themeInfo':res
      });
    });
  },
  //商品点击事件
  onProductsItemTap: function (event) {
    // console.log(event);
    var id = theme.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id,
    });
  },
})