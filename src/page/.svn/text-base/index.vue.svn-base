<template>
  <div class="index">
    <myHeader></myHeader>
    <div class="index-body">
      <!--totals-->
      <div class="index-totals">
        <div class="index-totals-item totals-zs">
          <p class="index-totals-item-num indexNum">{{todayApplyNum}}/{{applyNum}}</p>
          <p class="index-totals-item-dw">[人]</p>
          <p class="index-totals-item-xm total-line1">本月招生</p>
        </div>
        <div class="index-totals-item totals-zxs">
          <p class="index-totals-item-num indexNum">{{unqualifiedHours}}</p>
          <p class="index-totals-item-dw">[小时]</p>
          <p class="index-totals-item-xm total-line2">本月不合格学时</p>
        </div>
        <div class="index-totals-item totals-shxy">
          <p class="index-totals-item-num indexNum">{{notAuditNum}}</p>
          <p class="index-totals-item-dw">[人]</p>
          <p class="index-totals-item-xm total-line3">本月未审核学员</p>
        </div>
        <div class="index-totals-item totals-jyxy">
          <p class="index-totals-item-num indexNum">{{graduationNum}}</p>
          <p class="index-totals-item-dw">[人]</p>
          <p class="index-totals-item-xm total-line4">本月结业学员</p>
        </div>
      </div>
      <!--totals end-->
      <!--本月收支明细-->
      <div class="inPay">
        <p class="inPay-title">
          <i class="icon iconfont icon-icon pay-font"></i>
          <span class="inPay-title-text">本月收支明细</span>
        </p>
        <div class="inPay-cont">
          <div class="in-cont">
            <p class="inOut-head">本月收入
              <span class="inOut-head-color1 indexNum">{{totalInNum}}
                <span class="inOut-head-icon">￥</span>
              </span>
            </p>
            <div class="in-cont-art">
              <ul class="in-cont-left">
                <li class="in-cont-left-type">学员报名费</li>
                <li class="in-cont-left-type">练车加时费</li>
                <li class="in-cont-left-type">包库管理费</li>
                <li class="in-cont-left-type">考试模拟费</li>
              </ul>
              <div class="inJdt">
                <ul>
                  <li class="inJdt-item">
                    <div class="inJdt-item-bg">
                      <span class="inJdt-item-jd1 on1"></span>
                    </div>
                    <span class="inJdt-item-num">{{enrollNum}}</span>
                  </li>
                  <li class="inJdt-item">
                    <div class="inJdt-item-bg">
                      <span class="inJdt-item-jd2 on2"></span>
                    </div>
                    <span class="inJdt-item-num">{{drivingNum}}</span>
                  </li>
                  <li class="inJdt-item">
                    <div class="inJdt-item-bg">
                      <span class="inJdt-item-jd3 on3"></span>
                    </div>
                    <span class="inJdt-item-num">{{manageNum}}</span>
                  </li>
                  <li class="inJdt-item">
                    <div class="inJdt-item-bg">
                      <span class="inJdt-item-jd4 on4"></span>
                    </div>
                    <span class="inJdt-item-num">{{examNum}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="out-cont">
            <p class="inOut-head" style="text-align:center">本月支出
              <span class="inOut-head-color2 indexNum">{{totalOutNum}}
                <span class="inOut-head-icon">￥</span>
              </span>
            </p>
            <div class="out-cont-echart">
              <IEcharts :option="pie"></IEcharts>
              <img class="pie-icon" src="../../static/images/pie-icon.png">
            </div>
          </div>
        </div>
      </div>
      <!--本月收支明细 end-->
      <!--推送消息-->
      <div class="pushNew">
        <!--head-->
        <p class="inPay-title">
          <i class="icon iconfont icon-xiaoxi pay-font"></i>
          <span class="inPay-title-text">推送消息</span>
        </p>
        <!--message-->
        <div class="pushNew-news">
          <ul class="pushNew-news-tab">
            <li class="news-tab news on">消息</li>
            <li class="news-tab dagrous">预警</li>
          </ul>
          <div class="news-cont">
            <div class="no-messages-news no-messages"><i class="icon iconfont icon-shangchuan"></i><br>暂无消息</div>
            <ul id="news-cont">
              <li class="news-cont-item" v-for="msg in messages">
                <router-link to="/message"><span class="pushNews-t-color">{{msg.messageTitle}}</span> <span class="pushNews-t-f">{{msg.messageContent}} {{msg.receiveDate}}</span></router-link>
              </li>
            </ul>
          </div>
          <div class="dagrous-cont">
            <div class="no-messages-dagrous no-messages"><i class="icon iconfont icon-shangchuan"></i><br>暂无消息</div>
            <ul id="dagrous-cont">
              <li class="news-cont-item" v-for="Dgr in dagrous">
                <router-link to="/message"><span class="pushNews-t-color">{{Dgr.warnTitle}}</span> <span class="pushNews-t-f">{{Dgr.warnContent}} {{Dgr.receiveDate}}</span></router-link>
              </li>
            </ul>
          </div>
        </div>
        <!--待办事项-->
        <div class="waiting-cont">
          <p class="waiting-cont-title">待办事项</p>
          <div class="waiting-cont-c">
            <div class="no-messages-waiting no-messages"><i class="icon iconfont icon-shangchuan"></i><br>暂无消息</div>
            <ul>
              <router-link to="/shenpiList"><li class="news-cont-item" v-for="item in dspList">{{item.approveType}}</li></router-link>
            </ul>
          </div>
        </div>
        <!--待办事项 end-->

      </div>
      <!--推送消息 end-->
    </div>
  </div>
</template>

<script>
import myHeader from "@/components/header";
import IEcharts from "vue-echarts-v3";
export default {
  name: "index",
  components: {
    myHeader,
    IEcharts
  },
  data: () => ({
    applyNum: "",
    unqualifiedHours: "",
    notAuditNum: "",
    graduationNum: "",
    todayApplyNum: "",
    messages: [],
    dagrous: [],
    dspList: [],
    totalInNum: "", //本月收入
    totalOutNum: "", //本月支出
    enrollNum: "", //学员报名费
    drivingNum: "", //练车加时费
    manageNum: "", //包库管理费
    examNum: "", //考试模拟费
    pie: {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)"
      },
      series: {
        center: ["52%", "55%"],
        type: "pie",
        startAngle: 175,
        radius: ["35%", "45%"],
        color: ["#46b43f", "#177e67", "#fff", "#ffd800","#2cc4c6"],
        label: {
          normal: {
            formatter: "{b}\n{d}%",
            fontSize: 12
          }
        },
        labelLine: {
          normal: {
            length: 8,
            length2: 5,
            smooth: 0,
          }
        },
        data: [],
        hoverAnimation: false
      }
    }
  }),
  //根据路由跳转变换下面导航样式
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    if(to.fullPath=="/index"){
      $(".shouye")
        .addClass("on")
        .siblings()
        .removeClass("on");
    }
    next();
  },
  methods: {
    //本月收支明细接口
    getInOut() {
      var _this = this;
      this.$http
        .get(
          URL+"/api/iem/statistic/" +
            appDB.get("companyInfo").companyId,
            {
              headers: {'Authorization': appDB.get("companyInfo").token}
            }
        )
        .then(response => {
          var d = response.data;
          //把返回来的record(收支信息)，放入DB
          appDB.set("InOutInformation",d.record);
          _this.totalInNum = d.record.totalInNum;
          _this.totalOutNum = d.record.totalOutNum;
          _this.enrollNum = d.record.inCome.enrollNum;
          _this.drivingNum = d.record.inCome.drivingNum;
          _this.manageNum = d.record.inCome.manageNum;
          _this.examNum = d.record.inCome.examNum;
          //本月收入详细占比动画效果
          var percent1 = Number(this.enrollNum / this.totalInNum * 100) + "%"; // 学员报名费占比
          var percent2 = Number(this.drivingNum / this.totalInNum * 100) + "%"; // 练车加时费占比
          var percent3 = Number(this.manageNum / this.totalInNum * 100) + "%"; // 	包库管理费占比
          var percent4 = Number(this.examNum / this.totalInNum * 100) + "%"; // 考试模拟费占比
          $(".on1").css("width", percent1);
          $(".on2").css("width", percent2);
          $(".on3").css("width", percent3);
          $(".on4").css("width", percent4);

          //支出
          _this.pie.series.data = d.record.pay
        })
        .catch(error => {
          console.info(error);
          alert("网络错误，不能访问");
        });
    },

    //获取驾校本月招生、不合格学时、待审核学员、结业人数。
    getMonthMes() {
      var _this = this;
      this.$http.get(URL+"/company/getMonthlyData/" +appDB.get("companyInfo").companyId,
        {
          headers: {'Authorization': appDB.get("companyInfo").token}
        }
        )
        .then(response => {
          var d = response.data;
          _this.applyNum = d.record.applyNum;
          _this.unqualifiedHours = d.record.unqualifiedHours;
          _this.notAuditNum = d.record.notAuditNum;
          _this.graduationNum = d.record.graduationNum;
          _this.todayApplyNum = d.record.todayApplyNum;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },

    //获取消息列表
    getMessageList() {
      $(".no-messages-news").hide();
      var _this = this;
      this.$http
        .post(URL+"/api/message/queryMessageList", {
          companyId: appDB.get("companyInfo").companyId,
          belongSystem: "校长端E人E本",
          currentPage: 1,
          pageSize: 5
        },
        {
          headers: {'Authorization': appDB.get("companyInfo").token}
        })
        .then(response => {
          //后台返回来的数据vue规范都存放在response.data中
          var d = response.data;
          _this.messages = d.record;
          if (d.record.length == 0) {
            $(".no-messages-news").show();
          }
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },

    //获取预警列表
    getDagrousList() {
      $(".no-messages-dagrous").hide();
      var _this = this;
      this.$http
        .post(URL+"/api/earlyWarning/queryEarlyWarning", {
          companyId: appDB.get("companyInfo").companyId,
          belongSystem: "校长端E人E本",
          currentPage: 1,
          pageSize: 3
        },
        {
          headers: {'Authorization': appDB.get("companyInfo").token}
        })
        .then(response => {
          //后台返回来的数据vue规范都存放在response.data中
          var d = response.data;
          _this.dagrous = d.record;
          if (d.record.length==0) {
            $(".no-messages-dagrous").show();
          };
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    // 获取待办事项列表
    getDSPlist() {
      $(".no-messages-waiting").hide();
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
            $(".no-messages-waiting").show();
          };
          _this.dspList = d.record;
          
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
  },

  mounted: function() {
    //防止在登陆页没有登陆时候直接手动改变url访问
    initPage.checkLogin();
    //index高度设置
    var WH = $(window).height();
    var RWH = WH - 160;
    $(".index-body").height(RWH);

    //消息，预警切换
    $(".news-tab").click(function() {
      $(this)
        .addClass("on")
        .siblings()
        .removeClass("on");
    });
    $(".news").click(function() {
      $(".news-cont").show();
      $(".dagrous-cont").hide();
    });
    $(".dagrous").click(function() {
      $(".news-cont").hide();
      $(".dagrous-cont").show();
    });

    this.getInOut(); //本月收支明细接口
    this.getMonthMes();
    this.getMessageList();
    this.getDagrousList();
    this.getDSPlist();
  }
};
</script>

<style scoped>
.icon-shangchuan {
  font-size: 40px;
  color: #fff;
}
.no-messages {
  width: 100%;
  float: left;
  text-align: center;
  margin-top: 50px;
  color: #fff;
}
.index-body {
  width: 95%;
  padding: 0 3%;
  float: left;
  overflow-y: auto;
  margin-top: 80px;
}

.inJdt-item-jd1 {
  width: 0;
  height: 16px;
  float: left;
  background: #2eadde;
  transition: all 1s;
}
.inJdt-item-jd1.on1 {
}

.inJdt-item-jd2 {
  width: 0;
  height: 16px;
  float: left;
  background: #2eadde;
  transition: all 1s;
}
.inJdt-item-jd2.on2 {
}
.inJdt-item-jd3 {
  width: 0;
  height: 16px;
  float: left;
  background: #2eadde;
  transition: all 1s;
}
.inJdt-item-jd3.on3 {
}
.inJdt-item-jd4 {
  width: 0;
  height: 16px;
  float: left;
  background: #2eadde;
  transition: all 1s;
}
.inJdt-item-jd4.on4 {
}
.inJdt-item-num {
  float: right;
  color: #fff;
  margin-right: 10px;
}

.inJdt-item-bg {
  width: 64%;
  float: left;
  height: 16px;
  background: #1f2f3e;
}

.inJdt-item {
  width: 100%;
  margin: 0 15px 20px 0;
  float: left;
}

.inJdt {
  width: 62%;
  float: right;
}

.pie-icon {
  width: 60px;
  position: absolute;
  top: 55%;
  left: 52%;
  margin-top: -30px;
  margin-left: -30px;
}

.out-cont-echart {
  width: 100%;
  height: 200px;
  position: relative;
}

.in-cont-left li:last-child {
  margin: 0;
}

.in-cont-art {
  width: 100%;
  float: left;
  padding-top: 50px;
}

.in-cont-left {
  width: 30%;
  float: left;
  border-right: 1px solid #b6bbc0;
}

.in-cont-left-type {
  font-size: 14px;
  height: 16px;
  line-height: 16px;
  color: #fff;
  margin: 0 0 20px 0;
}

.inOut-head {
  font-size: 20px;
  color: #fff;
}

.inOut-head-icon {
  font-size: 16px;
}

.inOut-head-color2 {
  font-size: 30px;
  color: #36a4f8;
  margin-left: 24px;
  text-shadow: 1px 1px 1px #221802;
}

.inOut-head-color1 {
  font-size: 30px;
  color: #39d33e;
  margin-left: 24px;
  text-shadow: 1px 1px 1px #221802;
}

.in-cont {
  width: 100%;
  float: left;
}

.waiting-cont-title {
  width: 100%;
  float: left;
  height: 50px;
  line-height: 45px;
  background: #1e2e3e;
  text-indent: 1em;
  font-size: 16px;
  color: #fff;
}

.waiting-cont {
  width: 38%;
  float: right;
  margin: 15px 0 25px 0;
  border-radius: 3px;
  padding-bottom: 15px;
  box-shadow: 0 0 5px #102337;
}

.pushNews-t-color {
  color: #e2ae05;
  margin-right: 10px;
}

.dagrous-cont {
  width: 100%;
  height: 172px;
  overflow-y: auto;
  float: left;
  display: none;
}

.news-cont {
  width: 100%;
  height: 172px;
  overflow-y: auto;
  float: left;
}
.waiting-cont-c {
  width: 100%;
  height: 172px;
  overflow-y: auto;
  float: left;
}
.news-cont-item {
  width: 88%;
  float: left;
  padding: 20px 0 15px 0;
  margin: 0 6%;
  color: #fff;
  border-bottom: 1px solid #6386a8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.news-tab.news {
  background: url(../../static/images/news-bg.jpg) repeat-y right;
}

.news-tab.on {
  color: #ffd800;
}

.pushNew-news-tab {
  width: 100%;
  float: left;
  background: #1e2e3e;
  color: #fff;
  font-size: 16px;
}

.pushNew-news-tab li {
  width: 50%;
  float: left;
  height: 50px;
  line-height: 45px;
  text-align: center;
}

.pushNew-news {
  width: 60%;
  float: left;
  box-shadow: 0 0 5px #102337;
  margin: 15px 0 25px 0;
  border-radius: 3px;
  padding-bottom: 15px;
}

.pushNew {
  width: 100%;
  float: left;
  margin-bottom: 30px;
}

.out-cont {
  width: 50%;
  float: left;
}

.in-cont {
  width: 50%;
  float: left;
}

.inPay-cont {
  width: 96%;
  padding: 10px 2% 20px 2%;
  float: left;
  background: #2d4257;
  box-shadow: 0 0 5px #102337;
  margin: 15px 0 25px 0;
}

.index {
  width: 100%;
  height: 100%;
  float: left;
  overflow: hidden;
}

.index-totals {
  width: 100%;
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
}

.index-totals-item {
  width: 23%;
  padding: 15px 0 10px 0;
  text-align: center;
  color: #fff;
  box-shadow: 1px 1px 3px #2e2f2e;
}

.totals-zs {
  background-image: -webkit-linear-gradient(to bottom, #6ac62c, #22a352);
  background-image: linear-gradient(to bottom, #6ac62c, #22a352);
}

.totals-zxs {
  background-image: -webkit-linear-gradient(to bottom, #2cc4c6, #3671b2);
  background-image: linear-gradient(to bottom, #2cc4c6, #3671b2);
}

.totals-shxy {
  background-image: -webkit-linear-gradient(to bottom, #f1d809, #d38600);
  background-image: linear-gradient(to bottom, #f1d809, #d38600);
}

.totals-jyxy {
  background-image: -webkit-linear-gradient(to bottom, #6ac62c, #22a352);
  background-image: linear-gradient(to bottom, #6ac62c, #22a352);
}

.index-totals-item-num {
  width: 100%;
  font-size: 34px;
  text-shadow: 1px 1px 1px #585656;
}

.index-totals-item-dw {
  font-size: 18px;
  padding: 15px 0;
  text-shadow: 1px 1px 1px #585656;
}

.index-totals-item-xm {
  font-size: 18px;
  padding: 20px 0 5px 0;
  text-shadow: 1px 1px 1px #585656;
}

.total-line1 {
  background: url(../../static/images/totals-line1.jpg) repeat-x top;
}

.total-line2 {
  background: url(../../static/images/totals-line2.jpg) repeat-x top;
}

.total-line3 {
  background: url(../../static/images/totals-line3.jpg) repeat-x top;
}

.total-line4 {
  background: url(../../static/images/totals-line4.jpg) repeat-x top;
}

.inPay {
  width: 100%;
  float: left;
  margin-top: 15px;
  border-radius: 3px;
}

.inPay-title {
  width: 100%;
  float: left;
  font-size: 22px;
  color: #fff;
}

.pay-font {
  font-size: 30px;
  color: #e2ae05;
  margin-right: 10px;
  float: left;
}

.inPay-title-text {
  line-height: 30px;
}

.pushNews-t-f {
  color: #fff;
}
</style>


