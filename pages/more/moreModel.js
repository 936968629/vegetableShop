import {Base} from "../../utils/base.js";
class More extends Base{
  constructor(){
    super();
  }
  getData(type,page,callback){
    var params = {
      url:'product/more/'+type+'?page='+page,
      sCallback: function (res) {
        callback && callback(res.items);
      },
    };
    this.request(params);
  }

}
export {More}