const util = require('util.js');

const base = 'http://192.168.1.17:8087';
const redis = 'http://192.168.1.17:8011';
const sms = 'http://192.168.1.30:8080';


module.exports.apiList = {
  //获取banner数据
  scrollpic:params =>{
    return util.postData(`${base}/wpd/index/scrollpic/GetList`,params);
  },
  detailList:params =>{
    return util.getData(`${base}/wpd/index/borrow/product_borrow_detail`,params);
  },
  //获取投资产品列表
  product_borrow_list:function(params){
  	 return util.postData(`${base}/wpd/index/borrow/product_borrow_list`,params);
  },
  product_borrow_detail_list: params =>{
    return util.postData(`${base}/wpd/index/borrow/product_borrow_detail_list`,params);
  },
  login: params=>{
    return util.postData(`${base}/wpd/user_query/userVerify`, params);
  },
  userBackPwd: params => {
    return util.postData(`${redis}/reg/userBackPwd`, params);
  },
  sendText: (params)=> {
    return util.postData(`${sms}/message/sendText`, params);
  },
  //产品列表
  productList: params =>{
    return util.postData(`${redis}/user/we_mall/productList?recomCount=3&productCount=4`,params)
  },
  //当前可用微币
  currency: params =>{
    return util.postData(`${redis}/user/we_mall/currency`,params)
  },
  //微币记录列表
  cList: params =>{
    return util.postData(`${redis}/user/we_mall/cList`,params)
  },
  getAppInfo:params =>{  
    return util.postData(`${base}/wpd/user_query/user_info`, params)
  },
  //红包列表
  bonusList:params =>{  
    return util.postData(`${redis}/user/we_mall/bonusList`, params)
  },
  //红包兑换
  bonusExc:params =>{  
    return util.postData(`${redis}/user/we_mall/bonusExc`, params)
  }
}
module.exports.util = util;
