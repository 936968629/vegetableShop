import {Base} from "../../utils/base.js";
class Cart extends Base{
  constructor(){
    super();
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
  //从缓存读取购物车数据
  getCartDataFromLocal() {
    var res = wx.getStorageSync(this._storageKeyName);
    if (!res) {
      res = [];
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
}
export {Card}