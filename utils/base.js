// import {Config} from 'config.js';

class Base{
  constructor(){
    this.baseRequestUrl = "https://www.wenjunlin.xyz/api/v1/";
    // this.baseRequestUrl = "http://bisheapi.project.com/api/v1/";
  }
  //flag 为true不做未授权重置
  request(params, flag) {
    var url = this.baseRequestUrl + params.url;
    var that = this;
    if (!params.type) {
      params.type = 'GET';
    }
    wx.request({
      url: url,
      method: params.type,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')//从缓存读取
      },
      success: function (res) {
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '2') {
          // if (params.sCallBack){
          //   params.sCallBack(res);
          // }

          //效果同上
          params.sCallback && params.sCallback(res.data);
        } else {
          if (code == '401') {
            //获取token 再次获取token
            //再次调用Base request
            if (!flag) {
              that._refetch(params);
            }
          }
          if (flag) {
            params.eCallback && params.eCallback(res.data);
          }
          if(code == '404' && res.error_code == 10002){//没有数据了
            params.sCallback && params.sCallback(res.data);
          }
        }

      },
      fail: function (err) {
        console.log(err);
      }
    })
  }
  //获取元素上绑定的值
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }

  _refetch(params) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      this.request(params, true);
    });
  }

}


export {Base}