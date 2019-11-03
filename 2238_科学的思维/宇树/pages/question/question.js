// pages/question/question.js
var app = getApp();
var http = app.globalData.http;


var post_list = []
Page({

  onPageScroll: function(obj) {
    console.log(132)
    var that = this;
    var query = wx.createSelectorQuery();
    query.select('#container_' + that.data.index_).boundingClientRect(function(rect) {
      console.log(rect.height)
      that.setData({
        zong: rect.height
      })
    }).exec();
    // console.log((obj.scrollTop / (that.data.zong - that.data.max_height)*100 ));
    // console.log((that.data.max_height * obj.scrollTop) / that.data.zong);
    // console.log(obj.scrollTop)
    // console.log(that.data.zong -that.data.max_height)
    // var zz = that.data.zong - that.data.max_height;
    var p = obj.scrollTop / (that.data.zong - that.data.max_height - (75 * 1));
    if (p > 0.94) p = 0.94;
    this.setData({
      scroll_: p * 100
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    left_: 0,
    max_width: '',
    max_height: '',
    zong: '',
    url: http,
    scroll_: 0,
    all_list: [],
    one_list: [],
    index_: 0,
    test: '',
    img_url: '',
    show_gun: false

  },
  next_: function() {
    var that = this;



    var t_index = that.data.index_;
    t_index++;
    if (that.data.left_ <= 0) {
      post_list.push(0);

    } else {
      post_list.push(that.data.left_);
    }
    if (post_list.length == that.data.all_list.length) {
      console.log(post_list);
      wx.setStorageSync('list_', post_list);
      wx.navigateTo({
        url: '../result/result',
      })
      return false;
    }


    that.setData({
      left_: 0,
      index_: t_index,
      img_url: that.data.all_list[t_index].imgs[0]
    });
    var query = wx.createSelectorQuery();
    setTimeout(function() {

      query.select('#container_' + that.data.index_).boundingClientRect(function(rect) {
        console.log('内容高=' + rect.height)
        console.log('容器高=' + that.data.max_height)
        console.log(rect.height > that.data.max_height);
        if (rect.height > that.data.max_height) {
          that.setData({
            show_gun: true
          })
        } else {
          that.setData({
            show_gun: false
          })
        }

      }).exec();
    }, 500)

  },
  get_height: function() {
    var that = this;
    var query = wx.createSelectorQuery();
    setTimeout(function() {

      query.select('#container_' + that.data.index_).boundingClientRect(function(rect) {
        console.log('内容高=' + rect.height)
        console.log('容器高=' + that.data.max_height)
        console.log(rect.height > that.data.max_height);
        if (rect.height > that.data.max_height) {
          that.setData({
            show_gun: true
          })
        } else {
          that.setData({
            show_gun: false
          })
        }

      }).exec();
    }, 500)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    post_list=[];
    // 获取题目
    var that = this;
    wx.request({
      url: http + '/api/Query/problem', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].imgs = res.data.data[i].piclist.split('***');
            res.data.data[i].imgs.pop()
          }

          that.setData({
            all_list: res.data.data,
            img_url: res.data.data[that.data.index_].imgs[0]
          });
          var query = wx.createSelectorQuery();
          query.select('#container_' + that.data.index_).boundingClientRect(function(rect) {
            console.log('内容高=' + rect.height)
            console.log('容器高=' + that.data.max_height)
            console.log(rect.height > that.data.max_height);

            if (rect.height > that.data.max_height) {
              that.setData({
                show_gun: true
              })
            } else {
              that.setData({
                show_gun: false
              })
            }
          }).exec();

        }
      }
    })







    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          max_width: res.windowWidth,
          max_height: res.windowHeight

        })
      }
    });

  },
  start_: function(e) {
    var that = this;
    var arr_index = 0;
    console.log('开始=' + e.changedTouches[0].pageX);
    var fen = ((100 * e.changedTouches[0].pageX) / (that.data.max_width - 55));


    if (that.data.left_ < 0) {
      that.setData({
        left_: 0
      })
      if (that.data.left_ <= 20) {
        arr_index = 0;
      } else if (that.data.left_ >= 21 && that.data.left_ <= 40) {
        arr_index = 1
      } else if (that.data.left_ >= 41 && that.data.left_ <= 60) {
        arr_index = 2
      } else if (that.data.left_ >= 61 && that.data.left_ <= 80) {
        arr_index = 3
      } else if (that.data.left_ >= 81 && that.data.left_ <= 100) {
        arr_index = 4
      };
      that.setData({
        img_url: that.data.all_list[that.data.index_].imgs[arr_index]
      });
      return false;
    }

    if (fen > 100) {
      fen = 100;
    };

    this.setData({
      left_: parseInt(fen)
    });
    if (that.data.left_ <= 20) {
      arr_index = 0;
    } else if (that.data.left_ >= 21 && that.data.left_ <= 40) {
      arr_index = 1
    } else if (that.data.left_ >= 41 && that.data.left_ <= 60) {
      arr_index = 2
    } else if (that.data.left_ >= 61 && that.data.left_ <= 80) {
      arr_index = 3
    } else if (that.data.left_ >= 81 && that.data.left_ <= 100) {
      arr_index = 4
    };
    that.setData({
      img_url: that.data.all_list[that.data.index_].imgs[arr_index]
    });




  },
  move_: function(e) {
    var arr_index = 0;
    console.log('移动=' + e.changedTouches[0].pageX);
    var that = this;
    var fen = ((100 * e.changedTouches[0].pageX) / (that.data.max_width - 55));
    if (that.data.left_ < 0) {
      that.setData({
        left_: 0
      })
      if (that.data.left_ <= 20) {
        arr_index = 0;
      } else if (that.data.left_ >= 21 && that.data.left_ <= 40) {
        arr_index = 1
      } else if (that.data.left_ >= 41 && that.data.left_ <= 60) {
        arr_index = 2
      } else if (that.data.left_ >= 61 && that.data.left_ <= 80) {
        arr_index = 3
      } else if (that.data.left_ >= 81 && that.data.left_ <= 100) {
        arr_index = 4
      };
      that.setData({
        img_url: that.data.all_list[that.data.index_].imgs[arr_index]
      });
      return false;
    };
    if (fen > 100) {
      fen = 100;
    };
    this.setData({
      left_: parseInt(fen)
    });
    if (that.data.left_ <= 20) {
      arr_index = 0;
    } else if (that.data.left_ >= 21 && that.data.left_ <= 40) {
      arr_index = 1
    } else if (that.data.left_ >= 41 && that.data.left_ <= 60) {
      arr_index = 2
    } else if (that.data.left_ >= 61 && that.data.left_ <= 80) {
      arr_index = 3
    } else if (that.data.left_ >= 81 && that.data.left_ <= 100) {
      arr_index = 4
    };
    that.setData({
      img_url: that.data.all_list[that.data.index_].imgs[arr_index]
    });
  },
  end_: function(e) {
    var that = this;
    console.log('结束=' + e.changedTouches[0].pageX)
    var fen = ((100 * e.changedTouches[0].pageX) / (that.data.max_width - 55));
    if (that.data.left_ < 0) {
      that.setData({
        left_: 0
      })
      return false;
    };
    if (fen > 100) {
      fen = 100;
    };
    this.setData({
      left_: parseInt(fen)
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
    var that = this;
    if (post_list.length == 13) {
      wx.reLaunch({
        url: '../other_index/other_index'
      });
    }

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