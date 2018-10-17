  //index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js');
const JSEncrypt = require('../../../lib/JSEncrypt/JSEncrypt');
Page({
  data: {  
      cid: '0',
      list:[],
      num:'1',
      array: [],
      index: 0,
      bounsId:'',
      store:'',
      price:'',
      unitprice:'',
      disabled1:true,
      disabled2:false
  }, 
  bonusList:function(){
  	var self = this;
  	var params={};
  	var lists=[];
    var arr=[];
  	app.$ajax.bonusList(params).then((res) =>{
  		lists = lists.concat(res.data.lists[self.data.cid].bonuses);
      for (var index in lists) {
          arr[index] = lists[index].name;
      }
  		self.setData({
  			list:lists,
        array:arr,
        bounsId:res.data.lists[self.data.cid].bonuses[self.data.index].id,
        store:res.data.lists[self.data.cid].bonuses[self.data.index].store,
        price:res.data.lists[self.data.cid].bonuses[self.data.index].price,
        unitprice:res.data.lists[self.data.cid].bonuses[self.data.index].price
  		})
      console.log(res.data.lists[self.data.cid].bonuses[self.data.index].price)
  	})
  },
  listenerPickerSelected: function(e) {
      var self = this;
      this.setData({
        index: e.detail.value,
        num:'1'
      });
      self.bonusList();
  },
  //库存减法
  jianhao:function(){
    var self = this;
    var newnum = parseInt(self.data.num) - 1;
    var newprice = parseInt(self.data.unitprice) * newnum;
    console.log(newprice)
    self.setData({
      num:newnum,
      price:newprice
    })
    console.log(self.data.price)
    if(self.data.num == 1){
      self.setData({
        disabled1:true,
        disabled2:false
      })  
    }else{
      self.setData({
        disabled1:false,
        disabled2:false
      })
    }

  },
  jiahao:function(){
    var self = this;
    var newnum = parseInt(self.data.num) + 1 ;
    var newprice = parseInt(self.data.unitprice) * newnum;
    self.setData({
      num:newnum,
      price:newprice
    })
    if(self.data.num >= 10){
      self.setData({
        disabled1:false,
        disabled2:true
      })  
    }else{
      self.setData({
        disabled1:false,
        disabled2:false
      })  
    } 
  },
  //
  encodeStr:function (STR, TOKEN) {
      return JSEncrypt(STR, 'weipaidai', TOKEN, 'java_http_web');
  },
  packetsure:function(){
    var self = this;
    var store = self.data.store;
    var num = self.data.num;
    var postData = JSON.stringify({
      userId:'4192148',
      cid:self.data.cid,
      bounsId:self.data.bounsId,
      buyCount:self.data.num
    });
    var subtime = new Date().getTime().toString();
    var params = {
      userVerify: self.encodeStr(postData, subtime),
      unixkey: subtime
    };
    if(num > store){
      wx.showModal({
        title:'提示',
        content: '库存不足',
        showCancel: false, //不显示取消按钮
        confirmText: '确定'
      })
    }else{
      app.$ajax.bonusExc(params).then((res) => {
          if(res.data.returnCode == 1){
             wx.showToast({  
                title: '成功',  
                icon: 'success',  
                duration: 2000,
                mask:true,
                complete:function(res){
                    var e = {
                      cid:self.data.cid
                    }
                    self.onLoad(e);
                } 
            }) 
          }else{
             wx.showModal({
              title:'提示',
              content: '库存  不足',
              showCancel: false, //不显示取消按钮
              confirmText: '确定'
            })
          }
      })
    }
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
      self.bonusList();
    },500)
  }, 
  onLoad:function(e){
  	var self = this;
    var tit= "";
    var user_id = wx.getStorageSync('user_id');
  	self.setData({
       cid:e.cid
    })
    if(self.data.cid == 2){
      tit = "投资红包"
    }else if(self.data.cid == 1){
      tit = "加息红包"
    }else{
      tit = "现金红包"
    }
    wx.setNavigationBarTitle({
        title: tit,
      })
  	self.bonusList();
  }
})
