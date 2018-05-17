import {Base} from '../../utils/base.js';

class MyFeed extends Base{
  constructor(){
    super();
  }
  commitContent(content,callback){
    var params = {
      url:'',
      type:'POST',
      data:{content:content},
      sCallback:function(res){
        callback && callback(res)
      }
    }
  }
}

export {MyFeed}