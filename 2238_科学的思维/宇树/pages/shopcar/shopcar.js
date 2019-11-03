// pages/shopcar/shopcar.js
var app = getApp();
var http = app.globalData.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_: [],
    url: http,
    all_cur: true,
    is_m: true,
    start_: 0
  },
  de_box: function(e) {
    var that=this;
    console.log(e.target.dataset.index);
    wx.showModal({
      title: '提示',
      content: '是否确认删除该商品',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中',
          });

          wx.request({
            url: http + '/api/car/del_car', //仅为示例，并非真实的接口地址
            data: {
              id: e.target.dataset.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res.data);
              wx.hideLoading();
              if (res.data.code == 1) {
                wx.showToast({
                  title: '删除成功',
                });

                wx.request({
                  url: http + '/api/car/carlist', //仅为示例，并非真实的接口地址
                  data: {
                    openid: wx.getStorageSync('user_obj').wx_openid
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success(res) {
                    wx.hideLoading();
                    console.log(res.data);
                    if (res.data.code == 1) {
                      for (var i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].left = false;
                        res.data.data[i].cur = true;
                      };
                      that.setData({
                        list_: res.data.data
                      })
                    }


                  }
                })



              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                });
              }

            }
          })


        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  },
  go_buy: function() {
    var that = this;
    if (that.data.is_m) {
      var cur_list = [];
      for (var i = 0; i < that.data.list_.length; i++) {
        if (that.data.list_[i].cur) {
          cur_list.push(that.data.list_[i]);
        }
      };
      console.log(cur_list)
      for (var i = 0; i < cur_list.length; i++) {
        if (cur_list[i].type == 3) {
          for (var j = 0; j < cur_list.length; j++) {
            console.log(cur_list[j] != 3)
            if (cur_list[j].type != 3) {
              that.setData({
                show_tip: true
              });
              return false;
            }
          }
        }
      };
      var no_book = true;
      for (var i = 0; i < cur_list.length; i++) {
        if (cur_list[i].type == 3) {
          no_book = false;
        }
      };
      if (no_book) {
        // console.log('没有书');
        var post_data = [];
        for (var i = 0; i < that.data.list_.length; i++) {
          if (that.data.list_[i].type != 3 && that.data.list_[i].cur == true) {
            var obj = {};
            obj.type = that.data.list_[i].type;
            obj.id = that.data.list_[i].id;

            post_data.push(obj);
          };
        }
        console.log(post_data);

        wx.request({
          url: http + '/api/aorder/other_addorder',
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {
            gid: post_data,
            openid: wx.getStorageSync('user_obj').wx_openid
          },
          success: function(res) {
            console.log(res.data);
            if (res.data.code == 1) {

              wx.request({
                url: http + '/api/order/pay', //仅为示例，并非真实的接口地址
                data: {
                  id: res.data.id[0]
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




            } else {
              wx.showToast({
                title: res.data.msg,
                icon: "none"
              });
              if (res.data.msg == '请完善信息') {
                wx.navigateTo({
                  url: '../information/information?t=1',
                });
              }
            };

          }
        });

      } else {
        var id_list = [];
        for (var i = 0; i < cur_list.length; i++) {
          id_list.push(cur_list[i].id);
        };
        // 书籍下单
        wx.request({
          url: http + '/api/aorder/book_place', //仅为示例，并非真实的接口地址
          data: {
            type: 3,
            openid: wx.getStorageSync('user_obj').wx_openid,
            id: id_list.join(',')
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data);
            if (res.data.code == 1) {
              wx.navigateTo({
                url: '../order_table/order_table?id=' + res.data.id,
              })
            } else {
              if (res.data.msg == '请完善信息') {
                wx.navigateTo({
                  url: '../information/information?t=1',
                });
                return false;
              }
              wx.showToast({
                title: '下单失败',
                icon: 'none'
              });


            }

          }
        });

      }











    }
  },
  i_konw: function() {
    this.setData({
      show_tip: false
    })
  },
  st: function(e) {
    this.setData({
      start_: e.touches[0].clientX
    })
    console.log(e.target.dataset.index)
    // console.log(e)
    // console.log(e.touches[0].clientX)
  },
  end: function(e) {
    var that = this;
    console.log(e)

    console.log(e.target.dataset.index)
    var jian = e.changedTouches[0].clientX - this.data.start_;
    var f_data = that.data.list_
    console.log(f_data[e.target.dataset.index])
    if (jian > 0 && jian > 10) {

      f_data[e.target.dataset.index].left = false

    }
    if (jian < 0 && jian < -10) {

      f_data[e.target.dataset.index].left = true
    }
    that.setData({
      list_: f_data
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: http + '/api/car/carlist', //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].left = false;
            res.data.data[i].cur = true;
          };
          that.setData({
            list_: res.data.data
          })
        }


      }
    })


  },
  tog_all: function() {
    var all_status = !this.data.all_cur;
    this.setData({
      all_cur: all_status
    });
    var list_ = this.data.list_;
    for (var i = 0; i < list_.length; i++) {
      list_[i].cur = all_status;
    }



    this.setData({
      list_: list_
    });

    var all_ck = false;
    for (var i = 0; i < this.data.list_.length; i++) {
      if (this.data.list_[i].cur == true) {
        console.log(1)
        all_ck = true
      }
    };
    this.setData({
      is_m: all_ck
    });

  },
  tog_cur: function(e) {
    var that = this;
    var list_ = that.data.list_;
    if (list_[e.target.dataset.index].cur == true) {
      list_[e.target.dataset.index].cur = false;
    } else {
      list_[e.target.dataset.index].cur = true;
    };
    that.setData({
      list_: list_
    });
    var all_flag = true;
    for (var i = 0; i < that.data.list_.length; i++) {
      if (that.data.list_[i].cur == false) {
        that.setData({
          all_cur: false
        });
        all_flag = false;
      }
    }

    if (all_flag) {
      that.setData({
        all_cur: true
      });
    }
    var all_ck = false;
    for (var i = 0; i < this.data.list_.length; i++) {
      if (this.data.list_[i].cur == true) {
        console.log(1)
        all_ck = true
      }
    };
    this.setData({
      is_m: all_ck
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