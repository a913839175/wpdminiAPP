//app.js
const api = require('./utils/api.js');
const md5 = require('./lib/md5/md5.js');
const ECODE = {
  'E0001': '\u7528\u6237\u767b\u5f55\u8bb0\u5f55\u4e0d\u5b58\u5728',
  'E0002': '\u7528\u6237\u767b\u5f55\u72b6\u6001\u8ba4\u8bc1\u5931\u8d25',
  'E0003': '\u767b\u5f55\u8d85\u65f6\u6216\u5df2\u5728\u522b\u5904\u767b\u5f55\u002c\u8bf7\u91cd\u65b0\u767b\u5f55',
  'E0004': '\u7f51\u7edc\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u0020\u007e\u007e',
  'E0005': '\u9000\u51fa\u767b\u5f55\u5931\u8d25\uff01'
};
App({
  onLaunch: function () {
    var self = this;
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //获取用户登录信息
    self.$ajax.getAppInfo().then((res) => {
      self.globalData.userData = res.data;
      if (api.util.isEmpty(res.data) || typeof (res.data.us_token_msg) == "undefined") {
        api.util.$alert(ECODE.E0004);
        return false;
      }
      if (res.data.us_token_msg.indexOf(ECODE.E0002) > -1) {
        api.util.$alert(ECODE.E0003).then(()=>{
          //退出登录
        });
      } 
    });
  },
  globalData: {
    userInfo: null,
    userData: null,    
  },
  $ajax: api.apiList,
  refresh:function(callback){
    wx.showNavigationBarLoading();
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      callback && callback();
    }, 800);
  },
  $alert: api.util.$alert,
  md5: function (str){
    return md5(str);
  } 
})