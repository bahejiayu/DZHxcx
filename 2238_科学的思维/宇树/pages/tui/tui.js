// pages/tui/tui.js
var app = getApp();
var http = app.globalData.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_: {},
    url: http,
    type_: "请选择",
    yy_: '请选择',
    sm:"",
    hand_card: [],
    id_:""

  },
  sub_mit:function(){
      var that=this;
    if (that.data.type_ =='请选择'){
          wx.showToast({
            title: '请选择售后类型',
            icon:'none'
          });
          return false;
    };


    if (that.data.yy_ == '请选择') {
      wx.showToast({
        title: '请选择申请原因',
        icon: 'none'
      });
      return false;
    };

    if (that.data.sm == '') {
      wx.showToast({
        title: '请输入申请说明',
        icon: 'none'
      });
      return false;
    };

    if (that.data.hand_card.length != 1) {
      wx.showToast({
        title: '请上传凭证',
        icon: 'none'
      });
      return false;
    };
    wx.request({
      url: http +'/api/user/re_goods', //仅为示例，并非真实的接口地址
      data: {
        order_id: that.data.id_,
        type: that.data.type_,
        reason: that.data.yy_,
        desc:that.data.sm,
        pic: that.data.hand_card
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
            if(res.data.code==1){
                  wx.showToast({
                    title: '申请成功',
                  });
                  setTimeout(function(){
                        wx.navigateBack({
                          delta:1
                        });

                  },1500)
            }else{
              wx.showToast({
                title: res.data.msg,
                icon:'none'
              });
              return false;
            }
      }
    })




  },
  get_sm:function(e){
    this.setData({
      sm:e.detail.value
    });
  },
  del_card: function (e) {
    var index_ = e.target.dataset.index;
    var del_list = this.data.hand_card;
    del_list.splice(index_, 1);
    this.setData({
      hand_card: del_list
    });

  },
  up_card: function () {
    var that = this;
    // if (that.data.hand_card.length > 3) {
    //   wx.showToast({
    //     title: '不能重复上传',
    //     icon: 'none'
    //   });
    //   return false;
    // };
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0];
        console.log(tempFilePaths)
        wx.showLoading({
          title: '上传中',
        })
        wx.uploadFile({
          url: http + '/api/user/upload_image', //仅为示例，非真实的接口地址
          filePath: tempFilePaths,
          name: 'image',
          method: "POST",
          success: function (res) {
            wx.hideLoading();
            console.log(res.data)
            console.log(JSON.parse(res.data));
            var data_ = JSON.parse(res.data);
            if (data_.code == 1) {
              var list_img_up = that.data.hand_card;
              list_img_up.push(data_.data.image_name);
              that.setData({
                hand_card: list_img_up
              })

            } else {
              wx.showToast({
                title: '上传失败',
                icon: 'none'
              })
            }
          }
        })
      }
    })
  },
  t_type: function() {
    var type_list = ['仅退款', '退货退款', '换货']
    var that = this;
    wx.showActionSheet({
      itemList: type_list,
      success(res) {
        console.log(res.tapIndex);
        that.setData({
          type_: type_list[res.tapIndex]
        });
      },
      fail(res) {
        console.log(res.errMsg)
      }
    });
  },
  t_yy: function () {
    var type_list = ['商家发错货', '商品描述不符', '收到商品少计/破损等','其他']
    var that = this;
    wx.showActionSheet({
      itemList: type_list,
      success(res) {
        console.log(res.tapIndex);
        that.setData({
          yy_: type_list[res.tapIndex]
        });
      },
      fail(res) {
        console.log(res.errMsg)
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 30
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      id_: options.id
    });
    var that = this;
    wx.request({
      url: http + '/api/user/re_info', //仅为示例，并非真实的接口地址
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          that.setData({
            data_: res.data.data
          });
        }
        console.log(res.data)
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