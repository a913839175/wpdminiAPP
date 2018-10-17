//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js');

Page({
  data: {
    phone:"",
    code: "",
    codeHtml: '获取验证码', //倒计时 
    sendnums: 120
  },
  //获取用户输入的用户名
  codeInput:function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  sendSms: function (code)  {
    var self = this;
    var sendnums = self.data.sendnums;
    var interval = setInterval(function () {
      sendnums--;
      self.setData({
        codeHtml: sendnums + '秒'
      })
      if (sendnums <= 0) {
        clearInterval(interval)
        self.setData({
          codeHtml: '重新获取',
          sendnums: 120,
          disabled: false
        })
      }
    }, 1000)
  },
  //获取用户输入的密码
  codeClick: function (e) {
    var self = this;
    if (!this.data.phone){
      app.$alert("请输入手机号码").then(function(){
        wx.navigateTo({
          url: '../login/index'
        });
      });
      return false;
    }
    const params = { 
      mobile: this.data.phone, 
      action: "BACKPWD" 
    };
    app.$ajax.sendText(params).then((res) => {
      console.log(res)
      if (res.data.result == 1) {
        self.sendSms(e);
        self.setData({
          disabled: true
        })
      } else {
        console.log(res.data.message);
      }
    });
  },
  nextClick:function(){
    console.log(this.data.code)
    if (!this.data.code){
      app.$alert('请输入验证码');
      return false;
    }
    wx.navigateTo({
      url: '../findpwd/pwd?code='+this.data.code+'&phone='+this.data.phone
    });   
  },
  onLoad: function (options) {
    var self = this;
    self.setData({
      phone: options.phone
    })
  },
  onReady: function () {
    
  }
})
