// pages/index/index.js

var app = getApp();
var http = app.globalData.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner_list: [],
    url: http,
    cur_id: 174,
    data_1: [],
    data_2: [],
    data_3: [],
    data_4: [],
    data_5: [],
    data_6: [],
    nav3: '全部',
    nav5: '全部',
    shwo_login: false
  },
  go_search: function() {
    wx.navigateTo({
      url: '../search/search',
    });
  },
  go_other: function(e) {
    var txt_url = '';
    console.log(e.target.dataset.title)
    if (e.target.dataset.title == "百万奖金") {
      txt_url = "../other_index/other_index";
    } else if (e.target.dataset.title == "免学费") {
      txt_url = '../xf/xf';
    } else if (e.target.dataset.title == "评测介绍") {
      txt_url = '../introduce/introduce';
    } else if (e.target.dataset.title == "活动") {
      txt_url = '../active_review/active_review';
    }



    wx.navigateTo({
      url: txt_url,
    })
  },
  // 书籍下的二级栏目切换数据
  tog_data_3: function(e) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      nav3: e.target.dataset.id
    })
    if (e.target.dataset.id == '全部') {
      wx.request({
        url: http + '/api/goods/book', //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          id: that.data.cur_id
        },
        success(res) {
          wx.hideLoading();
          console.log(res.data);
          if (res.data.code == 1) {
            that.setData({
              data_3: res.data
            })
          }
        }
      });
    } else {
      wx.request({
        url: http + '/api/goods/book_meun', //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          id: e.target.dataset.id
        },
        success(res) {
          wx.hideLoading();
          console.log(res.data);
          if (res.data.code == 1) {
            that.setData({
              data_3: res.data
            })
          }
        }
      });
    }




  },
  // 游学课程的二级栏目切换数据
  tog_data_5: function(e) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      nav5: e.target.dataset.id
    })
    if (e.target.dataset.id == '全部') {
      wx.request({
        url: http + '/api/goods/youstudy', //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          id: that.data.cur_id
        },
        success(res) {
          wx.hideLoading();
          console.log(res.data);
          if (res.data.code == 1) {
            that.setData({
              data_5: res.data
            })
          }
        }
      });
    } else {
      wx.request({
        url: http + '/api/goods/youstudy_meun', //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          id: e.target.dataset.id
        },
        success(res) {
          wx.hideLoading();
          console.log(res.data);
          if (res.data.code == 1) {
            that.setData({
              data_5: res.data
            })
          }
        }
      });
    }




  },
  get_nav: function(e) {

    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      cur_id: e.target.dataset.id
    });
    if (that.data.cur_id == 174) {
      // 获取录播间课程
      wx.request({
        url: http + '/api/goods/video', //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          id: that.data.cur_id
        },
        success(res) {
          wx.hideLoading();
          console.log(res.data);
          if (res.data.code == 1) {
            that.setData({
              data_1: res.data.data
            })
          }
        }
      });
    } else if (that.data.cur_id == 175) {
      // 获取录线下课程
      wx.request({
        url: http + '/api/goods/under', //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          id: that.data.cur_id
        },
        success(res) {
          console.log(res.data);
          wx.hideLoading();
          if (res.data.code == 1) {
            that.setData({
              data_2: res.data.data
            })
          }
        }
      });
    } else if (that.data.cur_id == 176) {
      // 获取书籍商场
      wx.request({
        url: http + '/api/goods/book', //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          id: that.data.cur_id
        },
        success(res) {
          wx.hideLoading();
          console.log(res.data);
          if (res.data.code == 1) {
            that.setData({
              data_3: res.data
            })
          }
        }
      });
    } else if (that.data.cur_id == 184) {
      // 获取书籍商场
      wx.request({
        url: http + '/api/goods/shapan', //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          id: that.data.cur_id
        },
        success(res) {
          wx.hideLoading();
          console.log(res.data);
          if (res.data.code == 1) {
            that.setData({
              data_4: res.data.data
            })
          }
        }
      });
    } else if (that.data.cur_id == 185) {
      // 获取游学课程
      wx.request({
        url: http + '/api/goods/youstudy', //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          id: that.data.cur_id
        },
        success(res) {
          wx.hideLoading();
          console.log(res.data);
          if (res.data.code == 1) {
            that.setData({
              data_5: res.data
            })
          }
        }
      });
    } else if (that.data.cur_id == 189) {
      // 获取书籍商场
      wx.request({
        url: http + '/api/goods/activity', //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          id: that.data.cur_id
        },
        success(res) {
          wx.hideLoading();
          console.log(res.data);
          if (res.data.code == 1) {
            that.setData({
              data_6: res.data.data
            })
          }
        }
      });
    }



  },
  code_cli: function() {
    let that = this;
    wx.scanCode({
      success: (res) => {
        console.log(JSON.parse(res.result));
        var data_ = JSON.parse(res.result);
        if (data_.type == 'king') {
          wx.showLoading({
            title: '请稍等',
          })
          wx.request({
            url: http + '/api/user/off_code', //仅为示例，并非真实的接口地址
            data: {
              // openid: wx.getStorageSync('user_obj').wx_openid,
              oid: data_.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              wx.hideLoading();
              console.log(res.data);
              if (res.data.code == 1) {
                wx.showToast({
                  title: '扫码成功',
                });
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                });
              }
            }
          })
        }


      },
      fail: function(e) {
        console.log(e)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.clearStorageSync();
    var that = this;
    // console.log("options=" + JSON.stringify(options));
    console.log(options)
    console.log('解=' + unescape(options.q));
    if (options.q) {
      if (wx.getStorageSync('user_obj').wx_openid) {
        var txt_url = unescape(options.q);
        var url_arr = txt_url.split('=');
        console.log('id=' + url_arr[1]);
        wx.showLoading({
          title: '正在绑定上下级关系',
        });
        wx.request({
          url: http +'/api/user/binding', //仅为示例，并非真实的接口地址
          data: {
            openid:url_arr[1],
            id: url_arr[1]

          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            wx.hideLoading();
            console.log('绑定:' + JSON.stringify(res.data));
          },
          fail:function(){
              console.log('失败')
          }
        });


      }else{
            that.setData({
              shwo_login:true
            });
      }


     


    }



    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: http + '/api/goods/banner', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            banner_list: res.data.data
          })
        }
      }
    });
    // 获取录播间课程
    wx.request({
      url: http + '/api/goods/video', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id: that.data.cur_id
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            data_1: res.data.data
          })
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

  },
  login_: function(e) {
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: function(res) {
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
                      wx.setStorageSync('user_obj', res.data.data[0].user);
                      wx.setStorageSync('token', res.data.data[0].access_token);
                      that.setData({
                        user_info: wx.getStorageSync('user_obj'),
                        is_login: true,
                        number_: wx.getStorageSync('user_obj').number,
                        shwo_login: false
                      });
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