// pages/active_review_detail/active_review_detail.js
var app = getApp();
var http = app.globalData.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      data_:{},
      url:http,
      is_play:false
  },
  play_viode:function(){
    this.setData({
      is_play:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        // 7
        wx.showLoading({
          title: '加载中',
        });
    var that=this;
    wx.request({
      url: http +'/api/goods/review_info', //仅为示例，并非真实的接口地址
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if(res.data.code==1){
              that.setData({
                data_:res.data.data
              })
        }
        console.log(res.data)
      }
    })





  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})