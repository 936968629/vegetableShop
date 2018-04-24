// pages/index-search/index-search.js
import {Base} from '../../utils/base.js';
var base = new Base();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'name':'',

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
    var searchData = wx.getStorageSync('searchData') || []
    console.log(searchData)
    if(searchData.length != 0){
      this.setData({
        'getSearch':searchData
      });
    }
  },
  //查询
  more: function (event) {
    var type = base.getDataSet(event, 'type');
    var keyword = this.data.name;
    var url = '../more/more?type=' + type;
    if (type === 'search') {
      if (keyword !== '') {
        url += '&name=' + keyword;
      }
    }
    //保存至缓存里面
    let data;
    let localStorageValue = [];
    if (this.data.name != '') {
      //调用API从本地缓存中获取数据
      var searchData = wx.getStorageSync('searchData') || []

      this.changeSort(searchData,this.data.name);
      // searchData.push(this.data.name)

      // wx.setStorageSync('searchData', searchData)
    }
    // wx.navigateTo({
    //   url: url,
    // });
  },
  listenerNameInput: function (e) {
    this.setData({
      'name': e.detail.value
    });
  },
  //清空浏览记录
  clearSearchStorage:function(e){

  },
  //标签点击
  tagSearch:function(e){

  },
  //改变数组的顺序
  changeSort:function(arr,needle){
    var flag = this.isInArray(arr,needle);
    console.log(flag);
  },
  isInArray:function(arr, value){
    for(var i = 0; i<arr.length; i++){
      if (this.Trim(value,'g') === arr[i]) {
        return true;
      }
    }
    return false;
  },
  Trim: function (str, is_global){
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g") {
      result = result.replace(/\s/g, "");
    }
    return result;
  }
  


})