<template>
    <div class="peixun">
        <div class="bigData-head"><a href="javascript:history.go(-1)"><i class="icon iconfont icon-fanhui"></i></a>本校收支统计</div>
        <div class="message-cont">
            <!--本月本校收支统计-->
            <div class="peixun-cont">
                <p class="peixun-title">
                    <i class="icon iconfont icon-count_prices"></i>本月本校收支统计</p>
                <div class="xueshiT">
                    <div class="xueshiT-item">
                        <IEcharts :option="pie1"></IEcharts>
                        <div class="in-num">
                            <span class="inout-num-total">{{totalInNum}}</span>￥<br>本月收入</div>
                    </div>
                    <div class="xueshiT-item">
                        <IEcharts :option="pie2"></IEcharts>
                        <div class="out-num">
                            <span class="inout-num-total">{{totalOutNum}}</span>￥<br>本月支出</div>
                    </div>
                </div>
            </div>
            <!--本校年度收支分析-->
            <div class="peixun-cont">
                <p class="peixun-title">
                    <i class="icon iconfont icon-tongji"></i>本校年度收支分析</p>
                <div class="qingkuangFX">
                    <div class="month-echart">
                        <p class="in-head">{{year}}年度<span class="in-color">收入</span>分析</p>
                        <IEcharts :option="line"></IEcharts>
                    </div>
                </div>
                <div class="qingkuangFX margin-top">
                    <div class="month-echart">
                        <p class="out-head">{{year}}年度<span class="out-color">支出</span>分析</p>
                        <IEcharts :option="line2"></IEcharts>
                    </div>
                </div>
            </div>
            <!--本校年度总收入与上一年度对比分析-->
            <div class="peixun-cont margin-bottom">
                <p class="peixun-title">
                    <i class="icon iconfont icon-shouru-copy-copy"></i>本校年度总收入与上一年度对比分析</p>
                <div class="qingkuangFX">
                    <div class="month-echart">
                        <IEcharts :option="line3"></IEcharts>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IEcharts from "vue-echarts-v3";
export default {
  name: "shouzhi",
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

    //日期
    var da = new Date();
    var year = da.getFullYear();
    this.year = year;
    this.lastyear = year-1;

    this.getMonthIn(); //本月本校收支统计
    this.getYearIn();//报名费
    this.getYearIn1();
    this.getYearIn2();
    this.getYearIn3();
    this.getYearOut();//加油气
    this.getYearOut1();
    this.getYearOut2();
    this.getYearOut3();
    this.getYearOut4();
    this.getYearOut5();
    this.getYearZSR();//获取本年度收入统计
    this.getYearZSR1();
  },
  methods: {
    //本月本校收支统计
    getMonthIn() {
      var _this = this;
      this.$http
        .get(URL + "/api/iem/statistic/" + appDB.get("companyInfo").companyId, {
          headers: { Authorization: appDB.get("companyInfo").token }
        })
        .then(response => {
          var d = response.data;
          _this.totalInNum = d.record.totalInNum;
          _this.totalOutNum = d.record.totalOutNum;
          _this.pie1.series.data[3].value = d.record.inCome.enrollNum;
          _this.pie1.series.data[2].value = d.record.inCome.drivingNum;
          _this.pie1.series.data[1].value = d.record.inCome.manageNum;
          _this.pie1.series.data[0].value = d.record.inCome.examNum;
          //支出
          _this.pie2.series.data = d.record.pay;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
      // _this.pie1.series.data[0].value = appDB.get("InOutInformation").inCome.examNum;//考试模拟费
      // _this.pie1.series.data[1].value = appDB.get("InOutInformation").inCome.manageNum;//包库管理费
      // _this.pie1.series.data[2].value = appDB.get("InOutInformation").inCome.drivingNum;//练车加时费
      // _this.pie1.series.data[3].value = appDB.get("InOutInformation").inCome.enrollNum;//学员报名费
      // _this.totalInNum = appDB.get("InOutInformation").totalInNum;//本月收入
      // _this.totalOutNum = appDB.get("InOutInformation").totalOutNum;//本月支出
      // _this.pie2.series.data = appDB.get("InOutInformation").pay//支出详细
    },
    //获取本年度收入统计http://xx.com/api/iem/ndsrstatistic/{companyId}/{type}
    getYearIn() {//报名费
      this.$http
        .get(
          URL +
            "/api/iem/ndsrstatistic/" +
            appDB.get("companyInfo").companyId +
            "/" +
            this.bmf,
          {
            headers: { Authorization: appDB.get("companyInfo").token }
          }
        )
        .then(res => {
          let d = res.data;
          this.line.series[0].data = d.record;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    getYearIn1() {//包库费
      this.$http
        .get(
          URL +
            "/api/iem/ndsrstatistic/" +
            appDB.get("companyInfo").companyId +
            "/" +
            this.bkf,
          {
            headers: { Authorization: appDB.get("companyInfo").token }
          }
        )
        .then(res => {
          let d = res.data;
          this.line.series[1].data = d.record;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    getYearIn2() {//加时费
      this.$http
        .get(
          URL +
            "/api/iem/ndsrstatistic/" +
            appDB.get("companyInfo").companyId +
            "/" +
            this.jsf,
          {
            headers: { Authorization: appDB.get("companyInfo").token }
          }
        )
        .then(res => {
          let d = res.data;
          this.line.series[2].data = d.record;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    getYearIn3() {//考试模拟费
      this.$http
        .get(
          URL +
            "/api/iem/ndsrstatistic/" +
            appDB.get("companyInfo").companyId +
            "/" +
            this.ksmnf,
          {
            headers: { Authorization: appDB.get("companyInfo").token }
          }
        )
        .then(res => {
          let d = res.data;
          this.line.series[3].data = d.record;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    //获取本年度支出统计http://xx.com/api/iem/ndzcstatistic/{companyId}/{type}
    getYearOut() {//加油气
      this.$http
        .get(
          URL +
            "/api/iem/ndzcstatistic/" +
            appDB.get("companyInfo").companyId +
            "/" +
            this.jyq,
          {
            headers: { Authorization: appDB.get("companyInfo").token }
          }
        )
        .then(res => {
          let d = res.data;
          this.line2.series[0].data = d.record;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    getYearOut1() {//维修保养
      this.$http
        .get(
          URL +
            "/api/iem/ndzcstatistic/" +
            appDB.get("companyInfo").companyId +
            "/" +
            this.wxby,
          {
            headers: { Authorization: appDB.get("companyInfo").token }
          }
        )
        .then(res => {
          let d = res.data;
          this.line2.series[1].data = d.record;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    getYearOut2() {//车辆保险
      this.$http
        .get(
          URL +
            "/api/iem/ndzcstatistic/" +
            appDB.get("companyInfo").companyId +
            "/" +
            this.clbx,
          {
            headers: { Authorization: appDB.get("companyInfo").token }
          }
        )
        .then(res => {
          let d = res.data;
          this.line2.series[2].data = d.record;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    getYearOut3() {//费用报销
      this.$http
        .get(
          URL +
            "/api/iem/ndzcstatistic/" +
            appDB.get("companyInfo").companyId +
            "/" +
            this.fybx,
          {
            headers: { Authorization: appDB.get("companyInfo").token }
          }
        )
        .then(res => {
          let d = res.data;
          this.line2.series[3].data = d.record;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    getYearOut4() {//员工工资
      this.$http
        .get(
          URL +
            "/api/iem/ndzcstatistic/" +
            appDB.get("companyInfo").companyId +
            "/" +
            this.yggz,
          {
            headers: { Authorization: appDB.get("companyInfo").token }
          }
        )
        .then(res => {
          let d = res.data;
          this.line2.series[4].data = d.record;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    getYearOut5() {//教练员工资
      this.$http
        .get(
          URL +
            "/api/iem/ndzcstatistic/" +
            appDB.get("companyInfo").companyId +
            "/" +
            this.jlygz,
          {
            headers: { Authorization: appDB.get("companyInfo").token }
          }
        )
        .then(res => {
          let d = res.data;
          this.line2.series[5].data = d.record;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    //获取本年度收入统计http://xx.com/api/iem/zsrstatistic/{companyId}/{year}
    getYearZSR(){
      this.$http
        .get(
          URL +
            "/api/iem/zsrstatistic/" +
            appDB.get("companyInfo").companyId +
            "/" +
            this.year,
          {
            headers: { Authorization: appDB.get("companyInfo").token }
          }
        )
        .then(res => {
          let d = res.data;
          this.line3.series[0].data = d.record;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
    getYearZSR1(){
      this.$http
        .get(
          URL +
            "/api/iem/zsrstatistic/" +
            appDB.get("companyInfo").companyId +
            "/" +
            this.lastyear,
          {
            headers: { Authorization: appDB.get("companyInfo").token }
          }
        )
        .then(res => {
          let d = res.data;
          this.line3.series[1].data = d.record;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    }
  },
  data: () => ({
    year: '',
    lastyear: '',
    bmf: 'bmf',
    jsf: 'jsf',
    bkf: 'bkf',
    ksmnf: 'ksmnf',
    jyq: 'jyq',
    wxby: 'wxby',
    clbx: 'clbx',
    fybx: 'fybx',
    yggz: 'yggz',
    jlygz: 'jlygz',
    totalInNum: "", //本月收入
    totalOutNum: "", //本月支出
    pie1: {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)"
      },
      grid: {
        left: "1%",
        right: "1%",
        bottom: "0",
        containLabel: true
      },
      series: {
        center: ["50%", "55%"],
        type: "pie",
        startAngle: 120,
        radius: ["60%", "77%"],
        color: ["#46ab89", "#ffa414", "#fff", "#05a36e"],
        label: {
          normal: {
            formatter: "{b}",
            fontSize: 12,
            position: "outside"
          }
        },
        labelLine: {
          normal: {
            length: 5,
            length2: 5,
            smooth: 0
          }
        },
        itemStyle: {
          normal: {
            borderWidth: 3,
            borderColor: "#324961" //为图形设置与背景色相同的边框，有间距效果
          }
        },
        markPoint: {
          symbol: "pin"
        },
        data: [
          { value: 435, name: "模拟费用" },
          { value: 679, name: "包库费用" },
          { value: 848, name: "加时费用" },
          { value: 348, name: "报名费用" }
        ],
        hoverAnimation: false
      }
    },
    pie2: {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)"
      },
      grid: {
        left: "1%",
        right: "1%",
        bottom: "0",
        containLabel: true
      },
      series: {
        center: ["51%", "55%"],
        type: "pie",
        startAngle: 120,
        radius: ["60%", "77%"],
        color: ["#46b43f", "#177e67", "#fff", "#ffd800", "#2cc4c6", "#00aff0"],
        label: {
          normal: {
            formatter: "{b}",
            fontSize: 12
          }
        },
        labelLine: {
          normal: {
            length: 5,
            length2: 5,
            smooth: 0
          }
        },
        itemStyle: {
          normal: {
            borderWidth: 3,
            borderColor: "#324961" //为图形设置与背景色相同的边框，有间距效果
          }
        },
        data: [],
        hoverAnimation: false
      }
    },
    line: {
      tooltip: {
        trigger: "axis"
      },

      legend: {
        selected: {
          报名费用: true,
          包库费用: false,
          加时费用: false,
          模拟费用: false
        },
        right: "0",
        data: ["报名费用", "包库费用", "加时费用", "模拟费用"],
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
      xAxis: [
        {
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
        }
      ],
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
          name: "报名费用",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          data: [],
          itemStyle: {
            normal: {
              color: "#00b77a"
            }
          },
          markPoint: {
            data: [{ type: "max", name: "最大值" }]
          }
        },
        {
          name: "包库费用",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          data: [],
          itemStyle: {
            normal: {
              color: "#feb71f"
            }
          },
          markPoint: {
            data: [{ type: "max", name: "最大值" }]
          }
        },
        {
          name: "加时费用",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          data: [],
          itemStyle: {
            normal: {
              color: "#007ea7"
            }
          },
          markPoint: {
            data: [{ type: "max", name: "最大值" }]
          }
        },
        {
          name: "模拟费用",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          data: [],
          itemStyle: {
            normal: {
              color: "#ff731f"
            }
          },
          markPoint: {
            data: [{ type: "max", name: "最大值" }]
          }
        }
      ]
    },

    line2: {
      tooltip: {
        trigger: "axis"
      },

      legend: {
        selected: {
          加油加气: true,
          维修保养: false,
          车辆保险: false,
          费用报销: false,
          员工工资: false,
          教练员工资: false
        },
        right: "0",
        data: ["加油加气", "维修保养", "车辆保险", "费用报销", "员工工资","教练员工资"],
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
      xAxis: [
        {
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
        }
      ],
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
          name: "加油加气",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          data: [],
          itemStyle: {
            normal: {
              color: "#46b43f"
            }
          },
          markPoint: {
            data: [{ type: "max", name: "最大值" }]
          }
        },
        {
          name: "维修保养",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          data: [],
          itemStyle: {
            normal: {
              color: "#177e67"
            }
          },
          markPoint: {
            data: [{ type: "max", name: "最大值" }]
          }
        },
        {
          name: "车辆保险",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          data: [],
          itemStyle: {
            normal: {
              color: "#afb050"
            }
          },
          markPoint: {
            data: [{ type: "max", name: "最大值" }]
          }
        },
        {
          name: "费用报销",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          data: [],
          itemStyle: {
            normal: {
              color: "#feb71f"
            }
          },
          markPoint: {
            data: [{ type: "max", name: "最大值" }]
          }
        },
        {
          name: "员工工资",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          data: [],
          itemStyle: {
            normal: {
              color: "#2cc4c6"
            }
          },
          markPoint: {
            data: [{ type: "max", name: "最大值" }]
          }
        },
        {
          name: "教练员工资",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          data: [],
          itemStyle: {
            normal: {
              color: "#00aff0"
            }
          },
          markPoint: {
            data: [{ type: "max", name: "最大值" }]
          }
        }
      ]
    },

    line3: {
      tooltip: {
        trigger: "axis"
      },
      legend: {
        right: "0",
        data: ["本年度","上年度"],
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
      xAxis: [
        {
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
        }
      ],
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
.margin-top {
  margin-top: 20px;
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
  width: 50%;
  height: 150px;
  position: relative;
  float: left;
}

.in-num {
  width: 100%;
  position: absolute;
  text-align: center;
  color: #05a36e;
  top: 66px;
  left: 0;
  line-height: 22px;
  font-size: 14px;
}

.out-num {
  width: 100%;
  position: absolute;
  text-align: center;
  color: #ffa414;
  top: 66px;
  left: 0;
  line-height: 22px;
  font-size: 14px;
}

.inout-num-total {
  font-size: 20px;
}

.yunyingQK-head {
  padding-bottom: 15px;
  color: #fff;
  font-size: 18px;
}

.yunyingQK-nomal {
  color: #00b77a;
}

.yunyingQK-Unnomal {
  color: #f0c102;
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
  position: relative;
}

.margin-bottom {
  margin-bottom: 50px;
}

.yunyingQK-nomal-num {
  float: left;
  padding: 15px 0;
  font-size: 40px;
  color: #13c970;
}

.yunyingQK-Unnomal-num {
  float: left;
  padding: 15px 0;
  font-size: 40px;
  color: #f0c102;
}

.yunyingQK-danwei-nomal {
  font-size: 18px;
}

.yunyingQK-danwei-Unnomal {
  font-size: 18px;
}

.yunyingQK-kemu {
  float: right;
  margin-top: 15px;
  color: #fff;
}
.in-head {
  position: absolute;
  top: 25px;
  left: 28px;
  font-size: 12px;
  color: #fff;
}
.out-head {
  
  top: 25px;
  left: 28px;
  font-size: 12px;
  color: #fff;
}
.in-color {
  color: #00b77a;
}
.out-color {
  color: #ff731f;
}
.icon-fanhui {
  color: #fff;
}
</style>
