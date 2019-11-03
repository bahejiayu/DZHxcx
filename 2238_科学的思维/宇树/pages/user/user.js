// pages/user/user.js
var app = getApp();
var http = app.globalData.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_info: {},
    is_login: false,
    record_id:false,
    fx_url:"",
    count_:0
  },
  go_mess:function(){
      wx.navigateTo({
        url: '../message_list/message_list',
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
        if(wx.getStorageSync('user_obj')){
          that.setData({
            is_login:true,
            user_info: wx.getStorageSync('user_obj')
          });
        }; 

    wx.request({
      url: http +'/api/user/is_trader', //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
          if(res.data.data!=null){
                that.setData({
                  fx_url:"../fxs_center/fxs_center"
                });
          }else{
            that.setData({
              fx_url: "../apply_dis/apply_dis"
            });
          }

      }
    });



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
      var that=this;
    wx.request({
      url: http + '/api/user/member_info', //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
            if(res.data.code==1){
                that.setData({
                  record_id: res.data.data.record_id||false,
                  number_: res.data.data.number
                })
            }
      }
    });

    wx.request({
      url: http+'/api/user/no_read', //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
            that.setData({
              count_: res.data.count
            })
        }
      }
    });




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
                      wx.showToast({
                        title: '找到问题了',
                        icon:'none'
                      });
                      // wx.setStorageSync('user_obj', res.data.data[0].user);
                      // wx.setStorageSync('token', res.data.data[0].access_token);
                      // that.setData({
                      //   user_info: wx.getStorageSync('user_obj'),
                      //   is_login: true,
                      //   number_: wx.getStorageSync('user_obj').number
                      // });
                     
                      // wx.request({
                      //   url: http + '/api/user/is_trader', //仅为示例，并非真实的接口地址
                      //   data: {
                      //     openid: wx.getStorageSync('user_obj').wx_openid
                      //   },
                      //   header: {
                      //     'content-type': 'application/json' // 默认值
                      //   },
                      //   success(res) {
                      //     console.log(res.data);
                      //     if (res.data.data != null) {
                      //       that.setData({
                      //         fx_url: "../fxs_center/fxs_center"
                      //       });
                      //     } else {
                      //       that.setData({
                      //         fx_url: "../apply_dis/apply_dis"
                      //       });
                      //     }

                      //   }
                      // });




                    } else {
                      wx.showToast({
                        title: '登陆失败',
                        icon: 'none'
                      });
                    }
                  }
                })


              }
            }
          })
        }
      }
    })

  },
})