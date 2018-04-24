// pages/index/index.js
import {Index} from 'indexModel.js';
var index = new Index();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
    this._loadHotProduct();
    this._loadNewProduct();
  },
  //加载幻灯片...
  _loadData:function(){
    index.getBannerData(1,(res)=>{
      // console.log(res);
      this.setData({
        'bannerData':res
      });
    });
    index.getThemeData((res)=>{
      // console.log(res);
      this.setData({
        'themeData':res
      });
    });
  },

  //加载最热商品
  _loadHotProduct:function(){
    index.getHotData((res)=>{
      // console.log(res);
      this.setData({
        'hotData':res
      });
    });
  },
  //加载最新商品
  _loadNewProduct:function(){
    index.getNewData((res)=>{
      console.log(res);
      this.setData({
        'newData':res
      });
    });
  },
  //轮播\新品点击事件
  onProductsItemTap: function (event) {
    // console.log(event);
    var id = index.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id,
    });
  },
  onThemesItemTap:function(event){
    var id = index.getDataSet(event, 'id');
    var name = index.getDataSet(event,'name');
    wx.navigateTo({
      url: '../theme/theme?id='+id+'&name='+name,
    })
  },
  more:function(event){
    var type = index.getDataSet(event,'type');
    var keyword = this.data.name;
    var url = '../more/more?type=' + type;
    if(type === 'search'){
      if (keyword !== '') {
        url += '&name=' + keyword;
      }
    }
    wx.navigateTo({
      url: url,
    });
  },
  listenerNameInput:function(e){
    this.setData({
      'name':e.detail.value
    });
  },
  listenerFocusInput:function(e){
    wx.navigateTo({
      url: '../index-search/index-search',
    })
  },
  // onPullDownRefresh:function(){
  //   // wx.stopPullDownRefresh();
  //   wx.showToast({

  //     title: '没事儿别乱拉',//提示信息

  //     icon: 'success',//成功显示图标

  //     duration: 1000//时间

  //   })
  // },
  onReady:function(){
    wx.setNavigationBarTitle({
      title: 'aa',
    });
  }
})