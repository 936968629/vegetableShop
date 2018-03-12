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

}
export {Index}