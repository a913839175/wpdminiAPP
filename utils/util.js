const user_id = wx.getStorageSync('user_id') || '';
const us_token = wx.getStorageSync('us_token') || '';
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports.formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
module.exports.throttle = function (fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  } 
  let _lastTime = null
  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}
/**
 * 检测对象是否是空对象(不包含任何可读属性)。
 * 方法既检测对象本身的属性，也检测从原型继承的属性(因此没有使hasOwnProperty)。
 */
module.exports.isEmpty = obj => {
  for (var name in obj) {
    return false;
  }
  return true;
}; 
/**
  * GET请求
  * @param  {[type]} url     url地址
  * @param  {[type]} params  data参数
  * @return {[type]}         [Promise]
 */
module.exports.getData = (url, params) => {
  params = params || {};
  params.user_id = user_id;
  params.us_token = us_token;
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      method: 'GET',
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        console.log("get请求failed")
        reject(res)
      }
    })
  })
}
/**
  * POST请求
  * @param  {[type]} url     url地址
  * @param  {[type]} params  data参数
  * @return {[type]}         [Promise]
 */
module.exports.postData = (url, params) => {
  params = params || {};
  params.user_id = user_id;
  params.us_token = us_token;
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        console.log("post请求failed")
        reject(res)
      }
    })
  })
}
/**
  * $alert弹窗
  * @param  {[String]}  content    提示内容
  * @param  {[String]}  title      标题
  * @param  {[boolean]} showCancel 取消图标
  * @return {[type]}    [Promise]
 */
module.exports.$alert = (content, title, showCancel) =>{
  return new Promise(function (resolve, reject) {
    wx.showModal({
      title: title || '提示',
      content: content || '请输入验证码',
      showCancel: showCancel || false,
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        console.log("弹窗提示failed")
        reject(res)
      }
    })
  })
}