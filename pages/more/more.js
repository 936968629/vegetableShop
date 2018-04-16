// pages/more/more.js
import {More} from "./moreModel.js";
var more = new More();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    showMore:false,
    page:1,
    type:'',
    allProducts:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
    var keyword = options.name;
    var atype = '';
    if (typeof (keyword) === "undefined"){
      keyword = '';
    }
    
    if(type === 'hot'){
      atype = '最热商品';
    }else if(type === 'new'){
      atype = '最新商品';
    }else if(type === 'all'){
      atype = '所有商品';
    }else{
      atype = '商品查找';
    }
    this.setData({
      'keyword': keyword,
      'type':type
    })
    wx.setNavigationBarTitle({
      title: atype,
    });
    this._loadData(type,keyword,1);
  },

  _loadData:function(type,keyword,page){
    more.getData(type,keyword,page,(res)=>{
      // console.log(res);
      if (res.hasOwnProperty('error_code') === true ){
        //没有数据
        this.setData({
          'showMore':true
        })
      }else{
        var allProducts = this.data.allProducts.concat(res);
        this.setData({
          'allProducts': allProducts
        });
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(1)
    var page = this.data.page;
    page++;
    this.setData({
      'page':page,
    });
    this._loadData(this.data.type,this.data.keyword, page);
  },
  //商品点击事件
  onProductsItemTap: function (event) {
    // console.log(event);
    var id = more.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id,
    });
  },
})