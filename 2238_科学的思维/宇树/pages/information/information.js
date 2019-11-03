// pages/information/information.js

var app = getApp();
var http = app.globalData.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    age_: '',
    edc_: '',
    mobile_: "",
    name_: "",
    sex_: "",
    vocation_: '',
    num: 1,
    id_: "",
    flag_: false,
    txt_: '下一步'
  },
  get_age: function(e) {
    this.setData({
      age_: e.detail.value
    })
  },
  get_edc: function(e) {
    this.setData({
      edc_: e.detail.value
    })
  },
  get_mobile: function(e) {
    this.setData({
      mobile_: e.detail.value
    })
  },

  get_name: function(e) {
    this.setData({
      name_: e.detail.value
    })
  },
  get_vocation: function(e) {
    this.setData({
      vocation_: e.detail.value
    })
  },
  get_sex: function(e) {
    this.setData({
      sex_: e.target.dataset.sex
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    if (options.t == 1) {
      that.setData({
        flag_: true,
        txt_: '保存'
      });
    } else {
      that.setData({
        flag_: false,
        txt_: '下一步'

      });
    }

    // for(true){
    //     wx.showToast({
    //       title: '123',
    //     })
    // }
    this.setData({
      id_: options.id
    })

    wx.showLoading({
      title: '集中在',
    })
    // 20
    var that = this;
    wx.request({
      url: http + '/api/Query/member_info', //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid,
        id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            age_: res.data.data.age || "",
            edc_: res.data.data.edc || "",
            mobile_: res.data.data.mobile || "",
            name_: res.data.data.name || "",
            sex_: res.data.data.sex || 1,
            vocation_: res.data.data.vocation || "",
            num: res.data.num
          })
        }
      }
    })
  },
  next_: function(e) {


    var that = this;
    if (that.data.name_ == '') {
      wx.showToast({
        title: '请填写您的姓名',
        icon: 'none'
      });
      return false;
    };

    if (that.data.age_ == '') {
      wx.showToast({
        title: '请输入您的年龄',
        icon: 'none'
      });
      return false;
    };
    var pattern = /^((1[3,5,7,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;

    if (!pattern.test(that.data.mobile_)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return false;
    };

    if (that.data.edc_ == '') {
      wx.showToast({
        title: '请输入您的学历',
        icon: 'none'
      });
      return false;
    };
    if (that.data.vocation_ == '') {
      wx.showToast({
        title: '请输入您的职业',
        icon: 'none'
      });
      return false;
    };
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: http + '/api/Query/add_member', //仅为示例，并非真实的接口地址
      data: {
        age: that.data.age_,
        edc: that.data.edc_,
        mobile: that.data.mobile_,
        name: that.data.name_,
        sex: that.data.sex_,
        vocation: that.data.vocation_,
        openid: wx.getStorageSync('user_obj').wx_openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {

          if (that.data.flag_) {
            wx.showToast({
              title: '保存成功',
            });
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              });

            }, 1500)

          } else {
            wx.navigateTo({
              url: '../pc_rule/pc_rule?id=' + that.data.id_,
            });
          }


        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
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