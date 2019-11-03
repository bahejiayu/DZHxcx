// pages/journal_tx/journal_tx.js
var app = getApp();
var http = app.globalData.http;

Page({

  /**
   * 页面的初始数据
   */
  data: {
        title_:'',
        area_:"",
    hand_card:[],
    url:http
  },
  del_card: function (e) {
    var index_ = e.target.dataset.index;
    var del_list = this.data.hand_card;
    del_list.splice(index_, 1);
    this.setData({
      hand_card: del_list
    });

  },
  get_title:function(e){
    this.setData({
      title_:e.detail.value
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
  sub_mit:function(){
      var that=this;
    if (that.data.title_==''){
          wx.showToast({
            title: '请填写标题',
            icon:'none'
          });
          return false;
      }
    if (that.data.area_ == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      });
      return false;
    }

    wx.showLoading({
      title: '发布成功',
    });

    wx.request({
      url: http +'/api/user/add_personal_log', //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid,
        title: that.data.title_,
        content: that.data.area_,
        pic: that.data.hand_card,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
          if(res.data.code==1){
                wx.showToast({
                  title: '发布成功',
                });
          };
          setTimeout(function(){
              wx.navigateBack({
                delta:1
              });

          },1500)
        console.log(res.data)
      }
    })












  },
  get_area: function (e) {
    this.setData({
      area_: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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