//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    isLogin:false
  },
  //事件处理函数
  bindViewTap: function () {

  },
  //下拉刷新
  onPullDownRefresh: function () {
    var self = this;
    wx.showNavigationBarLoading();
    app.refresh(function () {

    });
  },
  onReady: function () {
    console.log(app.globalData.userData)
  }
})
