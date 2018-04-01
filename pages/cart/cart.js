// pages/cart/cart.js
import {Cart} from "../cart/cartModel.js";
var cart = new Cart();
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

  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    //每次打开页面都会执行
    //从缓存中读取购物车信息进行展示
    this._show();
  },

  _show: function () {
    var cartData = cart.getCartDataFromLocal();
    // var countsInfo = cart.getCartTotalCounts(true);
    var cal = this._calcTotalAccountAndCounts(cartData);
    console.log
    this.setData({
      'selectedCount': cal.selectedCounts,
      'cartData': cartData,
      'selectedTypeCounts': cal.selectedTypeCounts,
      'account': cal.account
    });
  },

  //计算选中商品总价格
  _calcTotalAccountAndCounts: function (data) {
    // console.log(data);
    var total = 0;
    var price = 0, counts = 0, typecounts = 0;
    var item, multiple = 100;
    for (item in data) {
      if (data[item].selectStatus) {
        //js浮点数计算误差
        price = data[item].counts * multiple *
          data[item].price * multiple;
        total += price;
        counts += data[item].counts;
        typecounts++;
      }
    }
    return {
      selectedCounts: counts,
      account: total / (multiple * multiple),
      selectedTypeCounts: typecounts,
    }
  },
  //点击checkbox
  toggleSelect:function(event){
    var id = cart.getDataSet(event, 'id');
    var status = cart.getDataSet(event, 'status');
    //通过id查找cartData
    var index = this._getIndexCartDataByID(id);
    // console.log(index);
    //设置商品状态
    this.data.cartData[index].selectStatus = !status;
    this._resetCartData();
  },
  //全选按钮
  toggleSelectAll: function (event) {
    var status = cart.getDataSet(event, 'status') == 'true';
    var toggleData = this.data.cartData;
    for (var item in toggleData) {
      toggleData[item].selectStatus = !status;
    }
    this._resetCartData();
  },
  //通过id查找cartdata对应的小标
  _getIndexCartDataByID: function (id) {
    var data = this.data.cartData;
    for (var item in data) {
      if (data[item].id == id) {
        return item;
      }
    }
  },//更改购物车数量
  changeCounts: function (event) {
    var id = cart.getDataSet(event, 'id');
    var ctype = cart.getDataSet(event, 'type');
    var index = this._getIndexCartDataByID(id);
    var counts = 1;
    if (ctype == "add") {
      cart.addCounts(id);
    } else {
      counts = -1;
      cart.deleteCounts(id);
    }
    this.data.cartData[index].counts += counts;
    console.log(this.data.cartData);
    this._resetCartData();
  },
  //删除
  delete: function (event) {
    var id = cart.getDataSet(event, 'id');
    var index = this._getIndexCartDataByID(id);
    this.data.cartData.splice(index, 1);
    this._resetCartData();
    cart.delete(id);
  },
  //重新计算商品数量和价格
  _resetCartData: function () {
    var newData = this._calcTotalAccountAndCounts(this.data.cartData);
    this.setData({
      'selectedCount': newData.selectedCounts,
      'cartData': this.data.cartData,
      'selectedTypeCounts': newData.selectedTypeCounts,
      'account': newData.account
    });
  },
})