import {Base} from "../../utils/base.js";
class Cart extends Base{
  constructor(){
    super();
    this._storageKeyName = 'cart';
  }
  //添加购物车
  //如果之前没有该商品则添加新的记录
  //如果有 更新counts
  //@item 商品对象 @counts 商品数量
  add(item, counts) {
    var cartData = this.getCartDataFromLocal();

    var isHasInfo = this._isHasThaOne(item.id, cartData);

    if (isHasInfo.index == -1) {
      item.counts = counts;
      item.selectStatus = true;//设置选中状态
      cartData.push(item);
    } else {
      cartData[isHasInfo.index].counts += counts;
    }
    //更新缓存
    wx.setStorageSync(this._storageKeyName, cartData);
  }
  //从缓存读取购物车数据 flag:true过滤未选择的商品
  getCartDataFromLocal(flag) {
    var res = wx.getStorageSync(this._storageKeyName);
    if (!res) {
      res = [];
    }
    if(flag){
      var newRes = [];
      for(let i=0;i<res.length;i++){
        if(res[i].selectStatus){
          newRes.push(res[i]);
        }
      }
      res = newRes;
    }
    return res;
  }

  //判断购物车是否有该商品
  //@id 商品id
  //@arr 购物车缓存数据
  _isHasThaOne(id, arr) {
    var item;
    var result = {
      index: -1
    }
    for (let i = 0; i < arr.length; i++) {
      item = arr[i];
      if (item.id == id) {
        result = {
          index: i,
          data: item
        };
        break;
      }
    }
    return result;
  }
  //购物车商品数量
  //@flag true考虑商品是否选择 false返回所有商品总和
  getCartTotalCounts(flag) {
    var data = this.getCartDataFromLocal();
    var counts = 0;
    for (let i = 0; i < data.length; i++) {
      if (flag) {
        if (data[i].selectStatus) {
          counts += data[i].counts;
        }
      } else {
        counts += data[i].counts;
      }

    }
    return counts;
  }
  //修改购物车商品数量
  //@id 商品id
  //@counts 修改数量
  _changeCartCounts(id, counts) {
    var cartData = this.getCartDataFromLocal(),
      hasInfo = this._isHasThaOne(id, cartData);
    if (hasInfo.index != -1) {
      if (hasInfo.data.counts > 1) {
        cartData[hasInfo.index].counts += counts;
      }
    }
    wx.setStorageSync(this._storageKeyName, cartData);
  }
  addCounts(id) {
    this._changeCartCounts(id, 1);
  }
  deleteCounts(id) {
    this._changeCartCounts(id, -1);
  }
  //删除
  delete(id) {
    var cartData = this.getCartDataFromLocal();
    if (id instanceof Array){
      for(let i in id){
        var hasInfo = this._isHasThaOne(id[i], cartData);
        if (hasInfo.index != -1) {
          cartData.splice(hasInfo.index, 1);
        }
      }
    }else{
      var hasInfo = this._isHasThaOne(id, cartData);
      if (hasInfo.index != -1) {
        cartData.splice(hasInfo.index, 1);
      }
    }
   
    wx.setStorageSync(this._storageKeyName, cartData);
  }
  //检测购物车数据是否最新
  verify(cartData,callback){
    var params = {
      url: "order/verify",
      type:'POST',
      data:{cartData:cartData},
      sCallback: function (res) {
        callback && callback(res);
      }, 
    }
    this.request(params)
  }
  //保存到缓存
  setstorage(cartData){
    wx.setStorageSync(this._storageKeyName, cartData);
  }
}
export {Cart}