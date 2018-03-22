import { Base } from '../../utils/base.js';
class Index extends Base{
  constructor(){
    super();
  }
  //获取swiper
  getBannerData(id,callback){
    var params = {
      url:"banner/"+id,
      sCallback: function (res) {
        callback && callback(res.items);
      },
    }
    this.request(params);
  }
  //首页主题
  getThemeData(callback) {
    var params = {
      url: 'theme?ids=1,2',
      sCallback: function (res) {
        callback && callback(res);
      }
    };
    this.request(params);
  }
  //获取最热商品
  getHotData(callback){
    var params = {
      url:"product/hot",
      sCallback:function(res){
        callback && callback(res);
      }
    };
    this.request(params);
  }
  //获取最新商品
  getNewData(callback){
    var params = {
      url:"product/recent",
      sCallback:function(res){
        callback && callback(res);
      }
    }
    this.request(params);
  }

}
export {Index}