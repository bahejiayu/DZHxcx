
var app = getApp();
var http = app.globalData.http;


Page({
  /** 
   * 页面的初始数据
   */
  data: {
    sysW: null,
    lastDay: null,
    firstDay: null,
    year: null,
    hasEmptyGrid: false,
    cur_year: '',
    cur_month: '',
    firstDay: null,
    getDate: null,
    month: null,
    display: "none",
    week: [
      {
        wook: "一"
      }, {
        wook: "二"
      }, {
        wook: "三"
      }, {
        wook: "四"
      }, {
        wook: "五"
      }, {
        wook: "六"
      }, {
        wook: "日"
      },
    ],
    day: [
      {
        wook: '',
        src: "../../image/newspaper.png",
      }, {
        wook: ''
      }, {
        wook: ''
      }, {
        wook: ''
      }, {
        wook: ''
      }, {
        wook: ''
      }, {
        wook: ''
      }
    ],
    days: [
      {
        src: "../../image/newspaper.png"
      }
    ]
  },
  getProWeekList: function () {
    let that = this
    let date = new Date()
    let dateTime = date.getTime(); // 获取现在的时间
    let dateDay = date.getDay();// 获取现在的
    let oneDayTime = 24 * 60 * 60 * 1000; //一天的时间
    let proWeekList;
    let weekday;
    console.log(dateTime)
    for (let i = 0; i < 7; i++) {
      let time = dateTime - (dateDay - 1 - i) * oneDayTime;
      proWeekList = new Date(time).getDate(); //date格式转换为yyyy-mm-dd格式的字符串
      weekday = "day[" + i + "].wook"
      that.setData({
        [weekday]: proWeekList,
      })
      //that.data.day[i].wook = new Date(time).getDate();
    }
  },
  dateSelectAction: function (e) {
    let cur_day = e.currentTarget.dataset.idx;
    this.setData({
      todayIndex: cur_day
    })  
    console.log(`点击的日期:${this.data.cur_year}年${this.data.cur_month}月${cur_day + 1}日`);
  },

  setNowDate: function () {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const todayIndex = date.getDate();
    console.log(`日期：${todayIndex}`)
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year: cur_year,
      cur_month: cur_month,
      weeks_ch,
      todayIndex,
    })
  },

  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];
    let weekday;
    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      // days[i].push(i);
      weekday = "days[" + (i - 1) + "].item"
      this.setData({
        [weekday]: i,
        src: ''
      })
    }


    console.log(this.data.days)
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;


    this.setData({
      days: []
    })


    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      let firstDay = new Date(newYear, newMonth - 1, 1);
      this.data.firstDay = firstDay.getDay();
      this.setData({
        cur_year: newYear,
        cur_month: newMonth,
        marLet: this.data.firstDay
      })
      if (this.data.month == newMonth) {
        this.setData({
          judge: 1
        })
      } else {
        this.setData({
          judge: 0
        })
      }
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);
      let firstDay = new Date(newYear, newMonth - 1, 1);
      this.data.firstDay = firstDay.getDay();
      this.setData({
        cur_year: newYear,
        cur_month: newMonth,
        marLet: this.data.firstDay
      })
      if (this.data.month == newMonth) {
        this.setData({
          judge: 1
        })
      } else {
        this.setData({
          judge: 0
        })
      }
    }
  },
  dataTime: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var months = date.getMonth() + 1;

    //获取现今年份
    this.data.year = year;

    //获取现今月份
    this.data.month = months;

    //获取今日日期
    this.data.getDate = date.getDate();

    //最后一天是几号
    var d = new Date(year, months, 0);
    this.data.lastDay = d.getDate();

    //第一天星期几
    let firstDay = new Date(year, month, 1);
    this.data.firstDay = firstDay.getDay();
  },
  onshow: function () {
    this.setData({
      display: "block",
    })
  },
  onhide: function () {
    this.setData({
      display: "none",
    })
  },
  sing_:function(){
    var that=this;
    console.log(that.data.data_)
    if (that.data.data_.data){
              return false;
        };
    wx.showLoading({
      title: '正在签到',
    });

    wx.request({
      url: http +'/api/query/add_sign', //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
          if(res.data.code==1){
            wx.request({
              url: http + '/api/query/sign_in', //仅为示例，并非真实的接口地址
              data: {
                openid: wx.getStorageSync('user_obj').wx_openid
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res.data);
                wx.hideLoading();
                wx.showToast({
                  title: '签到成功',
                })
                if (res.data.code == 1) {
                  that.setData({
                    data_: res.data
                  });
                }
              }
            });
          }
        console.log(res.data)
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.getStorageSync('user_obj').wx_openid){
            wx.showToast({
              title: '请前往个人中心登录',
              icon:"none"
            });
            return false;
      }


    var that = this;
    this.setNowDate();
    this.getProWeekList()

    this.dataTime();
    var res = wx.getSystemInfoSync();
    this.setData({
      sysW: res.windowHeight / 12 - 5,//更具屏幕宽度变化自动设置宽度
      marLet: this.data.firstDay,
      getDate: this.data.getDate,
      judge: 1,
      month: this.data.month,
    });

    /**
     * 获取系统信息
     */
    
    wx.showLoading({
      title: '加载中',
    });
    var that=this;
    wx.request({
      url: http +'/api/query/sign_in', //仅为示例，并非真实的接口地址
      data: {
        openid: wx.getStorageSync('user_obj').wx_openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        wx.hideLoading();
        if(res.data.code==1){
            that.setData({
              data_:res.data
            });
        }
      }
    });



  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,

      })
    }
    // console.log(that.data.nubmerLength)
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
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