// pages/search/search.js
var app = getApp();
var http = app.globalData.http;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_:[],
    key_word:'',
    url:http
  },
  get_ser:function(e){
        this.setData({
          key_word:e.detail.value
        });
  },
  btn_:function(){
      var that=this;
    if (that.data.key_word==""){
          wx.showToast({
            title: '请输入搜索关键字',
            icon:"none"
          });
          return false;
      };

      wx.showLoading({
        title: '正在搜索',
      })
    wx.request({
      url: http +'/api/goods/search', //仅为示例，并非真实的接口地址
      data: {
        keyword: that.data.key_word
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
            if(res.data.code==1){
                  that.setData({
                    list_:res.data.data
                  });
              if(res.data.data.length<=0){
                    wx.showToast({
                      title: '未找到相关搜索',
                      icon:'none'
                    });
              }


            }else{
                    wx.showToast({
                      title: res.data.msg,
                      icon:'none'
                    });
            }
        console.log(res.data)
      }
    })



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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