import {Base} from "../../utils/base.js";
class More extends Base{
  constructor(){
    super();
  }
  getData(type,keyword,page,callback){
    var params = {
      url:'product/more/'+type+'?page='+page+'&keyword='+keyword,
      sCallback: function (res) {
        callback && callback(res);
      },
    };
    this.request(params);
  }

}
export {More}