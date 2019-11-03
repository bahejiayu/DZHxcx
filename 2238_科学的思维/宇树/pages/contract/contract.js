// pages/contract/contract.js
var app = getApp();
var http = app.globalData.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      data_:{},
      name1:'',
      name2: '',
      card:''
  },
  get_name1:function(e){
      this.setData({
        name1:e.detail.value
      });
  },
  get_name2: function (e) {
    this.setData({
      name2: e.detail.value
    });
  },
  get_card: function (e) {
    this.setData({
      card: e.detail.value
    });
  },
  sub_mit:function(){
      var that=this;
    if (that.data.name1 == '' || that.data.name2 == '' || that.data.card == ''){
          wx.showToast({
            title: '请填写完善合同',
            icon:'none'
          });
          return false;
    };

    if (that.data.name1 != that.data.name2){
      wx.showToast({
        title: '两次姓名不一致',
        icon: 'none'
      });
      return false;
    };
    wx.showLoading({
      title: '提交中',
    });
    wx.request({
      url: http +'/api/query/qian_hetong', //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid,
        name: that.data.name1,
        cid: that.data.card,
        re_name: that.data.name2
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
            if(res.data.code==1){
                  wx.showToast({
                    title: '提交成功',
                  });

            }else{
              wx.showToast({
                title: res.data.msg,
                icon:'none'
              });
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
      var that=this;
    wx.request({
      url: http +'/api/Query/dk_hetong', //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
            if(res.data.code==1){
                that.setData({
                  data_:res.data.info
                });
              if (res.data.data.name){
                    that.setData({
                      name1: res.data.data.name,
                      name2: res.data.data.re_name,
                      card: res.data.data.cid,
                      time1: res.data.data.a_time,
                      time2: res.data.data.b_time,
                    });
              }

            }
        console.log(res.data);
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