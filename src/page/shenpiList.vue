<template>
    <div class="shenpi-main">
        <div class="message-head">
            审批
            <div class="getMD">
                <span class="getMonth">{{month}}</span>
                <span class="getDay">{{day}}</span>
            </div>
        </div>
        <div class="message-body">
            <div class="message-cont">
                <div class="message-cont-head">
                    <span class="message-cont-head-t">
                        <i class="icon iconfont icon-wodefankui"></i>待审批
                    </span>
                    <router-link to="/shenpiRecords"><span class="fabuNew"><i class="icon iconfont icon-wodefankui"></i>审批记录</span></router-link>
                </div>
                <div class="no-icon">
                  <img src="../../static/images/no-icon.png" width="100%">
                  <p>暂无消息</p>
                </div>
                <ul class="shenpi-cont">
                    <li class="shenpi-cont-item" v-for="item in dspList">
                        <div class="shenpi-cont-item-left">
                            <i class="icon-fangkuai"></i>
                            <span class="published-news-title">【{{item.approveType}}】</span>
                            <span class="shenpi-cont-item-left-art">{{item.approveTitle}}</span>
                        </div>
                        <div class="shenpi-cont-item-center">
                            <p class="shenpi-resion">{{item.approveContent}}</p>
                            <p class="shenpi-resion-date">申请时间：{{item.approveDate}}</p>
                        </div>
                        <div class="shenpi-cont-item-right">
                            <input class="shenpi-tongguo" type="button" @click="Agree(item.approveId, $event)" value="同   意">
                            <input class="shenpi-bohui" type="button" @click="Reject(item.approveId, $event)" value="驳  回">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import "../../static/js/layer/layer.js";

//配置layer
layer.config({
  path: "../../static/js/layer/" //layer.js所在的目录，可以是绝对目录，也可以是相对目录
});

export default {
  name: "shenpiList",
  data() {
    return {
      dspList: [],
      month: '',
      day: '',
    };
  },
  mounted: function() {
    //防止在登陆页没有登陆时候直接手动改变url访问
    initPage.checkLogin();
    //获取当前月和日
    this.month = getDate.getmonth();
    this.day = getDate.getdate();
    //message-cont高度设置
    var WH = $(window).height();
    var RWH = WH - 160;
    $(".message-cont").height(RWH);

    this.getDSPlist(); // 获取待审批列表
  },
  //根据路由跳转变换下面导航样式
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    if(to.fullPath=="/shenpiList"){
      $(".shenpi")
        .addClass("on")
        .siblings()
        .removeClass("on");
    }
    next();
  },
  methods: {
    // 获取待审批列表
    getDSPlist() {
      var _this = this;
      this.$http
        .post(URL+"/api/approve/getWaitApproveList", {
          companyId: appDB.get("companyInfo").companyId,
          currentPage: 1,
          pageSize: 10
        })
        .then(response => {
          //后台返回来的数据vue规范都存放在response.data中
          var d = response.data;
          if (d.record == null) {
            $(".no-icon").css("display", "block");
          };
          _this.dspList = d.record;
          
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },

    //审批操作,同意
    Agree(approveId, el) {
      var _this = this;
      layer.confirm(
        "您确定同意申请？",
        {
          btn: ["确定", "取消"] //按钮
        },
        function() {
          _this.$http.post(URL+"/api/approve/dealApprove", {
            approveId: approveId,
            dealFlag: 1,
            dealPerson: appDB.get("companyInfo").phoneNumber
          })
          .then(response=>{
            var d = response.data;
            if (d.resultCode == 0) {
              layer.msg("已同意");
              $(el.target).val("已同意").siblings().hide();//el.target为dom对象，所以$(el.target)[0] === el.target
              $(el.target).replaceWith($(el.target).clone(false));//操作完以后取消该元素上绑定的事件
            } else {
              layer.msg(d.msg, function() {});
            }
          })
          .catch(error => {
            alert("网络错误，不能访问");
          });
        },
      );
    },

    //审批操作,驳回
    Reject(approveId, el) {
      var _this = this;
      layer.confirm(
        "您确定驳回申请？",
        {
          btn: ["确定", "取消"] //按钮
        },
        function() {
          _this.$http.post(URL+"/api/approve/dealApprove", {
            approveId: approveId,
            dealFlag: -1,
            dealPerson: appDB.get("companyInfo").phoneNumber
          })
          .then(response => {
            var d = response.data;
            if (d.resultCode == 0) {
              layer.msg("已驳回");
              $(el.target).val("已驳回").siblings().hide();//el.target为dom对象，所以$(el.target)[0] === el.target
              $(el.target).replaceWith($(el.target).clone(false));//操作完以后取消该元素上绑定的事件
            } else {
              layer.msg(d.msg, function() {});
            }
          })
          .catch(error => {
            alert("网络错误，不能访问");
          });
        },
      );
    },
    //审批操作,驳回 end
  },
};
</script>

<style scoped>
.no-icon {
  width: 90px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -45px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  display: none;
}
.iconfont {
  font-size: 24px;
  margin-right: 6px;
  float: left;
}
.shenpi-bohui {
  width: 45%;
  height: 40px;
  background: none;
  color: #00b77a;
  float: right;
}

.shenpi-tongguo {
  width: 45%;
  height: 40px;
  background: #00b77a;
  color: #fff;
  border-radius: 30px;
  float: right;
}

.shenpi-cont-item-right {
  width: 30%;
  float: right;
  margin-top: 15px;
}

.shenpi-resion-date {
  color: #00b77a;
}

.shenpi-resion {
  width: 100%;
  color: #fff;
  line-height: 30px;
  padding: 15px 0;
  float: left;
}

.shenpi-cont-item-center {
  width: 55%;
  float: left;
  margin-left: 12.5%;
}

.shenpi-cont-item-left-art {
  line-height: 24px;
  color: #fff;
}

.shenpi-cont-item-left {
  width: 100%;
  float: left;
}

.published-news-title {
  color: #00b77a;
  line-height: 24px;
  margin-right: 5px;
  float: left;
}

.icon-fangkuai {
  width: 24px;
  height: 24px;
  background: url(../../static/images/icon-fangkuai.png);
  background-size: 100% 100%;
  float: left;
}

.shenpi-cont {
  width: 100%;
  float: left;
  margin-bottom: 30px;
}

.shenpi-cont-item {
  width: 100%;
  padding: 20px 0;
  float: left;
  background: url(../../static/images/header-bottom-bg.jpg) repeat-x bottom;
}

.shenpi-main {
  overflow: hidden;
}

.shenpi-head-right {
  float: right;
  color: #00b97c;
  font-size: 16px;
}

.icon-fanhui {
  color: #fff;
  font-size: 30px;
  float: left;
  margin-right: 8px;
}

.icon-bianji {
  float: left;
  font-size: 22px;
  margin-right: 5px;
}
</style>


