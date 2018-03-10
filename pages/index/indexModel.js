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
}
export {Index}