<template>
  <div class="bigData">
    <div class="bigData-head">驾校大数据</div>
    <div class="message-cont">
      <!--top-->
      <div class="top-detail">
        <p class="school-name">{{companyName}}</p>
        <ul>
          <li>
            <span class="top-detail-num indexNum">{{carNum}}</span>辆<br>教学车</li>
          <li>
            <span class="top-detail-num indexNum">{{teacherNum}}</span>名<br>教练</li>
          <li>
            <span class="top-detail-num indexNum">{{studentNum}}</span>人<br>目前学员数</li>
        </ul>
      </div>
      <div class="yearZhaos">
        <p class="yearZhaos-num Num97" id="homeIco-1">0</p>
        <p class="yearZhaos-text">本年度招生</p>
      </div>
      <!--echart-->
      <div class="echart">
        <div class="echartZS">
          <i class="topL-bg-icon"></i>
          <i class="topR-bg-icon"></i>
          <i class="bottomR-bg-icon"></i>
          <i class="bottomL-bg-icon"></i>
          <p class="echart-title">
            本年度<span class="echart-title-zs">招生</span>统计</p>
          <div class="zhaos-Echart">
            <IEcharts :option="bar"></IEcharts>
          </div>
        </div>
        <div class="echartJY">
          <i class="topL-bg-icon"></i>
          <i class="topR-bg-icon"></i>
          <i class="bottomR-bg-icon"></i>
          <i class="bottomL-bg-icon"></i>
          <p class="echart-title">
            本年度<span class="echart-title-jy">结业</span>统计</p>
          <div class="zhaos-Echart">
            <IEcharts :option="bar2"></IEcharts>
          </div>
        </div>
      </div>
      <!--实操-->
      <div class="shicao">
        <div class="shicao-cont">
          <p class="shicao-title">本月<span class="echart-title-zs">实操</span>总学时</p>
          <router-link to="/peixun">
            <ul>
              <li class="shicao-cont-right">
                <p class="shicao-cont-left-cont-num Num87">{{totalHours}}<span class="shicao-cont-left-cont-text Num87">小时</span></p>
                <p>科目二：{{sub2Hours}}小时</p>
                <p>科目三： {{sub3Hours}} 小时</p>
              </li>
              <li class="shicao-cont-left">
                <div class="shicao-cont-left-cont">
                  查看<br>详细
                </div>
              </li>
            </ul>
          </router-link>
        </div>

        <div class="shicao-cont">
          <p class="shicao-title">本月<span class="echart-title-zs">实操</span>总里程</p>
          <router-link to="/yunying">
            <ul>
              <li class="shicao-cont-right">
                <p class="shicao-cont-left-cont-num Num87">{{totalMileage}}<span class="shicao-cont-left-cont-text Num87">公里</span></p>
                <p>科目二：{{sub2Mileage}} 公里</p>
                <p>科目三： {{sub3Mileage}} 公里</p>
              </li>
              <li class="shicao-cont-left">
                <div class="shicao-cont-left-cont">
                  查看<br>详细
                </div>
              </li>
            </ul>
          </router-link>
        </div>
      </div>
      <!--总计-->
      <div class="totals">
        <div class="totals-cont">
          <p class="shicao-title">本月招生、结业总计</p>
          <router-link class="totals-cont-t" to="/zhaosheng">
            <ul>
              <li class="totals-in Num87">
                <span class="totals-in-zs">招生</span>
                {{applyNum}}
                <span class="totals-in-danwei">人</span> <br>
              </li>
              <li class="totals-out Num87">
                <span class="totals-in-zs">结业</span>
                {{graduationNum}}
                <span class="totals-in-danwei">人</span> <br>
              </li>
            </ul>
            <p class="totals-cont-foot"><span class="echart-title-zs" style="font-size:14px">招生</span><span class="echart-title-jy" style="font-size:14px">结业</span>详细统计分析<button class="totals-cont-details">详细<i class="icon iconfont icon-xiaoxi icon-jinru"></i></button></p>
          </router-link>
        </div>
        <div class="totals-cont">
          <p class="shicao-title">本月收入、支出总计</p>
          <router-link class="totals-cont-t" to="/shouzhi">
            <ul>
              <li class="totals-in Num87">
                <span class="totals-in-zs">收入</span>
                {{InTotal}}
                <span class="totals-in-danwei">￥</span> <br>
              </li>
              <li class="totals-out Num87">
                <span class="totals-in-zs">支出</span>
                {{OutTotal}}
                <span class="totals-in-danwei">￥</span> <br>
              </li>
            </ul>
            <p class="totals-cont-foot"><span class="echart-title-zs" style="font-size:14px">收入</span><span class="echart-title-jy" style="font-size:14px">支出</span>详细统计分析<button class="totals-cont-details">详细<i class="icon iconfont icon-xiaoxi icon-jinru"></i></button></p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IEcharts from "vue-echarts-v3";
import CountUp from "countup"
export default {
  name: "bigData",
  components: {
    IEcharts
  },
  mounted: function() {
    //防止在登陆页没有登陆时候直接手动改变url访问
    initPage.checkLogin();
    //message-cont高度设置
    var WH = $(window).height();
    var RWH = WH - 160;
    $(".message-cont").height(RWH);

  },
  //根据路由跳转变换下面导航样式
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    if(to.fullPath=="/bigData"){
      $(".shuju")
        .addClass("on")
        .siblings()
        .removeClass("on");
    }
    next();
  },
  created: function() {
    //获取驾校车辆、教练员、学员统计数据接口
    var _this = this;
    this.$http
      .get(
        URL+"/company/getCtsStatData/" +
          appDB.get("companyInfo").companyId,{
            headers: {'Authorization': appDB.get("companyInfo").token}
          }
      )
      .then(response => {
        var d = response.data;
        _this.carNum = d.record.carNum;
        _this.teacherNum = d.record.teacherNum;
        _this.studentNum = d.record.studentNum;
        _this.studentYearNum = d.record.studentYearNum;
        // 动态数字
        var options = {
          useEasing: true,
          useGrouping: true,
          separator: "",
          decimal: ".",
          prefix: "",
          suffix: "",
        };
        var homeNo1 = new CountUp("homeIco-1", 0, this.studentYearNum, 0, 2.5, options);
        $(function() {
          setTimeout(function() {
            homeNo1.start();
          }, 100);
        });
      })
      .catch(error => {
        alert("网络错误，不能访问");
      });
    

    //获取驾校本年度招生统计数据接口
    this.$http.get(URL+"/company/getYearApplyNum/" + appDB.get("companyInfo").companyId,{
      headers: {'Authorization': appDB.get("companyInfo").token}
    })
      .then(response => {
        var d = response.data;
        //截取返回数据只获取月份和
        var xAxisData = [], seriesData = [];
        $.each(d.record, function(i, o){
          var n = Number(o.APPLYDATE.split("-")[1]), v = o.APPLY_CNT;
          xAxisData.push(n);//横轴月份
          seriesData.push(v);//纵轴数值
        });
        //根据月份多少判断横轴信息是否全部显示
        if (xAxisData.length > 12) {
          _this.bar.xAxis.axisLabel.interval = 1;
        } else {
          _this.bar.xAxis.axisLabel.interval = 0;
        }
        //渲染图表
        // _this.bar.xAxis.data = xAxisData;
        _this.bar.series.data = seriesData;
      })
      .catch(error => {
        alert("网络错误，不能访问");
      });

    //获取驾校本年度结业统计数据接口
    this.$http.get(URL+"/company/getYearGraduationNum/" + appDB.get("companyInfo").companyId,{
      headers: {'Authorization': appDB.get("companyInfo").token}
    })
      .then(response => {
        var d = response.data;
        //截取返回数据只获取月份和
        var xAxisData = [], seriesData = [];
        $.each(d.record, function(i, o){
          var n = Number(o.GRANT_DATE.split("-")[1]), v = o.GRACERT_CNT;
          xAxisData.push(n);//横轴月份
          seriesData.push(v);//纵轴数值
        });
        //根据月份多少判断横轴信息是否全部显示
        if (xAxisData.length > 12) {
          _this.bar2.xAxis.axisLabel.interval = 1;
        } else {
          _this.bar2.xAxis.axisLabel.interval = 0;
        }
        //渲染图表
        // _this.bar2.xAxis.data = xAxisData;
        _this.bar2.series.data = seriesData;
      })
      .catch(error => {
        alert("网络错误，不能访问");
      });
    
    // 获取本月科目学时统计信息
    this.$http.get(URL+"/company/getSubjectLessonStat/" + appDB.get("companyInfo").companyId,{
      headers: {'Authorization': appDB.get("companyInfo").token}
    })
      .then(response => {
        var d = response.data.record;
        _this.totalHours = d.totalHours;
        _this.sub2Hours = d.sub2Hours;
        _this.sub3Hours = d.sub3Hours;
        _this.totalMileage = d.totalMileage;
        _this.sub2Mileage = d.sub2Mileage;
        _this.sub3Mileage = d.sub3Mileage;
      })
      .catch(error => {
        alert("网络错误，不能访问");
      });

    // 获取驾校当月招生、结业数据接口
    this.$http.get(URL+"/company/getMonthlyData1/" + appDB.get("companyInfo").companyId,{
      headers: {'Authorization': appDB.get("companyInfo").token}
    })
      .then(response => {
        var d = response.data.record;
        _this.applyNum = d.applyNum;
        _this.graduationNum = d.graduationNum;
      })
      .catch(error => {
        alert("网络错误，不能访问");
      });
    
    //本月本校收支统计
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
        _this.InTotal = d.record.totalInNum;
        _this.OutTotal = d.record.totalOutNum;
      })
      .catch(error => {
        console.info(error);
        alert("网络错误，不能访问");
      });
  },
  data: () => ({
    companyName: appDB.get("companyInfo").companyName,
    InTotal: '',
    OutTotal: '',
    carNum: "",
    teacherNum: "",
    studentNum: "",
    studentYearNum: "",
    applyNum: '',
    graduationNum: '',
    totalHours: '',//科二、科三总学时(小时
    sub2Hours: '',//科二学时
    sub3Hours: '',//科三学时
    totalMileage: '',//总里程（公里）
    sub2Mileage: '',//科二里程
    sub3Mileage: '',//科三里程

    bar: {
      color: ["#0dbc5f"],
      tooltip: {
        trigger: "item",
        formatter: "{b}月{c}人",
        confine: true,
        position: "top"
      },
      grid: {
        left: "3%",
        right: "3%",
        top: "5%",
        bottom: "3%",
        containLabel: true
      },
      xAxis:{
          type: "category",
          data : ['1','2','3','4','5','6','7','8','9','10','11','12'],
          axisTick: {
            lineStyle: {
              width: 0,
            }
          },
          axisLine: {
            lineStyle: {
              color: "#41576d",
              width: 1,
              type: "solid"
            }
          },
          axisLabel: {
            color: '#fff',
            // interval: 1, //横轴信息全部显示
            //rotate: 30,//30度角倾斜显示
          }
        },
      yAxis: {
        type: "value",
        splitNumber: 5,
        // interval: 3,
        splitLine: {
            lineStyle: {
                // 使用深浅的间隔色
                color: ['#41576d'],
                width: 1,
                type: 'solid',
            }
        },
        axisLine: {
          lineStyle: {
            width: 0,
            color: "#fefeff"
          }
        },
        axisTick: {
          show: false
        }
      },
      series: {
          type: "bar",
          barWidth: "50%",
          data: []
        }
    },
    bar2: {
      color: ["#ffc600"],
      tooltip: {
        trigger: "item",
        formatter: "{b}月{c}人",
        confine: true,
        position: "top"
      },
      grid: {
        left: "3%",
        right: "3%",
        top: "5%",
        bottom: "3%",
        containLabel: true
      },
      xAxis:{
          type: "category",
          data : ['1','2','3','4','5','6','7','8','9','10','11','12'],
          axisTick: {
            lineStyle: {
              width: 0,
            }
          },
          axisLine: {
            lineStyle: {
              width: 0,
            }
          },
          axisLabel: {
             color: '#fff',
            // interval: 1 //横轴信息全部显示
            //             rotate: 30,//30度角倾斜显示
          }
        },
      yAxis: {
        type: "value",
        splitLine: {
            lineStyle: {
                // 使用深浅的间隔色
                color: ['#41576d'],
                width: 1,
                type: 'solid',
            }
        },
        axisLine: {
          lineStyle: {
            width: 0,
            color: "#fefeff"
          }
        },
        axisTick: {
          show: false
        }
      },
      series:{
          type: "bar",
          barWidth: "50%",
          data: []
        }
    }
  })
};
</script>

<style scoped>
.icon-jinru{
  font-size: 14px;
}
.yearZhaos {
  width: 30%;
  height: 110px;
  padding: 15px 0;
  float: right;
  text-align: center;
  background: url(../../static/images/yearZs-bg.png) no-repeat center;
  background-size: 100% 100%;
  margin-top: 25px;
  color: #0ac06c;
}

.yearZhaos-num {
  width: 100%;
  font-size: 60px;
  margin-top: 5px;
  color: #16cc71;
  font-weight: bold;
  text-shadow: 1px 1px 2px #116335;
}

.top-detail-num {
  font-size: 30px;
}

.top-detail ul li {
  width: 33.33333333%;
  padding: 15px 0;
  float: left;
  color: #0ac06c;
  line-height: 30px;
}

.school-name {
  width: 100%;
  float: left;
  padding: 15px 0;
  color: #fff;
  font-size: 24px;
  border-bottom: 3px solid #0ac06c;
}

.top-detail {
  width: 60%;
  margin-top: 25px;
  float: left;
}

.bigData {
  width: 100%;
  float: left;
  overflow: hidden;
}

.bigData-head {
  width: 94%;
  padding: 0 3%;
  height: 80px;
  line-height: 80px;
  font-size: 18px;
  color: #fff;
  float: left;
  background: url(../../static/images/header-bottom-bg.jpg) repeat-x bottom;
}

.bigData-cont {
  width: 100%;
  float: laft;
}

.yearZhaos-text {
  font-size: 18px;
  margin-top: 10px;
}

.echart {
  width: 100%;
  float: left;
  margin-top: 10px;
}

.echartZS {
  width: 43%;
  float: left;
  position: relative;
  border: 1px solid #0ac06c;
  padding: 15px 15px;
}

.echartJY {
  width: 43%;
  float: right;
  position: relative;
  border: 1px solid #0ac06c;
  padding: 15px 15px;
}

.topL-bg-icon {
  width: 10px;
  height: 10px;
  display: block;
  position: absolute;
  top: -2px;
  left: -2px;
  background: url(../../static/images/topL.png) no-repeat;
  background-size: 100%;
}

.topR-bg-icon {
  width: 10px;
  height: 10px;
  display: block;
  position: absolute;
  top: -2px;
  right: -2px;
  background: url(../../static/images/topR.png) no-repeat;
  background-size: 100%;
}

.bottomL-bg-icon {
  width: 10px;
  height: 10px;
  display: block;
  position: absolute;
  bottom: -2px;
  left: -2px;
  background: url(../../static/images/bottomL.png) no-repeat;
  background-size: 100%;
}

.bottomR-bg-icon {
  width: 10px;
  height: 10px;
  display: block;
  position: absolute;
  bottom: -2px;
  right: -2px;
  background: url(../../static/images/bottomR.png) no-repeat;
  background-size: 100%;
}

.echart-title {
  width: 100%;
  float: left;
  margin-bottom: 20px;
  color: #fff;
  font-size: 18px;
  background: url(../../static/images/more-icon.png) no-repeat left;
  background-size: 16px 16px;
  text-indent: 22px;
}

.shicao-title{
  width: 100%;
  float: left;
  color: #fff;
  font-size: 18px;
  background: url(../../static/images/more-icon.png) no-repeat left;
  background-size: 16px 16px;
  text-indent: 22px;
  margin-top: 15px;
}

.totals-cont-details{
  width: 80px;
  height: 26px;
  float: right;
  margin-right: 3%;
  background: #fff;
  color: #15a35f;
  margin-top: 13px;
  display: block;
  text-align: left;
  border-radius: 30px;
  font-size: 14px;
  text-align: center;
  border: 0;
}

.echart-title-zs {
  color: #0ac06c;
  font-size: 18px;
}

.echart-title-jy {
  color: #ffc600;
  font-size: 18px;
}

.shicao {
  width: 100%;
  float: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.shicao-cont {
  width: 48%;
  padding: 5px 0;
}

.zhaos-Echart {
  width: 100%;
  float: left;
  height: 130px;
}

.shicao-cont-left {
  width: 80px;
  height: 80px;
  padding: 6px;
  float: left;
  border: 4px solid #11bf6c;
  border-radius: 100%;
  margin-top: 18px;
}

.shicao-cont-left-cont {
  width: 70px;
  height: 36px;
  padding: 17px 0;
  margin: 5px;
  float: left;
  background: #fff;
  border-radius: 100%;
  text-align: center;
  font-size: 16px;
  color: #0ac06c;
}

.shicao-cont-left-cont-text {
  font-size: 12px;
  font-weight: normal;
  margin-top: 10px;
  text-shadow: 1px 1px 2px #116335;
}

.shicao-cont-left-cont-num {
  width: 100%;
  font-size: 18px;
  float: left;
  text-shadow: 1px 1px 1px #5f996a;
}

.shicao-cont-right {
  width: 55%;
  float: left;
  margin-left: 20px;
}

.shicao-cont-right p {
  width: 100%;
  float: left;
  padding: 20px 0 0 0;
  color: #fff;
}

.shicao-cont-right p:first-child {
  color: #0ac06c;
  font-size: 30px;
}

.totals {
  width: 100%;
  float: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0 50px 0;
}

.totals-cont {
  width: 48%;
  float: left;
  border-radius: 3px;
}

.totals-cont-t {
  width: 100%;
  float: left;
  background: #2b4057;
  box-shadow: 0px 0px 3px #102337;
  border-radius: 3px;
  margin-top: 15px;
}

.totals-cont-foot {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: url(../../static/images/header-bottom-bg.jpg) repeat-x top;
  color: #fff;
  font-size: 14px;
  text-indent: 1em;
  float: left;
}

.totals-cont ul li {
  width: 40%;
  float: left;
  text-align: left;
  padding: 8px 5%;
  line-height: 40px;
}

.totals-in {
  color: #ffb412;
  font-size: 24px;
  font-weight: bold;
}

.totals-out {
  color: #15a35f;
  font-size: 24px;
  font-weight: bold;
}

.totals-in-danwei {
  font-size: 18px;
}
.totals-in-zs{
  width: 100%;
  float: left;
  font-size: 18px;
}
</style>

