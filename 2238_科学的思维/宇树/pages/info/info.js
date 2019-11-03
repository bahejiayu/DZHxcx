// pages/info/info.js
var app = getApp();
var http = app.globalData.http;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name_: "",
    age_: "",
    sex_: 1,
    once_:null
  },
  sub_mit: function() {
    var that = this;
    if (that.data.name_ == '') {
      wx.showToast({
        title: '请填写您的姓名',
        icon: 'none'
      });
      return false;
    };

    if (that.data.age_ == '') {
      wx.showToast({
        title: '请填写您的年龄',
        icon: 'none'
      });
      return false;
    };
    wx.showLoading({
      title: '提交中',
    })

    if (that.data.once_ == null){
      wx.request({
        url: http + '/api/User/newuser', //仅为示例，并非真实的接口地址
        data: {
          name: that.data.name_,
          age: that.data.age_,
          sex: that.data.sex_,
          openid: wx.getStorageSync('user_obj').wx_openid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data);
          wx.hideLoading();
          if (res.data.code == 1) {
            wx.showToast({
              title: '提交成功',
            });
            setTimeout(function () {
              wx.navigateTo({
                url: '../question/question',
              })

            }, 1500)
          }
        }
      });
    }else{
          wx.navigateTo({
            url: '../result/result?record_id=' + that.data.once_,
          })
    }
 





  },
  get_name: function(e) {
    this.setData({
      name_: e.detail.value
    })
  },
  tog_sex: function(e) {
    this.setData({
      sex_: e.target.dataset.sex
    })
  },
  get_age: function(e) {
    this.setData({
      age_: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) { 
      var that=this;

    wx.request({
      url: http + '/api/user/userinfo', //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
              that.setData({
                name_: res.data.data.name||"",
                age_: res.data.data.age||"" ,
                sex_: res.data.data.sex||1,
                once_: res.data.data.record_id
              })
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
    wx.removeStorageSync('list_')

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