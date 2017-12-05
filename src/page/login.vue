<template>
    <div class="login-main" id="loginCont">
        <div class="login-head"><img src="../../static/images/login-head.jpg" width="100%"></div>
        <div class="login-cont">
            <ul>
                <li class="login-cont-item">
                    <label class="login-user">用户名</label>
                    <input ref="phoneNumber" class="login-user-ipt" id="tell" type="number" v-model="phoneNumber" placeholder="请输入手机号码">
                </li>
                <li class="login-cont-item">
                    <label class="login-user">验证码</label>
                    <input ref="verificationCode" class="login-yzm-ipt" type="number" v-model="verificationCode" placeholder="请输入验证码">
                    <input ref="yzmBtn" class="login-yzm-btn" @click="getNum" type="button" readonly value="获取验证码">
                </li>
            </ul>
            <div class="login-submit" @click="Active">激&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;活</div>
            <!-- <div class="checkbox i-checks margin-top">
                <label><input type="checkbox" value="" checked="">
                    <i></i>用户名</label>
            </div> -->
        </div>
        <p class="login-foot">内蒙古豪德天沐科技有限公司 荣誉出品</p>
    </div>
</template>

<script>
import "../../static/js/layer/layer.js";
// import iCheck from "iCheck";
import "../../static/js/jquery.cookie.js";

//配置layer
layer.config({
  path: "../../static/js/layer/" //layer.js所在的目录，可以是绝对目录，也可以是相对目录
});

export default {
  name: "login",
  mounted: function() {
    //判断是否登陆过，是则跳到一键登录页，否则跳到登录页
    if (appDB.get("companyInfo") != null) {
      $("#loginCont").hide()
      this.$router.push("/login2");
    }else{
      $("#loginCont").show();
      this.$router.push("/");
    }
    
    //index高度设置
    var WH = $(window).height();
    $(".login-main").height(WH);
    //icheck
    // $(".i-checks").iCheck({
    //   checkboxClass: "icheckbox_square-blue",
    //   radioClass: "iradio_square-blue"
    // });

    //从新获取验证码
    /*仿刷新：检测是否存在cookie 防止用户在倒计时的时候刷新页面，导致倒计时清除*/
    if ($.cookie("captcha")) {
      var count = $.cookie("captcha");
      var btn = $(this.$refs.yzmBtn);
      btn
        .val(count + "秒后重获")
        .attr("disabled", true)
        .css("cursor", "not-allowed");
      btn.addClass("on");
      var resend = setInterval(function() {
        count--;
        if (count > 0) {
          btn
            .val(count + "秒后重获")
            .attr("disabled", true)
            .css("cursor", "not-allowed");
          btn.addClass("on");
          $.cookie("captcha", count, {
            path: "/",
            expires: 1 / 86400 * count
          });
        } else {
          clearInterval(resend);
          btn
            .val("获取验证码")
            .removeClass("disabled")
            .removeAttr("disabled style");
          btn.removeClass("on");
        }
      }, 1000);
    };
  },  
  methods: {
    //给APP传递手机号
    tellphone() {
      window.xiaolu.passMobile(this.phoneNumber,this.companyId);
    },
    //获取验证码
    getNum() {
      if (this.phoneNumber == "") {
        layer.msg("请输入手机号", function() {
          //关闭后的操作
        });
        this.$refs.phoneNumber.focus();
        return false;
      }
      var _this = this;
      this.$http
        .get(
          URL+"/api/user/getVerificationCode/" +
            this.phoneNumber
        )
        .then(response => {
          var d = response.data;
          if (d.resultCode == 0) {
            _this.Countdown();
            this.$refs.verificationCode.focus();
            layer.msg(ErrorMsg.V_CODE_SUCCESS);
          } else {
            layer.msg(d.msg,function(){
              
            });
          }
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    //激活
    Active() {
      if (this.phoneNumber == "") {
        layer.msg("请输入手机号", function() {
          //关闭后的操作
        });
        this.$refs.phoneNumber.focus();
        return false;
      }
      if (this.verificationCode == "") {
        layer.msg("请输入验证码", function() {
          //关闭后的操作
        });
        this.$refs.verificationCode.focus();
        return false;
      }
      var _this = this;
      this.$http
        .post(URL+"/api/user/activate", {
          phoneNumber: _this.phoneNumber,
          verificationCode: _this.verificationCode
        })
        .then(response => {
          //后台返回来的数据vue规范都存放在response.data中
          var d = response.data;
          if (d.resultCode == 0) {
            //把返回来的record(驾校信息)，放入DB
            appDB.set(
              "companyInfo",
              $.extend(d.record, { phoneNumber: _this.phoneNumber })
            );
            _this.companyId = d.record.companyId;
            _this.tellphone();//执行成功，给APP传递手机号
            _this.$router.push("/index");
          } else {
            layer.msg(d.msg);
          }
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    //倒计时
    Countdown() {
      /*点击改变按钮状态，已经简略掉ajax发送短信验证的代码*/
      var btn = $(this.$refs.yzmBtn);
      var count = 60;
      var resend = setInterval(function() {
        count--;
        if (count > 0) {
          btn.val(count + "秒后重获");
          btn.addClass("on");
          $.cookie("captcha", count, {
            path: "/",
            expires: 1 / 86400 * count
          });
        } else {
          clearInterval(resend);
          btn.val("获取验证码").removeAttr("disabled style");
          btn.removeClass("on");
        }
      }, 1000);
      btn.attr("disabled", true).css("cursor", "not-allowed");
    }
  },
  data() {
    return {
      phoneNumber: "",
      verificationCode: "",
      companyId: "",
    };
  }
};
</script>

<style scoped>
@import "../../static/css/public.css";
@import "../../static/js/layer/theme/default/layer.css";
@import "../../static/css/icheck/blue.css";

/* @import "../../static/js/layer/theme/default/layer.css"; */

.margin-top {
  margin-top: 50px;
  margin-left: 15px;
  float: left;
}

.login-main {
  width: 100%;
  float: left;
  background: #fff;
}

.login-head {
  width: 100%;
  float: left;
}

.login-head img {
  width: 100%;
}

.login-cont {
  width: 70%;
  padding: 8% 15%;
  float: left;
}

.login-cont-item {
  width: 100%;
  padding: 10px 0;
  margin: 15px 0;
  float: left;
  border-bottom: 1px solid #c3c3c3;
}

.login-user {
  width: 20%;
  padding: 18px 0;
  float: left;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  color: #353d4a;
}

.login-user-ipt {
  width: 80%;
  padding: 15px 0;
  float: left;
  font-size: 20px;
}

.login-yzm-ipt {
  width: 50%;
  height: 56px;
  float: left;
  font-size: 20px;
}

.login-yzm-btn {
  width: 30%;
  padding: 15px 0;
  float: left;
  font-size: 20px;
  color: #255bbd;
  background: none;
}

.login-yzm-btn.on {
  color: #dcdcdc;
}

.login-submit {
  width: 100%;
  float: left;
  height: 60px;
  line-height: 60px;
  background: #325395;
  border-radius: 50px;
  /* box-shadow: 1px 1px 3px #14397c; */
  background-size: 100% 100%;
  margin-top: 60px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  font-weight: bold;
}

.login-foot {
  width: 100%;
  text-align: center;
  color: #373535;
  font-size: 18px;
  float: left;
  margin-top: 40px;
}
</style>


