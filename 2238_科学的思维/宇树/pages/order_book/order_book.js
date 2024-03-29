var app = getApp();
var http = app.globalData.http;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_list: [],
    url: http,
    cur_txt: '全部'

  },
  pay_: function(e) {
    wx.showLoading({
      title: '正在支付',
    });
    wx.request({
      url: http + '/api/order/pay', //仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id: e.target.dataset.id
      },
      success(res) {
        console.log(res.data);
        wx.hideLoading();
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
              var obj = {};
              if (that.data.cur_txt == '全部') {
                obj = {}
              } else if (that.data.cur_txt == '待支付') {
                obj = {
                  status: 1
                }
              } else if (that.data.cur_txt == '待发货') {
                obj = {
                  status: 2,
                }
              } else if (that.data.cur_txt == '待收货') {
                obj = {
                  status: 3,
                }
              } else if (that.data.cur_txt == '退换/售后') {
                obj = {
                  status: 5,
                }
              }
              obj.openid = wx.getStorageSync('user_obj').wx_openid;
              wx.showLoading({
                title: '加载中',
              })
              wx.request({
                url: http + '/api/user/bookshop', //仅为示例，并非真实的接口地址
                data: obj,
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  wx.hideLoading();
                  if (res.data.code == 1) {
                    that.setData({
                      order_list: res.data.data
                    });
                  }
                  console.log(res.data);
                }
              })

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
            title: '发起支付失败',
            icon: 'none'
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
    wx.request({
      url: http + '/api/user/bookshop', //仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            order_list: res.data.data
          })
        }
      }
    });
  },
  tog_order: function(e) {
    var that = this;
    this.setData({
      cur_txt: e.target.dataset.cur
    });
    var obj = {};
    if (e.target.dataset.cur == '全部') {
      obj = {}
    } else if (e.target.dataset.cur == '待支付') {
      obj = {
        status: 1
      }
    } else if (e.target.dataset.cur == '待发货') {
      obj = {
        status: 2,
      }
    } else if (e.target.dataset.cur == '待收货') {
      obj = {
        status: 3,
      }
    } else if (e.target.dataset.cur == '退换/售后') {
      obj = {
        status: 5,
      }
    }
    obj.openid = wx.getStorageSync('user_obj').wx_openid;
    wx.showLoading({
      title: '加载中',
    })


    wx.request({
      url: http + '/api/user/bookshop', //仅为示例，并非真实的接口地址
      data: obj,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          that.setData({
            order_list: res.data.data
          });
        }
        console.log(res.data);
      }
    })



  },
  del_order: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否确认删除',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          });
          wx.request({
            url: http + '/api/user/delete_order', //仅为示例，并非真实的接口地址
            data: {
              id: e.target.dataset.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              wx.hideLoading();
              if (res.data.code == 1) {
                var obj = {};
                if (that.data.cur_txt == '全部') {
                  obj = {}
                } else if (that.data.cur_txt == '待支付') {
                  obj = {
                    status: 1
                  }
                } else if (that.data.cur_txt == '待发货') {
                  obj = {
                    status: 2,
                  }
                } else if (that.data.cur_txt == '待收货') {
                  obj = {
                    status: 3,
                  }
                } else if (that.data.cur_txt == '退换/售后') {
                  obj = {
                    status: 5,
                  }
                }
                obj.openid = wx.getStorageSync('user_obj').wx_openid;
                wx.showLoading({
                  title: '加载中',
                })


                wx.request({
                  url: http + '/api/user/bookshop', //仅为示例，并非真实的接口地址
                  data: obj,
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success(res) {
                    wx.hideLoading();
                    if (res.data.code == 1) {
                      that.setData({
                        order_list: res.data.data
                      });
                    }
                    console.log(res.data);
                  }
                })




              }
              console.log(res.data);
            }
          });


        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });



  },
  sure_: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否确认收货',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          });
          wx.request({
            url: http + '/api/user/book_collect', //仅为示例，并非真实的接口地址
            data: {
              id: e.target.dataset.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              wx.hideLoading();
              if (res.data.code == 1) {
                var obj = {};
                if (that.data.cur_txt == '全部') {
                  obj = {}
                } else if (that.data.cur_txt == '待支付') {
                  obj = {
                    status: 1
                  }
                } else if (that.data.cur_txt == '待发货') {
                  obj = {
                    status: 2,
                  }
                } else if (that.data.cur_txt == '待收货') {
                  obj = {
                    status: 3,
                  }
                } else if (that.data.cur_txt == '退换/售后') {
                  obj = {
                    status: 5,
                  }
                }
                obj.openid = wx.getStorageSync('user_obj').wx_openid;
                wx.showLoading({
                  title: '加载中',
                })


                wx.request({
                  url: http + '/api/user/bookshop', //仅为示例，并非真实的接口地址
                  data: obj,
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success(res) {
                    wx.hideLoading();
                    if (res.data.code == 1) {
                      that.setData({
                        order_list: res.data.data
                      });
                    }
                    console.log(res.data);
                  }
                })
              }
              console.log(res.data);
            }
          });


        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });

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
    var obj = {};
    if (that.data.cur_txt == '全部') {
      obj = {}
    } else if (that.data.cur_txt == '待支付') {
      obj = {
        status: 1
      }
    } else if (that.data.cur_txt == '待发货') {
      obj = {
        status: 2,
      }
    } else if (that.data.cur_txt == '待收货') {
      obj = {
        status: 3,
      }
    } else if (that.data.cur_txt == '退换/售后') {
      obj = {
        status: 5,
      }
    }
    obj.openid = wx.getStorageSync('user_obj').wx_openid;
    wx.showLoading({
      title: '加载中',
    })


    wx.request({
      url: http + '/api/user/bookshop', //仅为示例，并非真实的接口地址
      data: obj,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          that.setData({
            order_list: res.data.data
          });
        }
        console.log(res.data);
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