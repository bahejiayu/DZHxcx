

var app = getApp();
var http = app.globalData.http;
Page({



  /**
   * 页面的初始数据
   */
  data: {
    address_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '加载中',
    // });
    // var that = this;
    // wx.request({
    //   url: http + '/api/user/address', //仅为示例，并非真实的接口地址
    //   data: {
    //     openid: wx.getStorageSync('user_obj').wx_openid,
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     wx.hideLoading();
    //     console.log(res.data);
    //     if (res.data.code == 1) {
    //       that.setData({
    //         address_list: res.data.data
    //       })
    //     }
    //   }
    // })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   

  },
  sel_:function(e){
    wx.showLoading({
      title: '正在设置',
    });
  var that=this;
    wx.request({
      url: http + '/api/user/is_default', //仅为示例，并非真实的接口地址
      data: {
        id: e.target.dataset.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
            if(res.data.code==1){ 
                    wx.showToast({
                      title: '设置成功',
                    });
              wx.request({
                url: http + '/api/user/address', //仅为示例，并非真实的接口地址
                data: {
                  openid: wx.getStorageSync('user_obj').wx_openid,
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  wx.hideLoading();
                  console.log(res.data);
                  if (res.data.code == 1) {
                    that.setData({
                      address_list: res.data.data
                    })
                  }
                }
              })
            }else{
              wx.showToast({
                title: res.data.msg,
                icon:'none'
              });
            }
      }
    })


  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: http + '/api/user/address', //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            address_list: res.data.data
          })
        }
      }
    })

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