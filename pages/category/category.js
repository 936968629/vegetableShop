// pages/category/category.js
import {Category} from 'categoryModel.js';
var category = new Category();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category_id:1
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
          topImgUrl: data[0].img.url,
          title: data[0].name,
        }
        // console.log(dataObj);
        this.setData({
          'categoryProducts': dataObj
        });
        //保存数据
        this.data.loadedData[0] = dataObj;
      });

    });



  }
 
})