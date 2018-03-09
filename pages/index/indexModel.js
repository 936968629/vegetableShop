class Index{
  constructor(){

  }
  getBannerData(id){
    wx.request({
      url: 'http://wenjunlin.xyz/api/v1/banner/'+id,
      method:'get',
      success:function(){

      }
    })
  }
}
export {Index}