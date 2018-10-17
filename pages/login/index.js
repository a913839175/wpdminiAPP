//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js');

Page({
  data: {
    userName: "",
    userPwd: ""
  },
  //获取用户输入的用户名
  userNameInput:function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passWdInput:function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  formSubmit: function (e) {
    var JSEncrypt = require('../../lib/JSEncrypt/JSEncrypt');
    var encodeStr = function (STR, TOKEN) {
      return JSEncrypt(STR, 'weipaidai', TOKEN, 'java_http_web');
    }; 
    const postData = JSON.stringify({
      'u1': this.data.userName,
      'u2': app.md5(this.data.userPwd),
      'u3': '01'
    });
    const subtime = new Date().getTime() + "";
    const params = {
      userVerify: encodeStr(postData, subtime),
      unixkey: subtime
    };
    wx.showToast({
      title: '正在登录...',
      icon: 'loading',
      duration: 10000
    });
    app.$ajax.login(params).then((res) => {
      wx.hideToast();
      if(res.data.result == "1"){
        app.globalData.userId = res.data.user_id;
        wx.setStorageSync("user_id", res.data.user_id);
        wx.setStorageSync("us_token", res.data.us_token);
        wx.switchTab({url: '../index/index'}) 
      }else{
        app.$alert(res.data.errorMsgInfo);
      }
    })
  },
  forgetPwd:function(){
    if (!this.data.userName) {
      app.$alert("请输入手机号码");
      return false;
    }else{
      wx.navigateTo({
        url: '../../pages/findpwd/index?phone=' + this.data.userName
      });  
    }
  },
  onReady: function () {
    
  }
})
