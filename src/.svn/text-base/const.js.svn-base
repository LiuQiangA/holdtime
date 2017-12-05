import vue from "./main";
//错误信息定义
global.ErrorMsg = {
  NETWORK_ERROR: "网络错误，不能访问",
  V_CODE_SUCCESS: "验证码发送成功"
};
//数据存储
global.appDB = {
  set: function(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },
  get: function(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  length: localStorage.length,
  remove: function(key) {
    localStorage.removeItem(key);
  },
  clear: function() {
    localStorage.clear();
  }
};
//页面初始化
global.initPage = {
  checkLogin: function() {
    //验证用户是否登录，没有登录跳转登录页
    if (appDB.get("companyInfo") == null) {
      // vue.$router.push("/");
    }
  }
};

//全局url
global.URL = 'http://jpms.xiaoluxueche.com';
global.WEBSOCKET_URL = 'ws://jpms.xiaoluxueche.com/jpms2/api/jxglWebSocketServer?phone=';

//获取当前年月日
global.getDate = {
  getmonth: function() {
    var myDate = new Date();
    var m = myDate.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    return m;
  },
  getdate: function() {
    var myDate = new Date();
    var d = myDate.getDate();
    d = d < 10 ? "0" + d : d;
    return d;
  }
};
