// pages/introduce/introduce.js
var app = getApp();
var http = app.globalData.http;

Page({


  /**
   * 页面的初始数据
   */
  data: {
      txt_:'',
    is_login: true
  },
  go_next:function(){




      wx.navigateTo({
        url: '../test_type/test_type',
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    var that=this;
    wx.request({
      url: http+'/api/Query/free_rule', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
          if(res.data.code==1){
            that.setData({
              txt_: res.data.data
            })
          }
      }
    });
    if (wx.getStorageSync('token')) {
      that.setData({
        is_login: true
      })
    } else {
      that.setData({
        is_login: false
      })

    }

  },
  login_: function (e) {
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: function (res) {
              if (res.code) {
                wx.showLoading({
                  title: '登陆中',
                });
                var code_ = res.code;
                var nickname_ = e.detail.userInfo.nickName;
                var headimage_ = e.detail.userInfo.avatarUrl;
                var sex_ = e.detail.userInfo.gender;
                console.log(code_)
                wx.request({
                  url: http + '/api/login/wxlogin', //仅为示例，并非真实的接口地址
                  data: {
                    code: code_,
                    nickname: nickname_,
                    headimage: headimage_,
                    sex: sex_
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success(res) {
                    wx.hideLoading();
                    console.log(res.data);
                    if (res.data.code == 1) {
                      wx.setStorageSync('user_obj', res.data.data[0].user);
                      wx.setStorageSync('token', res.data.data[0].access_token);
                      that.setData({
                        user_info: wx.getStorageSync('user_obj'),
                        is_login: true
                      });
                      wx.navigateTo({
                        url: '../test_type/test_type',
                      })

                    } else {
                      wx.showToast({
                        title: '登陆失败',
                        icon: 'none'
                      });
                    }
                  },
                  fail: function (res) {
                    console.log(res)
                  }
                })


              }
            }
          })
        }
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