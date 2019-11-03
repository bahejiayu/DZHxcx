// pages/test_card/test_card.js
var app = getApp();
var http = app.globalData.http;
var my_time;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test_list: [],
    top_tip: '点击开始答题',
    id_:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 20
    var that = this;
    this.setData({
      id_:22
    })
    wx.request({
      url: http + '/api/query/timu_num', //仅为示例，并非真实的接口地址
      data: {
        id: 22
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          that.setData({
            length: res.data.data.test_number
          });
          var arr = [];
          for (var i = 0; i < res.data.data.test_number; i++) {
            arr[i] = '';
          }

          that.setData({
            test_list: arr
          })


        }
      }
    })
  },
  an_btn: function(e) {
    var that = this;
    if (that.data.top_tip=='点击开始答题'){
      wx.showToast({
        title: '请点击开始答题',
        icon: "none"
      });
      return false;
    }


    var list = this.data.test_list;
    console.log(e.target.dataset.index + e.target.dataset.txt)
    // console.log(list)
    list[e.target.dataset.index] = e.target.dataset.index + e.target.dataset.txt;
    this.setData({
      test_list: list
    })


  },
  j_time: function() {

    clearTimeout(my_time);
    var now_miao = 0;
    var now_feng = 0;
    var now_shi = 0;
    var that = this;

    my_time = setInterval(function() {
      now_miao++;
      if (now_miao == 60) {
        now_miao = 0;
        now_feng++;
        if (now_feng == 60) {
          now_shi++;
        }


      }

      if (now_miao < 10) {
        now_miao = '0' + now_miao;
      }
      // console.log(now_feng + ''.length)

      if (now_feng < 10 && (now_feng + '').length == 1) {
        now_feng = '0' + now_feng;
      }
      if (now_shi < 10 && (now_shi + '').length == 1) {
        now_shi = '0' + now_shi;
      }

      that.setData({
        top_tip: now_shi + ":" + now_feng + ":" + now_miao
      })

      // that.setData({
      //   time_txt: now_feng + ":" + now_miao
      // });
      // console.log(now_shi + ":" + now_feng + ":" + now_miao)
    }, 1000)



  },
  sub_mit: function() {
    var that = this;
    for (var i = 0; i < that.data.test_list.length; i++) {
      if (that.data.test_list[i]==''){
              wx.showToast({
                title: '请将题目答完',
                icon:'none'
              });
              return false;
        }else{
        console.log(that.data.test_list[i].length)
        that.data.test_list[i] = that.data.test_list[i].charAt(that.data.test_list[i].length - 1);
        }
    };

    console.log(that.data.test_list.join(','));
    wx.showLoading({
      title: '提交中',
    });
    wx.request({
      url: http +'/api/Query/add_answer', //仅为示例，并非真实的接口地址
      data: {
        id:that.data.id_,
        answer: that.data.test_list.join(','),
        leng_time: that.data.top_tip
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if(res.data.code==1){
              wx.showToast({
                title: '提交成功',
              });
              setTimeout(function(){
                wx.navigateBack({
                  delta: 3
                })
              },1500)
        }else{
          wx.showToast({
            title: res.data.msg,
          });
        }
        console.log(res.data)
      }
    })

  },
  an_tap: function(e) {
    var i1 = e.target.dataset.i1;
    var i2 = e.target.dataset.i2;
    var list_ = this.data.test_list;
    // console.log(i1+1, e.target.dataset.txt)
    for (var i = 0; i < list_[i1].length; i++) {
      list_[i1][i] = '';
    }
    list_[i1][i2] = i1 + e.target.dataset.txt;

    this.setData({
      test_list: list_
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