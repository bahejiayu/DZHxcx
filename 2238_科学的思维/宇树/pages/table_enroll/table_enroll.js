// pages/table_enroll/table_enroll.js
var app = getApp();
var http = app.globalData.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      data_:{},
    url: http
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
    console.log(options.id);
    console.log(JSON.parse(options.data));
    wx.request({
      url: http +'/api/aorder/shapan_add', //仅为示例，并非真实的接口地址
      data: {
        tc_data: JSON.parse(options.data),
        openid: wx.getStorageSync('user_obj').wx_openid,
        id: options.id,
        type:4
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
            if(res.data.code==1){
              wx.request({
                url: http + '/api/aorder/shapan_info', //仅为示例，并非真实的接口地址
                data: {
                    id:res.data.id
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  wx.hideLoading();
                  console.log(res.data);
                  if (res.data.code == 1) {
                        that.setData({
                          data_:res.data.data
                        })
                  }


                }
              })

            }else{
              if (res.data.msg == '请完善信息') {
                wx.navigateTo({
                  url: '../information/information?t=1',
                });
                return false;
              }
            }


      }
    })



  },
  sub_mit:function(){
    var that=this;
    wx.request({
      url: http + '/api/order/pay', //仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id: that.data.data_.id
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
              wx.navigateBack({
                delta:1
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