// pages/chk_teacher/chk_teacher.js

var app = getApp();
var http = app.globalData.http;
var time_index1 = 0;
var time_index2 = 0;
var time_index3 = 0;
var once_ = true;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_yy: false,
    teacher_list: [],
    index_: 0,
    time_: '请选择',
    success_tip: false,
    count: 0,
    cu_tip: false,
    order_id:"",
    hy_num:''
  },
  tog_teacher: function(e) {
    this.setData({
      index_: e.target.dataset.index
    })
  },
  yy_true: function() {
    this.setData({
      show_yy: true
    });
  },
  yy_false: function() {
    this.setData({
      show_yy: false
    });
  },
  sure_time: function() {

    var that = this;
    var my_time = new Date().getFullYear() + '年' + that.data.d1[time_index1] + that.data.d2[time_index2] + that.data.d3[time_index3];

    if (that.data.cu_tip == true) {
      that.setData({
        time_: my_time,
        show_yy: false,
        cu_tip: false
      });
      return false;
    }

    wx.showLoading({
      title: '正在检查时间',
    })
    wx.request({
      url: http + '/api/test/adout_time', //仅为示例，并非真实的接口地址
      data: {
        time: my_time,

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
        

          if (res.data.count > 0 ) {
            that.setData({
              count: res.data.count,
              cu_tip: true
            });
          } else {
            that.setData({
              time_: my_time,
              show_yy: false
            })
          }


          // once_ =





        }
      }
    })



    // this.setData({
    //   time_: my_time,
    //   show_yy: false
    // })
  },
  bindChange: function(e) {
    this.setData({
      cu_tip: false
    })
    console.log(e.detail.value);
    var that = this;
    console.log(that.data.d1[e.detail.value[0]])
    console.log(that.data.d2[e.detail.value[1]])
    console.log(that.data.d3[e.detail.value[2]])
    console.log(new Date().getFullYear());

    time_index1 = e.detail.value[0];
    time_index2 = e.detail.value[1];
    time_index3 = e.detail.value[2];

  },
  sub_mit: function() {
    var that = this;
    if (that.data.teacher_list.length <= 0) {
      wx.showToast({
        title: '该服务不能预约',
        icon: 'none'
      });
      return false;
    }
    if (that.data.time_ == '请选择') {
      wx.showToast({
        title: '请选择预约时间',
        icon: 'none'
      });
      return false;
    };
    wx.request({
      url: http + '/api/test/addteacher', //仅为示例，并非真实的接口地址
      data: {
        time: that.data.time_,
        teacher: that.data.teacher_list[that.data.index_].title,
        id: that.data.order_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            success_tip: true,
            hy_num: res.data.huiyuan_number
          });
        }

      }
    })



  },

  i_konw: function() {
    this.setData({
      success_tip: false
    });
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 7
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      order_id: options.order_id
    })
    wx.request({
      url: http + '/api/Column/free_cate_teacher', //仅为示例，并非真实的接口地址
      data: {
        id: options.id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            teacher_list: res.data.data
          })
        }


      }
    })


    var myDate = new Date();
    var my_date = [];
    var mj = myDate.getDate();
    for (var i = myDate.getMonth() + 1; i <= 12; i++) {
      for (var j = mj; j <= 31; j++) {
        if (i == 2 && j == 30) {
          continue;
        }
        if (i == 2 && j == 31) {
          continue;
        }

        if (i == 4 && j == 31) {
          continue;
        }
        if (i == 6 && j == 31) {
          continue;
        }
        if (i == 9 && j == 31) {
          continue;
        }
        if (i == 11 && j == 31) {
          continue;
        }
        mj = 1;
        my_date.push(i + "月" + j + "日");
      }
    }
    // console.log(my_date);
    this.setData({
      d1: my_date
    })

    var d2 = [];
    for (var i = 0; i <= 23; i++) {
      if (i < 10) {
        d2.push('0' + i + '点');
      } else {
        d2.push(i + '点');
      }

    }
    console.log(myDate.getHours());
    this.setData({
      d2: d2
    })
    // console.log(d2)

    var d3 = [];
    for (var i = 0; i <= 59; i += 5) {
      if (i < 10) {
        d3.push('0' + i + '分')
      } else {
        d3.push(i + '分')
      }

    }
    this.setData({
      d3: d3
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