//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js');
var ctx = wx.createCanvasContext('progress');

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    newsList: [
      { url: "url", title: "11微拍贷银行存管对接，重新改版正式上线···" },
      { url: "url", title: "22微拍贷银行存管对接，重新改版正式上线···" },
      { url: "url", title: "33微拍贷银行存管对接，重新改版正式上线···" }
    ],
    autoplay: true,
    indicatorDots: true,
    process: 0,
    processNum: 80,
    indicatorColor: '#d9d9d9',
    indicatorActiveColor: '#fff',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {

  },
  goInvite: util.throttle(function (e) {
    wx.navigateTo({
      url: '../invest/invest_detail?id=LOAN201801161516094848&type=loan'
    })
  }, 1000),
  //下拉刷新
  onPullDownRefresh: function () {
    var self = this;
    wx.showNavigationBarLoading();
    self.setData({
      autoplay: false,
    });
    app.refresh(function () {
      self.setData({
        autoplay: true,
        process: 0
      });
      self.ctxAnimate();
    });
  },
  onLoad: function () {
    app.$ajax.scrollpic({
      us: '11'
    }).then(function (res) {
      console.log(res.data.lists)
    })
  },
  ctxAnimate: function () {
    var self = this;
    var processNum = self.data.processNum;
    var process = self.data.process;
    setTimeout(function () {
      process += 1;
      self.setData({
        process: process
      });
      self.drawCricle(process);
      if (process <= processNum) {
        self.ctxAnimate();
      }
    }, 800 / 60);
  },
  drawCricle: function (percent) {
    var clienWidth = wx.getSystemInfoSync().windowWidth;
    var w = 15 * clienWidth / 750, x = 150 * clienWidth / 750, y = 150 * clienWidth / 750, radius = 134 * clienWidth / 750, e = Math.PI * (1 + percent / 100);
    ctx.setLineWidth(w);
    ctx.setStrokeStyle('#ffaa00');
    ctx.beginPath();
    ctx.arc(x, y, radius, Math.PI * 1, e, false);
    ctx.stroke();
    ctx.draw();
  },
  onReady: function () {
    //创建并返回绘图上下文context对象。
    this.ctxAnimate();
  },
  onLoad: function (options) {
    var self = this;
  }
})
