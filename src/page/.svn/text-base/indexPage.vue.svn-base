<template>
  <div class="index">
    <div class="index-body">
      <!--totals-->
      <div class="index-totals">
        <div class="index-totals-item totals-zs">
          <p class="index-totals-item-num">654</p>
          <p class="index-totals-item-dw">[人]</p>
          <p class="index-totals-item-xm total-line1">本月招生</p>
        </div>
        <div class="index-totals-item totals-zxs">
          <p class="index-totals-item-num">654</p>
          <p class="index-totals-item-dw">[小时]</p>
          <p class="index-totals-item-xm total-line2">本月培训总学时</p>
        </div>
        <div class="index-totals-item totals-shxy">
          <p class="index-totals-item-num">654</p>
          <p class="index-totals-item-dw">[人]</p>
          <p class="index-totals-item-xm total-line3">本月审核学员</p>
        </div>
        <div class="index-totals-item totals-jyxy">
          <p class="index-totals-item-num">654</p>
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
              <span class="inOut-head-color1">945812
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
                      <span class="inJdt-item-jd1"></span>
                    </div>
                    <span class="inJdt-item-num">75896</span>
                  </li>
                  <li class="inJdt-item">
                    <div class="inJdt-item-bg">
                      <span class="inJdt-item-jd2"></span>
                    </div>
                    <span class="inJdt-item-num">75896</span>
                  </li>
                  <li class="inJdt-item">
                    <div class="inJdt-item-bg">
                      <span class="inJdt-item-jd3"></span>
                    </div>
                    <span class="inJdt-item-num">75896</span>
                  </li>
                  <li class="inJdt-item">
                    <div class="inJdt-item-bg">
                      <span class="inJdt-item-jd4"></span>
                    </div>
                    <span class="inJdt-item-num">75896</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="out-cont">
            <p class="inOut-head" style="text-align:center">本月支出
              <span class="inOut-head-color2">945812
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
            <ul>
              <li class="news-cont-item">
                <span class="pushNews-t-color">蒙B3876学</span> 15km 2017/09/28</li>
              <li class="news-cont-item">
                <span class="pushNews-t-color">李晓峰</span> 152801195848521448</li>
              <li class="news-cont-item">
                <span class="pushNews-t-color">蒙B5678学</span> 青山区富强路17号 加油气</li>
              <li class="news-cont-item">
                <span class="pushNews-t-color">蒙B5678学</span> 青山区富强路17号 加油气</li>
            </ul>
          </div>
          <div class="dagrous-cont">
            <ul>
              <li class="news-cont-item">
                <span class="pushNews-t-color">蒙B3876学</span> 15km 2017/09/28</li>
              <li class="news-cont-item">
                <span class="pushNews-t-color">李晓峰</span> 152801195848521448</li>
              <li class="news-cont-item">
                <span class="pushNews-t-color">蒙B5678学</span> 青山区富强路17号 加油气</li>
              <li class="news-cont-item">
                <span class="pushNews-t-color">蒙B5678学</span> 青山区富强路17号 加油气</li>
            </ul>
          </div>
        </div>
        <!--待办事项-->
        <div class="waiting-cont">
          <p class="waiting-cont-title">待办事项</p>
          <div class="news-cont">
            <ul>
              <li class="news-cont-item">定期检查车辆</li>
              <li class="news-cont-item">驾校财务审核检查签字确认</li>
              <li class="news-cont-item">安排教练统一培训学习</li>

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
import IEcharts from 'vue-echarts-v3';
export default {
  name: 'indexpage',
  components: {
     IEcharts
  },

  data: () => ({
    pie: {
      tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)",

      },
      series: [
        {
          center: ['50%', '55%'],
          type: 'pie',
          radius: ['42%', '57%'],
          color: ['#46b43f', '#177e67', '#fff', '#ffd800',],
          label: {
            normal: {
              formatter: '{b}\n{d}%',
              fontSize: 14,
            },
          },
          data: [
            { value: 435, name: '车辆加油气' },
            { value: 679, name: '车辆维修保养' },
            { value: 848, name: '工作人员工资' },
            { value: 348, name: '教练员工资' },
          ]
        }
      ]
    }
  }),

  methods: {


  },

  mounted: function() {
    //index高度设置
    var WH = $(window).height();
    var RWH = WH - 160;
    $(".index-body").height(RWH);
  },

}
</script>

<style scoped>
.index-body{
  width: 95%;
  padding: 0 3%;
  float: left;
  overflow-y: auto;
  margin-top: 80px;
}
.inJdt-item-jd1 {
  width: 50%;
  height: 16px;
  float: left;
  background: #2eadde;
}

.inJdt-item-jd2 {
  width: 58%;
  height: 16px;
  float: left;
  background: #2eadde;
}

.inJdt-item-jd3 {
  width: 70%;
  height: 16px;
  float: left;
  background: #2eadde;
}

.inJdt-item-jd4 {
  width: 30%;
  height: 16px;
  float: left;
  background: #2eadde;
}

.inJdt-item-num {
  float: right;
  color: #fff;
  margin-right: 10px;
}

.inJdt-item-bg {
  width: 70%;
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
  width: 68%;
  float: right;
}

.pie-icon {
  width: 20%;
  position: absolute;
  top: 76px;
  right: 140px;
}

.out-cont-echart {
  width: 100%;
  height: 200px;
  position: relative;
}

.in-cont-left li:last-child {
  margin: 0
}

.in-cont-art {
  width: 100%;
  float: left;
  padding-top: 30px;
}

.in-cont-left {
  width: auto;
  float: left;
  border-right: 1px solid #b6bbc0;
}

.in-cont-left-type {
  font-size: 14px;
  height: 16px;
  line-height: 16px;
  color: #fff;
  margin: 0 15px 20px 0;
}

.inOut-head {
  font-size: 20px;
  color: #fff;
}

.inOut-head-icon {
  font-size: 16px;
}

.inOut-head-color2 {
  font-size: 26px;
  color: #36a4f8;
  margin-left: 20px;
}

.inOut-head-color1 {
  font-size: 26px;
  color: #39d33e;
  margin-left: 20px;
}

.in-cont {
  width: 100%;
  float: left;
}

.waiting-cont-title {
  width: 100%;
  float: left;
  height: 50px;
  line-height: 50px;
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

.news-cont-item {
  width: 92%;
  float: left;
  padding: 20px 0;
  margin: 0 4%;
  color: #fff;
  border-bottom: 1px solid #6386a8;
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
  line-height: 50px;
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
  padding: 30px 2% 0 2%;
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
  width: 20%;
  padding: 30px 0 15px 0;
  text-align: center;
  color: #fff;
  box-shadow: 1px 1px 5px #302100;
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
  font-size: 40px;
}

.index-totals-item-dw {
  font-size: 20px;
  padding: 15px 0;
}

.index-totals-item-xm {
  font-size: 20px;
  padding: 20px 0 5px 0;
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
</style>


