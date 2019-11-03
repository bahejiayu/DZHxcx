// pages/table_detail/table_detail.js


var app = getApp();
var http = app.globalData.http;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_: {},
    url: http,
    type_: 1,
    id_: "",
    ev_list: []

  },
  tog_sc: function() {
    var that = this;
    var url_txt;
    if (that.data.is_sc == true) {
      url_txt = '/api/user/del_collect';
    } else {
      url_txt = '/api/user/add_collect';
    };
    wx.showLoading({
      title: '请稍等',
    })
    wx.request({
      url: http + url_txt, //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid,
        id: that.data.id_
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
          wx.request({
            url: http + '/api/user/yancollect', //仅为示例，并非真实的接口地址
            data: {
              id: that.data.id_,
              openid: wx.getStorageSync('user_obj').wx_openid
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              wx.hideLoading();
              console.log(res.data);
              if (res.data.code == 1) {
                that.setData({
                  is_sc: res.data.sc
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
    })


  },
  go_en: function() {
    var that = this;
    wx.navigateTo({
      url: '../active_enroll/active_enroll?id=' + that.data.id_,
    });
  },
  tog_type: function(e) {
    this.setData({
      type_: e.target.dataset.type
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 418
    this.setData({
      id_: options.id,
    })
    var that = this;
    wx.request({
      url: http + '/api/goods/activity_info', //仅为示例，并非真实的接口地址
      data: {
        id: options.id,
        // id: options.id,

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        res.data.data[0].imgs = res.data.data[0].morepic.split('***');
        res.data.data[0].imgs.pop();
        that.setData({
          data_: res.data.data[0]
        })
      }
    });
    wx.request({
      url: http + '/api/user/goods_comment', //仅为示例，并非真实的接口地址
      data: {
        id: that.data.id_,
        // id: options.id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            ev_list: res.data.data
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

  }
})