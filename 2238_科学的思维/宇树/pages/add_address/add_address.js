// pages/add_address/add_address.js

var app = getApp();
var http = app.globalData.http;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bj_show:false,
      name:'',
      phone:'',
      code:"",
      address:'',
      xq:'',
      sheng_show:false,
      shi_show:false,
      qu_show:false,
      sheng_arr:[],
      shi_arr:[],
      qu_arr:[],
      sheng_id:"",
      sheng_name:'',
      shi_id:'',
      shi_name:'',
      region:"",
      qu_id: '',
      qu_name: '',
      df:1

        },
  show_sheng: function () {
    this.setData({
      sheng_show: true,
      bj_show: true
    })
  },
  is_default: function (e){
    var that=this;
    console.log(e.detail)
    if (e.detail.value){
        that.setData({
            df:1
        })
    }else{
      that.setData({
        df: 0
      })
    }
  },
  submit_: function () {
    var that = this

    if (that.data.name == "") {
      wx.showToast({
        title: '收货人不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    var pattern = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
    if (!pattern.test(that.data.phone) || that.data.phone == "") {
      wx.showToast({
        title: '请填写有效的手机号',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (that.data.region == "") {
      wx.showToast({
        title: '请选择地区信息',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    var zz = /^[1-9]\d{5}$/
    if (!zz.test(that.data.code)) {
      wx.showToast({
        title: '请填写正确的邮政编码',
        icon: 'none',
        duration: 2000
      })
      return false
    }

    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: http+'/api/user/add_address', //仅为示例，并非真实的接口地址
      data:{
       
          name:that.data.name,
          mobile:that.data.phone,
          address:that.data.xq,
        province: that.data.region,
        zip:that.data.code,
        openid: wx.getStorageSync('user_obj').wx_openid,
        default:0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        wx.hideLoading();
        
        if (res.data.code == '1') {
          wx.showToast({
            title: '新增成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }

      }
    })
  },
  get_name:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  sheng_cl: function (e) {
    var that = this
    console.log(e.target.dataset.area_id)
    console.log(e.target.dataset.area_name)
    this.setData({
      sheng_id: e.target.dataset.area_id,
      sheng_name: e.target.dataset.area_name
    })

    wx.request({
      url: http+'/api/user/address_query', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        parent_id: that.data.sheng_id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          shi_arr: res.data.data
        })
      }
    })
    that.setData({
      sheng_show: false,
      shi_show: true,
      qu_show: false
    })
  },
  shi_cl: function (e) {
    var that = this
    console.log(e.target.dataset.area_id)
    console.log(e.target.dataset.area_name)
    this.setData({
      shi_id: e.target.dataset.area_id,
      shi_name: e.target.dataset.area_name
    })

    wx.request({
      url: http+'/api/user/address_query', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        parent_id: that.data.shi_id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          qu_arr: res.data.data
        });
        if (that.data.qu_arr.length <= 0) {
          var all_name = that.data.sheng_name + " " + that.data.shi_name
          that.setData({
            region: all_name
          })
          that.setData({
            sheng_show: false,
            shi_show: false,
            qu_show: false,
            bj_show: false
          });
          return false;
          
        }
      }
    })
    that.setData({
      sheng_show: false,
      shi_show: false,
      qu_show: true
    })
  },
  qu_cl: function (e) {
    console.log(e.target.dataset.area_name)
    var all_name = this.data.sheng_name + " " + this.data.shi_name + " " + e.target.dataset.area_name
    this.setData({
      qu_id: e.target.dataset.area_id,
      qu_name: e.target.dataset.area_name,
      region: all_name
    })
    this.setData({
      sheng_show: false,
      shi_show: false,
      qu_show: false,
      bj_show: false
    })
  },
  close_: function () {
    this.setData({
      sheng_show: false,
      shi_show: false,
      qu_show: false,
      bj_show: false
    })
  },
  get_phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  get_code: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  get_area: function (e) {
    this.setData({
      xq: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求省
    var that = this
  
    wx.request({
      url: http+'/api/user/address_query', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
          parent_id:0
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == '1') {
          that.setData({
            sheng_arr: res.data.data
          })
        }
      }
    })
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
  
  }
})