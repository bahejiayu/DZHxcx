// pages/book_detail/book_detail.js

var app = getApp();
var http = app.globalData.http;


Page({

  /**
   * 页面的初始数据
   */
  data: {
      data_:{},
      url:http,
      id_:""
  },
  buy_:function(){
    var that=this;
    
    if (!wx.getStorageSync('user_obj')){
          wx.showToast({
            title: '请前往个人中心登录',
            icon:'none'
          });
          return false;
      };

        wx.showLoading({
          title: '请稍等',
        });
    wx.request({
      url: http +'/api/Aorder/add_book', //仅为示例，并非真实的接口地址
      data: {
       type:3,
       goods_id:that.data.id_,
      openid: wx.getStorageSync('user_obj').wx_openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
          if(res.data.code==1){
                wx.navigateTo({
                  url: '../order_table/order_table?id='+res.data.id,
                })

          }else{
            if (res.data.msg == '请完善信息') {
              wx.navigateTo({
                url: '../information/information?t=1',
              });
              return false;
            }
                wx.showToast({
                  title: res.data.msg,
                  icon:'none'
                });
          }
      }
    });


  },
  tog_sc: function () {
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
  add_car: function () {
    var that = this;

    if (!wx.getStorageSync('user_obj').wx_openid) {
      wx.showToast({
        title: '请前往个人中心登陆',
        icon: 'none'
      });
      return false;
    }
    wx.showLoading({
      title: '正在加入购物车',
    });
    wx.request({
      url: http + '/api/car/add_book', //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid,
        id: that.data.id_,
        title: that.data.data_.title,
        pic: that.data.data_.pic,
        price: that.data.data_.price
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.code == 1) {
          wx.showToast({
            title: '加入成功',
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // id = 437 
    this.setData({
      // id_: options.id
      id_: options.id
    })

    var that=this;
    wx.request({
      url:http+'/api/goods/book_info', //仅为示例，并非真实的接口地址
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if(res.data.code==1){
          res.data.data.imgs = res.data.data.morepic.split('***');
          res.data.data.imgs.pop();
              that.setData({
                data_:res.data.data
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