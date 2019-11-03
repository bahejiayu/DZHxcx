var app = getApp();
var http = app.globalData.http;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_: {},
    txt_: '',
    pl_list: [],
    url: http,
    ma_: '',
    is_fx: true,
    record_id: '',
    show_fx: false
  },
  go_index: function () {
    wx.redirectTo({
      url: '../other_index/other_index',
    })
  },
  look_code: function () {
    var that = this;
    console.log(1)
    wx.previewImage({
      urls: [that.data.ma_],
      current: that.data.ma_
    });
  },
  formatDateTime: function (timeStamp) {
    var date = new Date();
    date.setTime(timeStamp * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },
  get_area: function (e) {
    this.setData({
      txt_: e.detail.value
    });
  },
  sub_mit: function () {
    var that = this;
    if (that.data.txt_ == '') {
      wx.showToast({
        title: '请输入您的评论',
        icon: 'none'
      });
      return false;

    };
    wx.request({
      url: http + '/api/Query/message', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid,
        content: that.data.txt_
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          wx.showToast({
            title: '评论成功',
          });
          that.setData({
            txt_: ''
          })
          that.get_list();

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })


  },
  get_list: function () {
    var that = this;
    wx.request({
      url: http + '/api/Query/find_message', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].time_ = that.formatDateTime(res.data.data[i].c_time)
          }
          that.setData({
            pl_list: res.data.data
          })
        } else {
          that.setData({
            pl_list: []
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    wx.showLoading({
      title: '加载中',
    });
    var that = this;

    // 获取小程序二维码
    wx.request({
      url: http + '/api/Query/code',
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 1) {
          that.setData({
            ma_: http + res.data.data
          })
        }
      }
    })



    var post_data = {};
    var url_ = ''
    if (options.record_id) {
      console.log(options.record_id)
      that.setData({
        is_fx: false,
        record_id: options.record_id
      })
      post_data = {
        record_id: options.record_id
      }
      url_ = '/api/query/pay_share';


    } else {
      that.setData({
        is_fx: true
      });
      post_data = {
        id: options.id,
        openid: wx.getStorageSync('user_obj').wx_openid
      };
      url_ = '/api/query/jieguo';

    }



    this.get_list();
    wx.request({
      url: http + url_, //仅为示例，并非真实的接口地址
      data: post_data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data)
        if (res.data.code == 1) {
          that.setData({
            data_: res.data,
            record_id: res.data.data.record_id
          });
          console.log((2 * res.data.mean) / 100)
          const ctx = wx.createCanvasContext('myCanvas')
          ctx.beginPath()
          ctx.setLineWidth(7)
          ctx.arc(100, 75, 55, 0, (2 * res.data.mean) / 100 * Math.PI)
          ctx.setStrokeStyle('#feca33');
          ctx.stroke();
          ctx.draw();
        };

        console.log(res.data);
      }
    })


  },
  save_img: function () {
    var that = this;

    if (that.data.data_.data.share_img) {
      console.log(that.data.data_.data.share_img)

      wx.getImageInfo({
        src: http + '/' + that.data.data_.data.share_img,
        success(res) {
          console.log(res)
          wx.saveImageToPhotosAlbum({
            filePath: res.path,
            success(res) {
              console.log(555)
              that.setData({
                show_fx: true
              });
              setTimeout(function () {

                that.setData({
                  show_fx: false
                });
              }, 2000)
            },
            fail: function (e) {
            console.log(e)
              console.log(666)
            }
          })
        },
        fail: function () {
          console.log(33)
        }
      })


    }

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
    var that = this;

    console.log(that.data.record_id)
    return {
      title: 'test',
      path: '/pages/result_card/result_card?record_id=' + that.data.record_id,
    }
  }
})