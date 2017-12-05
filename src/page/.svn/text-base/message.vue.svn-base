<template>
  <div class="message">
    <div class="message-head">消息
      <div class="getMD">
        <span class="getMonth">{{month}}</span>
        <span class="getDay">{{day}}</span>
      </div>
    </div>
    <div class="message-body">
      <div class="message-cont">
        <div class="message-cont-head">
          <span class="message-cont-head-t">
            <i class="icon iconfont icon-wodefankui"></i>消息列表</span>
          <span class="fabuNew" @click="goPublishNew">发布公告</span>
        </div>
        <div class="no-icon">
          <img src="../../static/images/no-icon.png" width="100%">
          <p>暂无消息</p>
        </div>
        <ul class="message-cont-b">
          <li class="message-cont-b-item" v-for="msg in MesList">
            <div class="item-cont">
              <p class="item-cont-head">
                <span class="item-cont-head-t">【{{msg.messageTitle}}】</span>
                <span class="item-cont-head-date">{{msg.receiveDate}}</span>
              </p>
              <div class="item-cont-art">
                {{msg.messageContent}}
              </div>
              <img class="yejiao" src="../../static/images/yejiao.png">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      show: false,
      MesList: [],
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

    this.getMesList(); //获取消息列表
    appDB.remove("messageParams");//推送消息跳转以后，销毁缓存的相关数据
  },
  //根据路由跳转变换下面导航样式
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    if(to.fullPath=="/message"){
      $(".xiaoxi")
        .addClass("on")
        .siblings()
        .removeClass("on");
    }
    next();
  },
  methods: {
    //获取消息列表
    getMesList() {
      var _this = this;
      this.$http
        .post(URL+"/api/message/queryMessageList", {
          companyId: appDB.get("companyInfo").companyId,
          belongSystem: "校长端E人E本",
          currentPage: 1,
          pageSize: 20
        })
        .then(response => {
          //后台返回来的数据vue规范都存放在response.data中
          var d = response.data;
          _this.MesList = d.record;
          if (d.record.length == 0) {
            $(".no-icon").css("display","block");
          }
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    //发布公告
    goPublishNew() {
      this.$router.push("/publishNew");
    }
  }
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
.yejiao {
  position: absolute;
  right: -12px;
  bottom: -12px;
}

.item-cont-art {
  width: 100%;
  height: 160px;
  float: left;
  line-height: 30px;
  display: flex;
  align-items: center;
  /*垂直居中*/
  justify-content: center;
  /*水平居中*/
  text-align: center;
  overflow: hidden;
  color: #4b4b4b;
}

.item-cont-head-date {
  float: right;
  color: #7c7c7c;
}

.item-cont-head-t {
  color: #00b77a;
  font-size: 16px;
}

.item-cont-head {
  width: 94%;
  padding: 0 3%;
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid #d7d7d7;
}

.item-cont {
  width: 100%;
  float: left;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 5px 1px #53667a;
  position: relative;
  overflow: hidden;
}

.message-cont-b-item {
  width: 47%;
  margin-bottom: 25px;
  margin-right: 6%;
  float: left;
}

.message-cont-b li:nth-child(even) {
  margin-right: 0;
}

.message-cont-b {
  width: 100%;
  float: left;
  margin-bottom: 30px;
}

.iconfont {
  font-size: 24px;
  color: #00b77a;
  margin-right: 6px;
  float: left;
}
</style>

