import { Base } from '../../utils/base.js';
class Theme extends Base{
  constructor(){
    super();
  }
  getThemeData(id,callback){
    var params = {
      url:"theme/"+id,
      sCallback:function(res){
        callback && callback(res);
      }
    };
    this.request(params);
  }
}
export {Theme}