import {Base} from "../../utils/base.js";
class MyOrder extends Base{
  constructor(){
    super();
  }
  getOrders(page,callback){
    var params = {
      url:'order/by_user',
      data:{ page:page,size:5 },
      type:'get',
      sCallback:function(data){
        callback && callback(data)
      }
    };
    this.request(params)
  }
  //
  editOrderStatus(id,uid,callback){
    var params = {
      url: 'order/confirm',
      data: { id: id, uid: uid },
      type: 'post',
      sCallback: function (data) {
        callback && callback(data)
      }
    }
    this.request(params)
  }
}
export {MyOrder}