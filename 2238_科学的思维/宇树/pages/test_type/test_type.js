// pages/test_type/test_type.js
var app = getApp();
var http = app.globalData.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_list: []
  },
  next_: function() {
    wx.navigateTo({
      url: '../history/history',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: http + '/api/Column/free_cate', //仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            type_list: res.data.data
          })
        }
      }
    })
  },
  go_teacher: function(e) {
    wx.showLoading({
      title: '请稍等',
    });
    var that = this;
    var data_list = that.data.type_list;
    var data_obj = data_list[e.target.dataset.id]
    wx.request({
      url: http + '/api/test/add_order', //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid,
        title: data_obj.title,
        price: data_obj.price,
        test_number: data_obj.test_number
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          wx.request({
            url: http + '/api/order/test_pay', //仅为示例，并非真实的接口地址
            data: {
              id:res.data.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              wx.hideLoading();
              console.log(res.data);
              var order_id = res.data.data[0].id;
              if (res.data.code == 1) {
                wx.requestPayment({
                  timeStamp: res.data.data[0].timeStamp,
                  nonceStr: res.data.data[0].nonceStr,
                  package: res.data.data[0].package,
                  signType: res.data.data[0].signType,
                  paySign: res.data.data[0].paySign,
                  success(res) {
                    console.log(res);
                        wx.navigateTo({
                          url: '../chk_teacher/chk_teacher?id='+data_obj.id+"&order_id="+order_id,
                        })
                  },
                  fail(res) {
                    wx.showToast({
                      title: '支付失败',
                      icon: 'none'
                    });
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