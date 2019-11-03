var app = getApp();
var http = app.globalData.http;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_info: {},
    url: http,
    id_: ""
  },
  sub_mit: function() {
    var that = this;
    if (that.data.order_info.address_default.length == 0) {
      wx.showToast({
        title: '请选择收货地址',
        icon: "none"
      });
      return false;
    };


    wx.request({
      url: http + '/api/aorder/book_addorder', //仅为示例，并非真实的接口地址
      data: {
        aid: that.data.order_info.address_default[0].id,
        oid: that.data.id_
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
          wx.request({
            url: http + '/api/order/pay', //仅为示例，并非真实的接口地址
            data: {
              id: res.data.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res.data);
              if (res.data.code == 1) {
                wx.requestPayment({
                  timeStamp: res.data.data[0].timeStamp,
                  nonceStr: res.data.data[0].nonceStr,
                  package: res.data.data[0].package,
                  signType: res.data.data[0].signType,
                  paySign: res.data.data[0].paySign,
                  success(res) {
                    wx.showToast({
                      title: '支付成功',
                    });
                    setTimeout(function() {
                      wx.redirectTo({
                        url: '../order_book/order_book',
                      });


                    }, 1500);

                  },
                  fail(res) {
                    wx.showToast({
                      title: '支付失败',
                      icon: 'none'
                    });

                  }
                })

              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                });

              }


            }
          });
        }





      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 39
    var that = this;
    this.setData({
      id_: options.id
    });
    wx.showLoading({
      title: '加载中',
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
    var that = this;
    wx.request({
      url: http + '/api/aorder/book_info', //仅为示例，并非真实的接口地址
      data: {
        id: that.data.id_
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          that.setData({
            order_info: res.data
          });
        }
        console.log(res.data)
      }
    })
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