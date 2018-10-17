//index.js
//获取应用实例
const app = getApp();
var JSEncrypt = require('../../lib/JSEncrypt/JSEncrypt');
var encodeStr = function (STR, TOKEN) {
  return JSEncrypt(STR, 'weipaidai', TOKEN, 'java_http_web');
};

Page({
  data: {
    passWord: "",
    phone:'',
    code:''
  },
  //获取用户输入的用户名
  pwdInput: function (e) {
    this.setData({
      passWord: e.detail.value
    })
  },
  completeClick: function () {
    const postData = JSON.stringify({
      'u1': this.data.phone,
      'u2': this.data.code,
      'u3': app.md5(this.data.passWord),
      'u4': '01'
    });
    const subtime = new Date().getTime() + "";
    const params = {
      userVerify: encodeStr(postData, subtime),
      unixkey: subtime
    };
    app.$ajax.userBackPwd(params).then((res) => {
      // console.log(res)
      if (res.data.returnCode == "1"){
        app.$alert(res.data.returnMsg).then(function(){
          wx.redirectTo({
            url: '../login/index'
          });
        });
      }else{
        app.$alert(res.data.returnMsg);
      }
    }) 
  },
  onLoad: function (options) {
    var self = this;
    self.setData({
      phone: options.phone,
      code: options.code
    })
  },
  onReady: function () {

  }
})
