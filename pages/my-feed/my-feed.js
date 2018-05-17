// pages/my-feed/my-feed.js
import {MyFeed} from './myFeedModel.js';
var myFeed = new MyFeed();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  //提交表单
  bindFormSubmit:function(e){
    var content = e.detail.value.content;
    myFeed.commitContent(content,(data) => {
      // console.log(data)
      if(data.code == 1){
        //成功
        wx.showModal({
          title: '反馈成功',
          showCancel:false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                url:'../my/my'
              })
            }
          }
        })
        
      }else if(data.code == -1){
        wx.showModal({
          title:'反馈失败',
          showCancel: false,
          content: '反馈数量过多，待后台解决',
          duration: 2000
        })
      }else{
        wx.showModal({
          title: '失败',
          showCancel: false,
          duration: 2000
        })
      }
    })
  }
})