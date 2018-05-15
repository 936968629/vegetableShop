import {Base} from '../../utils/base.js';
class MyMessage extends Base{
  super(){
    constructor();
  }
  getData(page,size,callback){
    var params = {
      url: 'message/list?page='+page+'&size='+size,
      data: { page: page, size: 10 },
      type: 'get',
      sCallback: function (data) {
        callback && callback(data)
      }
    }
    this.request(params)
  }
}

export {MyMessage}