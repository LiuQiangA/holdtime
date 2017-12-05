<template>
  <div class="yjdl">
      <img src="../../static/images/login-bg.jpg" width="100%" height="100%" style="position:absolute;left:0">
      <p class="schoolName">{{schoolName}}</p>
      <img class="yjdl-st" src="../../static/images/login-text-img.png" width="24%">
      <p class="login-foot">内蒙古豪德天沐科技有限公司 荣誉出品</p>
      <router-link to="/index"><div class="login-btn"><img src="../../static/images/login-btn.png" width="100%"></div></router-link>
      <div class="quxiao" @click="goLogin"><i class="icon iconfont icon-fanhui1"></i>取消激活</div>
  </div>
</template>

<script>
import "../../static/js/layer/layer.js";
//配置layer
layer.config({
  path: "../../static/js/layer/" //layer.js所在的目录，可以是绝对目录，也可以是相对目录
});
export default {
  name: "login2",
  data(){
    return{
      schoolName:'',
      phoneNumber:'',
      token:'',
    }
  },
  mounted: function() {
    //定时获取token
    this.getToken();
    this.getTokenMS();
    
    //index高度设置
    var WH = $(window).height();
    $(".yjdl").height(WH);

    this.getName();//获取schoolname
  },
  methods: {
    //获取schoolname
    getName(){
      this.schoolName = appDB.get("companyInfo").companyName;
    },

    //APP清除手机号方法
    clear() {
      window.xiaolu.clearMobile();
    },

    //取消激活
    goLogin() {
      appDB.remove("companyInfo");
      appDB.remove("InOutInformation");
      this.$router.push("/");
      this.clear();//取消激活时调用APP清除手机号方法
    },

    //APP运行时定时获取token
    getToken(){
      var _this = this;
      setInterval(function(){
        _this.$http.post(URL+"/api/user/obtainNewToken",{
          phoneNumber:appDB.get("companyInfo").phoneNumber,
          token:appDB.get("companyInfo").token
        })
        .then(response=>{
          var d = response.data.record;
          if(response.data.resultCode == 0){
            let temp = appDB.get("companyInfo");
            temp.token = d;
            appDB.set("companyInfo", temp);
          }else{//当获取不到token时候，从新登录
            layer.msg(response.data.msg)
            _this.goLogin();
          }
        })
        .catch(error => {
          alert("网络错误，不能访问");
        })
      },7000000)//3s获取一次token
    },
    //APP推出后，从新启动时马上获取token
    getTokenMS(){
      var _this = this;
      _this.$http.post(URL+"/api/user/obtainNewToken",{
        phoneNumber:appDB.get("companyInfo").phoneNumber,
        token:appDB.get("companyInfo").token
      })
      .then(response=>{
        var d = response.data.record;
        if(response.data.resultCode == 0){
          let temp = appDB.get("companyInfo");
          temp.token = d;
          appDB.set("companyInfo", temp);
        }else{//当获取不到token时候，从新登录
          layer.msg(response.data.msg)
          _this.goLogin();
        }
      })
      .catch(error => {
        alert("网络错误，不能访问");
      })
    },
  }
};
</script>

<style scoped>
.yjdl {
  width: 100%;
  float: left;
  /* background: url(../../static/images/login-bg.jpg) no-repeat; */
  background-size: 100% 100%;
  text-align: center;
}
.schoolName {
  width: 100%;
  float: left;
  color: #fff;
  font-size: 40px;
  margin-top: 80px;
  position: relative;
  z-index: 999;
}
.yjdl-st {
  position: relative;
  z-index: 2;
  display: inline-block;
  margin-top: 40px;
}
.login-btn {
  width: 160px;
  height: 160px;
  line-height: 140px;
  margin: 25% auto 0 auto;
  color: #169c68;
  position: relative;
  /* background: url(../../static/images/login-btn.png); */
  background-size: 100% 100%;
}

.login-btn img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.login-btn span {
  position: relative;
  z-index: 1;
  font-size: 26px;
}
.quxiao {
  width: 100%;
  float: left;
  position: absolute;
  bottom: 160px;
  left: 0;
  color: #fff;
  font-size: 20px;
}
.icon-fanhui1 {
  font-size: 30px;
  color: #169c68;
  margin-right: 5px;
}
.login-foot {
  width: 100%;
  position: absolute;
  bottom: 40px;
  left: 0;
  text-align: center;
  color: #fff;
  font-size: 18px;
}
</style>


