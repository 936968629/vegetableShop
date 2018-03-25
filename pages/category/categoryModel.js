import {Base} from "../../utils/base.js";
class Category extends Base{
  constructor(){
    super();
  }
  getCategoryInfo(callback){
    var params = {
      url:'category/all',
      sCallback:function(res){
        callback && callback(res);
      }
    };
    this.request(params);
  }
  getProductsByCategory(id,callback){
    var params = {
      url: 'product/by_category?id=' + id,
      sCallback: function (productdata) {
        callback && callback(productdata);
      }
    };
    this.request(params);
  }
}
export {Category}