// pages/category/category.js
import {Category} from 'categoryModel.js';
var category = new Category();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category_id:1,
    loadedData: {},//保存数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  _loadData:function(){
    category.getCategoryInfo((data)=>{
      console.log(data);
      this.setData({
        "categoryTypeArr":data
      });

      category.getProductsByCategory(data[0].id, (productdata) => {
        var dataObj = {
          products: productdata,
          topImgUrl: data[0].topic_img,
          title: data[0].name,
        }
        console.log(dataObj);
        this.setData({
          'categoryProducts': dataObj
        });
        //保存数据
        this.data.loadedData[0] = dataObj;
      });

    });
  },
  //商品点击事件
  onProductsItemTap:function(event){
    var id = category.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id,
    });
  },
  //分类点击
  categoryClick: function (event) {
    // console.log(event);
    var id = category.getDataSet(event, 'id');
    var index = category.getDataSet(event, 'index');
    this.setData({
      'category_id': id,
    });
    if (!this.isLoadedData(index)) {
      category.getProductsByCategory(id, (productdata) => {
        var dataObj = {
          products: productdata,
          topImgUrl: this.data.categoryTypeArr[index].topic_img,
          title: this.data.categoryTypeArr[index].name,
        }
        this.setData({
          'categoryProducts': dataObj
        });
        //保存数据
        this.data.loadedData[index] = dataObj;
      });
    }
    else {
      this.setData({
        'categoryProducts': this.data.loadedData[index],
      });
    }

  },
  //判断当前分类下的商品是否被加载
  isLoadedData: function (index) {
    if (this.data.loadedData[index]) {
      return true;
    }
    return false;
  },
})