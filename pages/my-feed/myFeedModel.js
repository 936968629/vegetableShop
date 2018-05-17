import {Base} from '../../utils/base.js';

class MyFeed extends Base{
  constructor(){
    super();
  }
  commitContent(content,callback){
    var params = {
      url:'message/feedback',
      type:'POST',
      data:{content:content},
      sCallback:function(res){
        callback && callback(res)
      }
    }
    this.request(params);
  }
}

export {MyFeed}