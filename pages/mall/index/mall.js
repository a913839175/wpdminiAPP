//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js');

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    productList:[],
    user_id:'',
    credit:'--',
  },
  //事件处理函数
  bindViewTap: function () {

  },
  //产品列表
  productList:function(){
    var self = this;
    var params={};
    var lists = []; 
    app.$ajax.productList(params).then((res) => {
      lists = lists.concat(res.data.lists);
      self.setData({
        productList:lists
      })
    })
  },
  //当前可用微币
  currency:function(){
    var self = this;
    var params={
      user_id:self.data.user_id
    }
    app.$ajax.currency(params).then((res) => {
      console.log(res,123231213123321);
        if(res.data.returnCode == 1){
          self.setData({
            credit:res.data.credit
          })
        }
    }) 
  },
  coinrecord:function(){
    var self = this;
    wx.navigateTo({
      url: '../coinsuse/coinsuse?user_id='+self.data.user_id
    })
  },
  //监听下拉的动作
  onPullDownRefresh:function(){
    var self = this;
    wx.showNavigationBarLoading();
    self.refresh();
  },
  refresh: function(){
    var self = this;
    setTimeout(function(){
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      self.setData({
        productList:[],
        credit:'--'
      })
      self.productList();
      self.currency();
    },500)
  },
  tabFun:function(e){
    //console.log(e..target.dataset.id)
    var self = this;
    wx.navigateTo({
      url: '../packet/packet?cid='+e.target.dataset.id
    })
  },
  onLoad:function(){
    var self = this;
    var user_id = wx.getStorageSync('user_id');
    self.setData({
      user_id:user_id
    })
    self.productList();
    self.currency();
  }
})
