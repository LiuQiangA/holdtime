<template>
    <div class="peixun">
        <div class="bigData-head"><a href="javascript:history.go(-1)"><i class="icon iconfont icon-fanhui"></i></a>培训情况统计</div>
        <div class="message-cont">
            <!--本月未培训学时统计-->
            <div class="peixun-cont">
                <p class="peixun-title">
                    <i class="icon iconfont icon-tongji"></i>本月未培训学时统计<span class="ygz-btn" @click="showYgz">预估值设置</span></p>
                <div class="xueshiT">
                    <div class="xueshiT-item">
                        <p class="xueshiT-item-title">科目一</p>
                        <ul class="xueshiT-cont">
                            <li>人数：
                                <span class="xueshiT-cont-color">{{SUB1_NUM}}人</span>
                            </li>
                            <li>学时：
                                <span class="xueshiT-cont-color">{{SUB1_DURATION}}小时</span>
                            </li>
                            <li>预估成本：
                                <span class="xueshiT-cont-price">{{kemu1*SUB1_DURATION}}￥</span>
                            </li>
                        </ul>
                    </div>
                    <div class="xueshiT-item">
                        <p class="xueshiT-item-title">科目二</p>
                        <ul class="xueshiT-cont">
                            <li>人数：
                                <span class="xueshiT-cont-color">{{SUB2_NUM}}人</span>
                            </li>
                            <li>理论：
                                <span class="xueshiT-cont-color">{{SUB2_DURATION2}}小时</span>
                            </li>
                            <li>实操：
                                <span class="xueshiT-cont-color">{{SUB2_DURATION1}}小时</span>
                            </li>
                            <li>预估成本：
                                <span class="xueshiT-cont-price">{{kemu2*SUB2_DURATION1}}￥</span>
                            </li>
                        </ul>
                    </div>
                    <div class="xueshiT-item">
                        <p class="xueshiT-item-title">科目三</p>
                        <ul class="xueshiT-cont">
                            <li>人数：
                                <span class="xueshiT-cont-color">{{SUB3_NUM}}人</span>
                            </li>
                            <li>理论：
                                <span class="xueshiT-cont-color">{{SUB3_DURATION2}}小时</span>
                            </li>
                            <li>实操：
                                <span class="xueshiT-cont-color">{{SUB3_DURATION1}}小时</span>
                            </li>
                            <li>预估成本：
                                <span class="xueshiT-cont-price">{{kemu3*SUB3_DURATION1}}￥</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--本月未培训学时统计-->
            <div class="peixun-cont">
                <p class="peixun-title">
                    <i class="icon iconfont icon-fenxi2"></i>培训情况分析</p>
                <div class="qingkuangFX">
                    <div class="qingkuangFX-title">
                        <ul>
                            <li class="monthTab on" @click="getCompanyTrainInfo">学时分析</li>
                            <li class="monthTab" @click="getCompanyStageAuditStat">审核分析</li>
                        </ul>
                    </div>
                    <div class="month-echart">
                        <IEcharts :option="line"></IEcharts>
                    </div>
                </div>
            </div>
            <!--与上年度对比分析-->
            <div class="peixun-cont margin-bottom">
                <p class="peixun-title">
                    <i class="icon iconfont icon-diejia"></i>与上年度对比分析</p>
                <div class="qingkuangFX">
                    <div class="qingkuangFX-title">
                        <ul>
                            <li class="monthTab on" @click="getDbYear">学时分析</li>
                            <li class="monthTab" @click="getSh">审核分析</li>
                            <li class="monthTab" @click="getJy">结业分析</li>
                        </ul>
                    </div>
                    <div class="month-echart">
                        <IEcharts :option="line2"></IEcharts>
                    </div>
                </div>
            </div>
        </div>
        <!--预估值-->
        <div class="ygz-shadow on"></div>
        <div class="ygz-cont on">
          <img class="ygz-close" src="../../static/images/close-icon.png" width="40" @click="hideYgz">
          <p class="ygz-cont-head"><i class="icon iconfont icon-shezhi"></i>预估值设置</p>
          <div class="ygz-art">
            <p class="ygz-art-head">科目一成本单价(单位：小时)</p>
            <div class="demo">
              <input type="hidden" class="single-slider" id="kemu1" value="30" />
              <!--<button id="g1">获取值</button>--> 
            </div>
            <p class="ygz-art-head">科目二成本单价(单位：小时)</p>
            <div class="demo">
              <input type="hidden" class="single-slider" id="kemu2" value="30" />
              <!--<button id="g1">获取值</button>--> 
            </div>
            <p class="ygz-art-head">科目三成本单价(单位：小时)</p>
            <div class="demo">
              <input type="hidden" class="single-slider" id="kemu3" value="30" />
              <!--<button id="g1">获取值</button>--> 
            </div>
            <input class="ygz-cont-btn" type="button" value="确    定" @click="hideYgz" />
          </div>
        </div>
    </div>
</template>

<script>
import IEcharts from "vue-echarts-v3";
import jQuery from "jquery";
import jRange from "../../static/js/jquery.range.js"
export default {
  name: "peixun",
  components: {
    IEcharts
  },
  mounted: function() {
    this.$nextTick(function(){
      //滑块儿
      // $(".slider-container").width(400);
      $(".single-slider").jRange({
        from: 0,
        to: 150,
        step: 1,
        // scale: [0, 25, 50, 75, 100],
        format: "%s",
        width: 300,
        showLabels: true,
        showScale: true
      });
      this.getCompanyTrainInfo(); //获取驾校培训学时统计数据接口
    }),
    //调用沙盒
    this.getCount();
    //防止在登陆页没有登陆时候直接手动改变url访问
    initPage.checkLogin();
    //message-cont高度设置
    var WH = $(window).height();
    var RWH = WH - 160;
    $(".message-cont").height(RWH);

    //预估值背景高度
    $(".ygz-shadow").height(WH);

    //本月tab切换
    $(".monthTab").click(function() {
      $(this)
        .addClass("on")
        .siblings()
        .removeClass("on");
    });

    //日期
    var da = new Date();
    var year = da.getFullYear();
    this.year = year;

    this.getNotTrainInfo(); // 获取驾校未培训统计信息接口
    this.getCompanyTrainInfo(); //获取驾校培训学时统计数据接口
    this.getDbYear(); //与上年度对比分析
  },

  methods: {
    //判断APP沙盒中有没有设置好的预估值，有则设置默认值为沙盒中的值，没有则使用默认值
    getCount(){
      var getCount1 = window.xiaolu.getCount1();
      var getCount2 = window.xiaolu.getCount2();
      var getCount3 = window.xiaolu.getCount3();
      if (getCount1 != 0 || getCount1!=null) {
        this.kemu1 = getCount1;
        $("#kemu1").val(getCount1);
      }
      if (getCount2 != 0 || getCount2!=null) {
        this.kemu2 = getCount2;
        $("#kemu2").val(getCount2);
      }
      if (getCount3 != 0 || getCount3!=null) {
        this.kemu3 = getCount3;
        $("#kemu3").val(getCount3);
      }
    },
    //预估值设置
    showYgz(){
        $(".ygz-shadow").removeClass("on");
        $(".ygz-cont").removeClass("on");
    },
    hideYgz(){
        $(".ygz-shadow").addClass("on");
        $(".ygz-cont").addClass("on");
        var kemu1 = $("#kemu1").val();
        var kemu2 = $("#kemu2").val();
        var kemu3 = $("#kemu3").val();
        //设置预估值渲染
        this.kemu1 = kemu1;
        this.kemu2 = kemu2;
        this.kemu3 = kemu3;
        //把设置好的预估值返回给APP沙盒存储
        window.xiaolu.passCount1(kemu1)
        window.xiaolu.passCount2(kemu2)
        window.xiaolu.passCount3(kemu3)
    },
    // 获取驾校未培训统计信息接口
    getNotTrainInfo() {
      var _this = this;
      this.$http
        .get(
          URL+"/company/getNotTrainInfo/" +
            appDB.get("companyInfo").companyId,{
              headers: {'Authorization': appDB.get("companyInfo").token}
            }
        )
        .then(response => {
          var d = response.data;
          _this.SUB1_NUM = d.record.SUB1_NUM;
          _this.SUB1_DURATION = d.record.SUB1_DURATION;
          _this.SUB2_NUM = d.record.SUB2_NUM;
          _this.SUB2_DURATION1 = d.record.SUB2_DURATION1;
          _this.SUB2_DURATION2 = d.record.SUB2_DURATION2;
          _this.SUB3_NUM = d.record.SUB3_NUM;
          _this.SUB3_DURATION1 = d.record.SUB3_DURATION1;
          _this.SUB3_DURATION2 = d.record.SUB3_DURATION2;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },

    //获取驾校培训学时统计数据接口
    getCompanyTrainInfo() {
      var _this = this;
      var myDate = new Date();
      var Year = myDate.getFullYear(); //获取当年年份
      _this.year = Year;
      this.$http
        .get(
          URL+"/company/getCompanyTrainInfo/" +
            appDB.get("companyInfo").companyId +
            "/" +
            _this.year,{
              headers: {'Authorization': appDB.get("companyInfo").token}
            }
        )
        .then(response => {
          var d = response.data.record;
          var xAxisData = [],
            seriesData1 = [],
            seriesData2 = [],
            seriesData3 = [],
            seriesDataAll = [];
          $.each(d, function(i, o) {
            var n = o.month + "月",
              v1 = o.sub1Duration,
              v2 = o.sub2Duration,
              v3 = o.sub3Duration;
            var all = v1 + v2 + v3;
            xAxisData.push(n); //横轴月份
            seriesDataAll.push(all); //科目一纵轴数值
            seriesData1.push(v1); //科目一纵轴数值
            seriesData2.push(v2); //科目二纵轴数值
            seriesData3.push(v3); //科目三纵轴数值
          });
          //渲染图表
          // _this.line.xAxis.data = xAxisData;
          _this.line.series[0].data = seriesDataAll;
          _this.line.series[1].data = seriesData1;
          _this.line.series[2].data = seriesData2;
          _this.line.series[3].data = seriesData3;
          _this.line.title.text = this.year + "年度学时分析";
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },

    //获取驾校科目学时审核统计信息接口
    getCompanyStageAuditStat() {
      var _this = this;
      var myDate = new Date();
      var Year = myDate.getFullYear(); //获取当年年份
      _this.year = Year;
      this.$http
        .get(
          URL+"/company/getCompanyStageAuditStat/" +
            appDB.get("companyInfo").companyId +
            "/" +
            _this.year,{
              headers: {'Authorization': appDB.get("companyInfo").token}
            }
        )
        .then(response => {
          var d = response.data.record;
          var xAxisData = [],
            seriesData1 = [],
            seriesData2 = [],
            seriesData3 = [],
            seriesDataAll = [];
          $.each(d, function(i, o) {
            var n = o.month + "月",
              v1 = o.sub1Num,
              v2 = o.sub2Num,
              v3 = o.sub3Num;
            var all = v1 + v2 + v3;
            xAxisData.push(n); //横轴月份
            seriesDataAll.push(all); //全部纵轴数值
            seriesData1.push(v1); //科目一纵轴数值
            seriesData2.push(v2); //科目二纵轴数值
            seriesData3.push(v3); //科目三纵轴数值
          });
          //渲染图表
          // _this.line.xAxis.data = xAxisData;
          _this.line.series[0].data = seriesDataAll;
          _this.line.series[1].data = seriesData1;
          _this.line.series[2].data = seriesData2;
          _this.line.series[3].data = seriesData3;
          _this.line.title.text = this.year + "年度学时审核分析";
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },

    //与上年度对比分析
    getDbYear() {
      //学时分析
      this.getCompanyTrainInfoYear1();
      this.getCompanyTrainInfoYear2();
    },
    getCompanyTrainInfoYear1() {
      var _this = this;
      var myDate = new Date();
      var Year = myDate.getFullYear(); //获取当年年份
      var Year1 = myDate.getFullYear() - 1; //获取上年年份
      _this.year = Year;
      _this.year1 = Year1;
      this.$http
        .get(
          URL+"/company/getCompanyTrainInfo/" +
            appDB.get("companyInfo").companyId +
            "/" +
            _this.year,{
              headers: {'Authorization': appDB.get("companyInfo").token}
            }
        )
        .then(response => {
          var d = response.data.record;
          var xAxisData = [],
            seriesData1 = [],
            seriesData2 = [],
            seriesData3 = [],
            seriesDataAll = [];
          $.each(d, function(i, o) {
            var n = o.month + "月",
              v1 = o.sub1Duration,
              v2 = o.sub2Duration,
              v3 = o.sub3Duration;
            var all = v1 + v2 + v3;
            xAxisData.push(n); //横轴月份
            seriesDataAll.push(all); //纵轴数值
          });
          //渲染图表
          // _this.line2.xAxis.data = xAxisData;
          _this.line2.series[0].data = seriesDataAll;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    getCompanyTrainInfoYear2() {
      var _this = this;
      var myDate = new Date();
      var Year = myDate.getFullYear(); //获取当年年份
      var Year1 = myDate.getFullYear() - 1; //获取上年年份
      _this.year = Year;
      _this.year1 = Year1;
      this.$http
        .get(
          URL+"/company/getCompanyTrainInfo/" +
            appDB.get("companyInfo").companyId +
            "/" +
            _this.year1,{
              headers: {'Authorization': appDB.get("companyInfo").token}
            }
        )
        .then(response => {
          var d = response.data.record;
          var xAxisData = [],
            seriesData1 = [],
            seriesData2 = [],
            seriesData3 = [],
            seriesDataAll = [];
          $.each(d, function(i, o) {
            var n = o.month + "月",
              v1 = o.sub1Duration,
              v2 = o.sub2Duration,
              v3 = o.sub3Duration;
            var all = v1 + v2 + v3;
            xAxisData.push(n); //横轴月份
            seriesDataAll.push(all); //纵轴数值
          });
          //渲染图表
          // _this.line2.xAxis.data = xAxisData;
          _this.line2.series[1].data = seriesDataAll;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },

    getSh() {
      //审核
      this.getSh1();
      this.getSh2();
    },
    getSh1() {
      var _this = this;
      var myDate = new Date();
      var Year = myDate.getFullYear(); //获取当年年份
      var Year1 = myDate.getFullYear() - 1; //获取上年年份
      _this.year = Year;
      _this.year1 = Year1;
      this.$http
        .get(
          URL+"/company/getCompanyStageAuditStat/" +
            appDB.get("companyInfo").companyId +
            "/" +
            _this.year,{
              headers: {'Authorization': appDB.get("companyInfo").token}
            }
        )
        .then(response => {
          var d = response.data.record;
          var xAxisData = [],
            seriesData1 = [],
            seriesData2 = [],
            seriesData3 = [],
            seriesDataAll = [];
          $.each(d, function(i, o) {
            var n = o.month + "月",
              v1 = o.sub1Num,
              v2 = o.sub2Num,
              v3 = o.sub3Num;
            var all = v1 + v2 + v3;
            xAxisData.push(n); //横轴月份
            seriesDataAll.push(all); //全部纵轴数值
          });
          //渲染图表
          // _this.line2.xAxis.data = xAxisData;
          _this.line2.series[0].data = seriesDataAll;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    getSh2() {
      var _this = this;
      var myDate = new Date();
      var Year = myDate.getFullYear(); //获取当年年份
      var Year1 = myDate.getFullYear() - 1; //获取上年年份
      _this.year = Year;
      _this.year1 = Year1;
      this.$http
        .get(
          URL+"/company/getCompanyStageAuditStat/" +
            appDB.get("companyInfo").companyId +
            "/" +
            _this.year1,{
              headers: {'Authorization': appDB.get("companyInfo").token}
            }
        )
        .then(response => {
          var d = response.data.record;
          var xAxisData = [],
            seriesData1 = [],
            seriesData2 = [],
            seriesData3 = [],
            seriesDataAll = [];
          $.each(d, function(i, o) {
            var n = o.month + "月",
              v1 = o.sub1Num,
              v2 = o.sub2Num,
              v3 = o.sub3Num;
            var all = v1 + v2 + v3;
            xAxisData.push(n); //横轴月份
            seriesDataAll.push(all); //全部纵轴数值
          });
          //渲染图表
          // _this.line2.xAxis.data = xAxisData;
          _this.line2.series[1].data = seriesDataAll;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },

    //获取驾校结业学员数量统计接口
    getJy() {
      this.getJy1();
      this.getJy2();
    },
    getJy1() {
      var _this = this;
      var myDate = new Date();
      var Year = myDate.getFullYear(); //获取当年年份
      var Year1 = myDate.getFullYear() - 1; //获取上年年份
      _this.year = Year;
      _this.year1 = Year1;
      this.$http
        .get(
          URL+"/company/getCompanyGraduationNum/" +
            appDB.get("companyInfo").companyId +
            "/" +
            _this.year,{
              headers: {'Authorization': appDB.get("companyInfo").token}
            }
        )
        .then(response => {
          var d = response.data;
          //截取返回数据只获取月份和
          var xAxisData = [],
            seriesData = [];
          $.each(d.record, function(i, o) {
            var n = Number(o.GRANT_DATE.split("-")[1]) + "月",
              v = o.GRACERT_CNT;
            xAxisData.push(n); //横轴月份
            seriesData.push(v); //纵轴数值
          });
          //渲染图表
          _this.line2.series[0].data = seriesData;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    getJy2() {
      var _this = this;
      var myDate = new Date();
      var Year = myDate.getFullYear(); //获取当年年份
      var Year1 = myDate.getFullYear() - 1; //获取上年年份
      _this.year = Year;
      _this.year1 = Year1;
      this.$http
        .get(
          URL+"/company/getCompanyGraduationNum/" +
            appDB.get("companyInfo").companyId +
            "/" +
            _this.year1,{
              headers: {'Authorization': appDB.get("companyInfo").token}
            }
        )
        .then(response => {
          var d = response.data;
          //截取返回数据只获取月份和
          var xAxisData = [],
            seriesData = [];
          $.each(d.record, function(i, o) {
            var n = Number(o.GRANT_DATE.split("-")[1]) + "月",
              v = o.GRACERT_CNT;
            xAxisData.push(n); //横轴月份
            seriesData.push(v); //纵轴数值
          });
          //渲染图表
          // _this.line2.xAxis.data = xAxisData;
          _this.line2.series[1].data = seriesData;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    }
  },
  data: () => ({
    year: '',
    kemu1: 30,//科目一成本预估值
    kemu2: 30,//科目二成本预估值
    kemu3: 30,//科目三成本预估值
    year: "", //本年度
    year1: "", //上年度
    SUB1_NUM: "", //科一未培训人数
    SUB1_DURATION: "", //科一未培训学时（小时）
    SUB2_NUM: "", //科二未培训人数
    SUB2_DURATION1: "", //科二未培训实操学时
    SUB2_DURATION2: "", //科二未培训理论学时
    SUB3_NUM: "", //科三未培训人数
    SUB3_DURATION1: "", //科三未培训实操学时
    SUB3_DURATION2: "", //科三未培训理论学时
    line: {
      title: {
        text: "",
        textStyle: {
          color: "#fff",
          fontWeight: "nomal"
        }
      },
      tooltip: {
        trigger: "axis"
      },

      legend: {
        selected: {
          全部学时: true,
          科一学时: false,
          科二学时: false,
          科三学时: false
        },
        right: "0",
        data: ["全部", "科一", "科二", "科三"],
        textStyle: {
          color: "#fff",
          fontWeight: "nomal"
        }
      },
      grid: {
        left: "1%",
        right: "3%",
        bottom: "0",
        containLabel: true
      },
      calculable: true,
      xAxis: {
        type: "category",
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        axisLabel: {
          color: "#ffffff"
        },
        axisTick: {
          lineStyle: {
            width: 0
          }
        },
        axisLine: {
          lineStyle: {
            color: "#00b77a",
            width: 2,
            type: "solid"
          }
        }
      },
      yAxis: [
        {
          axisLabel: {
            color: "#ffffff"
          },
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ["#167d69"],
              width: 1,
              type: "solid"
            }
          },
          type: "value",
          axisTick: {
            lineStyle: {
              width: 0
            }
          },
          axisLine: {
            lineStyle: {
              color: "#00b77a",
              width: 3,
              type: "solid"
            }
          }
        }
      ],
      series: [
        {
          name: "全部",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          data: [],
          itemStyle: {
            normal: {
              color: "#2cc4c6"
            }
          }
        },
        {
          name: "科一",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          data: [],
          itemStyle: {
            normal: {
              color: "#feb71f"
            }
          }
        },
        {
          name: "科二",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          data: [],
          itemStyle: {
            normal: {
              color: "#007ea7"
            }
          }
        },
        {
          name: "科三",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          data: [],
          itemStyle: {
            normal: {
              color: "#ff731f"
            }
          }
        }
      ]
    },

    line2: {
      title: {
        text: "与上年度对比分析",
        textStyle: {
          color: "#fff",
          fontWeight: "nomal"
        }
      },
      tooltip: {
        trigger: "axis"
      },

      legend: {
        // selected: {
        //     '全部学时': true,
        //     '科一学时': false,
        //     '科二学时': false,
        //     '科三学时': false,
        // },
        right: "0",
        data: ["本年度", "上年度"],
        textStyle: {
          color: "#fff",
          fontWeight: "nomal"
        }
      },
      grid: {
        left: "1%",
        right: "3%",
        bottom: "0",
        containLabel: true
      },
      calculable: true,
      xAxis: {
        type: "category",
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        axisLabel: {
          color: "#ffffff"
        },
        axisTick: {
          lineStyle: {
            width: 0
          }
        },
        axisLine: {
          lineStyle: {
            color: "#00b77a",
            width: 2,
            type: "solid"
          }
        }
      },
      yAxis: [
        {
          axisLabel: {
            color: "#ffffff"
          },
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ["#00b77a"],
              width: 1,
              type: "solid"
            }
          },
          type: "value",
          axisTick: {
            lineStyle: {
              width: 0
            }
          },
          axisLine: {
            lineStyle: {
              color: "#00b77a",
              width: 3,
              type: "solid"
            }
          }
        }
      ],
      series: [
        {
          name: "本年度",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          data: [],
          itemStyle: {
            normal: {
              color: "#00b77a"
            }
          }
        },
        {
          name: "上年度",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          data: [],
          itemStyle: {
            normal: {
              color: "#feb71f"
            }
          }
        }
      ]
    }
  })
};
</script>

<style scoped>
@import "../../static/css/jquery.range.css";
.ygz-close{
  position: absolute;
  z-index: 99;
  top: -86px;
  right: 0;
}
.ygz-cont-btn{
  width: 70%;
  margin: 30px 15%;
  padding: 6px 0;
  border-radius: 70px !important;
  background: #00b77a;
  color: #fff;
}
.ygz-art-head{
  width: 100%;
  float: left;
  margin-top: 20px;
}
.demo {
  width: 100%;
  padding: 40px 0;
  float: left;
}
.ygz-art {
  width: 90%;
  padding: 20px 5%;
  margin: 0 auto;
}
.ygz-cont-head {
  width: 94%;
  padding: 15px 3%;
  color: #6e6e6e;
  font-size: 24px;
  border-bottom: 1px solid #cecece;
}
.icon-shezhi {
  color: #00b77a;
  font-size: 30px !important;
}
.ygz-cont {
  width: 80%;
  position: absolute;
  top: 50%;
  left: 10%;
  margin-top: -225px;
  background: #fff;
  z-index: 100;
  border-radius: 5px;
  display: block;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}
.ygz-cont.on{
  position: absolute;
  top: -2000px;
  left: 10%;
}
.ygz-shadow {
  width: 100%;
  float: left;
  background: #000000;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  display: block;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all .5s;
}
.ygz-shadow.on{
  position: absolute;
  top: -2000px;
  left: 0;
}
.ygz-btn {
  float: right;
  color: #00b77a;
}
.peixun {
  width: 100%;
  float: left;
  overflow: hidden;
}

.bigData-head {
  width: 94%;
  padding: 0 3%;
  height: 80px;
  line-height: 80px;
  font-size: 20px;
  color: #fff;
  float: left;
  background: url(../../static/images/header-bottom-bg.jpg) repeat-x bottom;
}

.peixun-cont {
  width: 100%;
  float: left;
}

.peixun-title {
  width: 100%;
  font-size: 20px;
  float: left;
  color: #fff;
  margin: 40px 0 20px 0;
}

.iconfont {
  font-size: 24px;
  color: #00b77a;
  float: left;
  margin-right: 6px;
}

.xueshiT {
  width: 100%;
  float: left;
  display: flex;
  justify-content: space-between;
}

.xueshiT-item {
  width: 30%;
  float: left;
  border-radius: 5px;
  box-shadow: 1px 1px 3px #102337;
  text-align: center;
  background: #fff;
  padding-bottom: 5px;
}

.xueshiT-cont {
  width: 100%;
  float: left;
  padding: 15px 0;
  background: #fff;
  font-size: 18px;
}

.xueshiT-item ul li {
  width: 90%;
  float: left;
  padding: 15px 5%;
  text-align: left;
}

.xueshiT-item-title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  float: left;
  background: #00b77a;
  color: #fff;
  border-radius: 5px 5px 0 0;
  font-size: 18px;
  border-bottom: 1px solid #138760;
}

.xueshiT-cont-color {
  color: #00b77a;
}

.xueshiT-cont-price {
  color: #feb71f;
}

.qingkuangFX {
  width: 100%;
  float: left;
  background: #2d4257;
  box-shadow: 1px 1px 3px #102337;
}

.qingkuangFX-title {
  width: 100%;
  float: left;
  color: #fff;
  font-size: 18px;
  padding: 10px 0;
  border-bottom: 1px solid #00b77a;
}

.qingkuangFX-title ul li {
  height: 22px;
  line-height: 22px;
  padding: 0 40px;
  float: left;
  border-right: 1px solid #fff;
  height: 22px;
}

.monthTab.on {
  color: #00b77a;
  border-right: 1px solid #00b77a;
}

.month-echart {
  width: 94%;
  padding: 20px 3%;
  height: 260px;
  float: left;
}
.margin-bottom {
  margin-bottom: 50px;
}
.icon-fanhui {
  color: #fff;
}
</style>


