// pages/apply_dis/apply_dis.js
var app = getApp();
var http = app.globalData.http;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name_: '',
    phone_: '',
    age_: '',
    address_: ''
  },
  get_name: function(e) {
    this.setData({
      name_: e.detail.value
    });
  },
  get_phone: function(e) {
    this.setData({
      phone_: e.detail.value
    });
  },
  get_age: function(e) {
    this.setData({
      age_: e.detail.value
    });
  },
  get_address: function(e) {
    this.setData({
      address_: e.detail.value
    });
  },
  sub_mit: function() {

    var that = this;
    if (!wx.getStorageSync('user_obj').wx_openid){
            wx.showToast({
              title: '未登录',
              icon:'none'
            });
            return false;
      }


    if (that.data.name_ == '') {
      wx.showToast({
        title: '请输入您的姓名',
        icon: 'none'
      });
      return false;
    };

    var pattern = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
    if (!pattern.test(that.data.phone_)) {
      wx.showToast({
        title: '请填写有效的手机号',
        icon: 'none',
        duration: 2000
      });
      return false
    };

    if (that.data.age_ == '') {
      wx.showToast({
        title: '请输入您的年龄',
        icon: 'none'
      });
      return false;
    };

    if (that.data.address_ == '') {
      wx.showToast({
        title: '请输入您的所在地',
        icon: 'none'
      });
      return false;
    };

    wx.request({
      url: http + '/api/user/apply_trader', //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid,
        name: that.data.name_,
        mobile: that.data.phone_,
        age: that.data.age_,
        addr: that.data.address_
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
          wx.showToast({
            title: '已提交申请',
            icon: 'none'
          });
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            });
          }, 1500)

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }


      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {




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