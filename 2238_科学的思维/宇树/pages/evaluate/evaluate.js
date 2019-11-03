// pages/evaluate/evaluate.js
var app = getApp();
var http = app.globalData.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_: {},
    url: http,
    area: '',
    id: '',
    gid: ''
  },
  get_area: function(e) {
    this.setData({
      area: e.detail.value
    })
  },
  sub_mit: function() {
    var that = this;
    if (that.data.area == '') {
      wx.showToast({
        title: '请输入评价',
        icon: 'none'
      });
      return false;
    };
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: http + '/api/user/comment', //仅为示例，并非真实的接口地址
      data: {
        id: that.data.id_,
        gid: that.data.gid_,
        content: that.data.area,
        openid: wx.getStorageSync('user_obj').wx_openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          wx.showToast({
            title: '提交成功',
            icon: 'none'
          });
      setTimeout(function(){
            wx.navigateBack({
              delta:1
            });
      },1500)

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })

        }

      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 93
    // 440
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      id_: options.id,
      gid_: options.gid
    })
    wx.request({
      url: http + '/api/user/my_comment', //仅为示例，并非真实的接口地址
      data: {
        id: options.id,
        gid: options.gid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            data_: res.data.top
          });
        }

      }
    })









  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})