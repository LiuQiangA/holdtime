<template>
    <div class="peixun">
        <div class="bigData-head"><a href="javascript:history.go(-1)"><i class="icon iconfont icon-fanhui"></i></a>招生情况</div>
        <div class="message-cont">
            <!--top-->
            <div class="zhaosheng-cont">
                <div class="zhaosheng-top-left">
                    <p class="zhaosheng-month-num">{{applyNum}}</p>
                    本月招生
                </div>
                <ul class="zhaosheng-top-center">
                    <li>本地：
                        <span class="zhaosheng-top-C1">{{localNum}}</span>
                    </li>
                    <li>男：
                        <span class="zhaosheng-top-C1">{{maleNum}}</span>
                    </li>
                    <li>外地：
                        <span class="zhaosheng-top-C2">{{nonlocalNum}}</span>
                    </li>
                    <li>女：
                        <span class="zhaosheng-top-C2">{{womanNum}}</span>
                    </li>
                </ul>
                <div class="zhaosheng-top-right">
                    <IEcharts :option="pie"></IEcharts>
                </div>
            </div>
            <!--本年度与上一年度招生对比分析-->
            <div class="peixun-cont">
                <p class="peixun-title">
                    <i class="icon iconfont icon-analysis1"></i>本年度与上一年度招生对比分析</p>
                <div class="qingkuangFX">
                    <div class="month-echart">
                        <IEcharts :option="line"></IEcharts>
                    </div>
                </div>
            </div>
            <!--招生占全市比重-->
            <div class="peixun-cont">
                <p class="peixun-title">
                    <i class="icon iconfont icon-juminfenxi"></i>招生占全市比重
                    <span class="getTime">【数据采集时间{{caijiD}}】</span>
                </p>
                <div class="peixun-cont">
                    <div class="monthZB-echart">
                        <IEcharts :option="monthZB"></IEcharts>
                        <div class="monthZB-cont">
                            <p class="monthZB-num">{{monthApplyNum}}</p>
                            <p>本月全市招生</p>
                        </div>
                        <p class="bottom-tongji margin-bottom">本月本校招生{{companyMonthApplyNum}}人 <br>占全市{{monthPercent}}</p>
                    </div>
                    <div class="monthZB-echart">
                        <IEcharts :option="yearZB"></IEcharts>
                        <div class="monthZB-cont">
                            <p class="monthZB-num">{{yearApplyNum}}</p>
                            <p>本年全市招生</p>
                        </div>
                        <p class="bottom-tongji margin-bottom">本年本校招生{{companyYearApplyNum}}人 <br>占全市{{yearPercent}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IEcharts from "vue-echarts-v3";

var labelData = [];
var serill = ["70后", "80后", "90后"];
for (var i = 0; i < 3; ++i) {
  labelData.push({
    value: 1,
    name: serill[i]
  });
}
export default {
  name: "zhaosheng",
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
    var month = da.getMonth()+1;
    var date = da.getDate();
    this.caijiD = [year,month,date].join('-');

    this.getMonthZS(); //获取驾校本月招生情况接口
    this.getYearData(); //获取驾校本年度上年度招生信息接口
    this.getPercent(); //获取驾校招生占比数据接口，
  },
  methods: {
    //获取驾校本月招生情况接口
    getMonthZS() {
      var _this = this;
      this.$http
        .get(
          URL+"/company/getMonthApplyData/" +
            appDB.get("companyInfo").companyId,{
              headers: {'Authorization': appDB.get("companyInfo").token}
            }
        )
        .then(response => {
          var d = response.data.record;
          _this.applyNum = d.applyNum;
          _this.localNum = d.localNum;
          _this.nonlocalNum = d.nonlocalNum;
          _this.maleNum = d.maleNum;
          _this.womanNum = d.womanNum;
          _this.pie.series[1].data[0].value = d.year70sNum;
          _this.pie.series[1].data[1].value = d.year80sNum;
          _this.pie.series[1].data[2].value = d.year90sNum;
          _this.pie.series[2].data[0].value = d.year70sNum;
          _this.pie.series[2].data[1].value = d.year80sNum;
          _this.pie.series[2].data[2].value = d.year90sNum;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },

    //获取驾校本年度上年度招生信息接口
    getYearData() {
      var _this = this;
      this.$http
        .get(
          URL+"/company/getCurrentLastYearApplyData/" +
            appDB.get("companyInfo").companyId,{
              headers: {'Authorization': appDB.get("companyInfo").token}
            }
        )
        .then(response => {
          var d = response.data.record;
          //截取返回数据只获取月份和
          var xAxisData1 = [],
            seriesData1 = [],
            xAxisData2 = [],
            seriesData2 = [];
          $.each(d.crrentApply, function(i, o) {
            var n = Number(o.APPLYDATE.split("-")[1]) + "月",
              v = o.APPLY_CNT;
            xAxisData1.push(n); //横轴月份
            seriesData1.push(v); //纵轴数值
          });
          $.each(d.lastApply, function(i, o) {
            var n = Number(o.APPLYDATE.split("-")[1]) + "月",
              v = o.APPLY_CNT;
            xAxisData2.push(n); //横轴月份
            seriesData2.push(v); //纵轴数值
          });
          //渲染图表
          _this.line.xAxis.data = xAxisData1;
          _this.line.series[0].data = seriesData1;
          _this.line.xAxis.data = xAxisData2;
          _this.line.series[1].data = seriesData2;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },

    //获取驾校招生占比数据接口
    getPercent() {
      var _this = this;
      this.$http
        .get(
          URL+"/company/getApplyOccupiedPercent/" +
            appDB.get("companyInfo").companyId,{
              headers: {'Authorization': appDB.get("companyInfo").token}
            }
        )
        .then(response => {
          var d = response.data.record;
          _this.companyMonthApplyNum = d.companyMonthApplyNum; //驾校月报名人数
          _this.monthApplyNum = d.monthApplyNum; //全市月报名人数
          _this.companyYearApplyNum = d.companyYearApplyNum; //驾校年报名人数
          _this.yearApplyNum = d.yearApplyNum; //全市年报名人数
          _this.monthPercent = d.monthPercent; //	月占比
          _this.yearPercent = d.yearPercent; //	年占比
          _this.monthZB.series.data[0].value = d.companyMonthApplyNum; //驾校月报名人数
          _this.monthZB.series.data[1].value = d.monthApplyNum - d.companyMonthApplyNum; //全市月报名人数
          _this.yearZB.series.data[0].value = d.companyYearApplyNum; //驾校年报名人数
          _this.yearZB.series.data[1].value = d.yearApplyNum - d.companyYearApplyNum; //全市年报名人数
        });
    }
  },
  data: () => ({
    applyNum: "",
    localNum: "",
    nonlocalNum: "",
    maleNum: "",
    womanNum: "",
    year70sNum: "",
    year80sNum: "",
    year90sNum: "",
    companyMonthApplyNum: "",
    monthApplyNum: "",
    monthPercent: "",
    companyYearApplyNum: "",
    yearApplyNum: "",
    yearPercent: "",
    caijiD: "",
    line: {
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
        data: ["本年度", "上一年度"],
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
        data: [],
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
            width: 3,
            type: "solid"
          }
        }
      },
      yAxis: [
        {
          // interval: 10,
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
          name: "上一年度",
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
    },
    pie: {
      tooltip: {
        trigger: "item",
        formatter: "{b}{c}人:({d}%)"
      },
      color: ["#ffb425", "#00b77a", "#ff6825"],
      series: [
        {
          tooltip: {
            show: false
          },
          type: "pie",
          startAngle: 135,
          radius: ["15%", "20%"],
          center: ['53%', '51%'],
          color: ["#fff"],
          data: [
            {
              value: 1050,
              name: "内径"
            }
          ],
          label: {
            normal: {
              show: false
            }
          },
          hoverAnimation: false
        },
        {
          type: "pie",
          startAngle: 135,
          data: [
            {
              value: 0,
              name: "70后"
            },
            {
              value: 0,
              name: "80后"
            },
            {
              value: 890,
              name: "90后"
            }
          ],
          radius: ["20%", "55%"],
          center: ['53%', '51%'],
          labelLine: {
            normal: {
              show: true
            }
          },
          label: {
            normal: {
              show: true,
              position: "inside",
              formatter: "{d}%",
              color: "#fff",
              fontSize: 12
            }
          },
          hoverAnimation: false
        },
        {
          type: "pie",
          startAngle: 135,
          data: labelData,
          radius: ["37%", "37%"],
          center: ['53%', '51%'],
          zlevel: 1,
          labelLine: {
            normal: {
              show: true
            }
          },
          label: {
            normal: {
              show: true,
              color: "#fff",
              fontSize: 12
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          hoverAnimation: false
        }
      ]
    },
    monthZB: {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: {
        name: "本月本校招生",
        type: "pie",
        // startAngle: 175,
        radius: ["52%", "74%"],
        label: {
          normal: {
            position: "center"
          }
        },
        data: [
          {
            value: 0,
            name: "本月本校招生",
            label: {
              normal: {
                formatter: "{d} %",
                textStyle: {
                  fontSize: 14
                },
                position: "outside",
                color: "#fff"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: "#00b77a"
              },
              emphasis: {
                color: "#00b77a"
              }
            }
          },
          {
            value: 0,
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: "#fff"
              }
            },
            hoverAnimation: false
          }
        ]
      }
    },
    yearZB: {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: {
        name: "本年本校招生",
        type: "pie",
        // startAngle: 175,
        radius: ["52%", "74%"],
        label: {
          normal: {
            position: "center"
          }
        },
        data: [
          {
            value: 0,
            name: "本年本校招生",
            label: {
              normal: {
                formatter: "{d} %",
                textStyle: {
                  fontSize: 14
                },
                position: "outside",
                color: "#fff"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: "#00b77a"
              },
              emphasis: {
                color: "#00b77a"
              }
            }
          },
          {
            value: 0,
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: "#fff"
              }
            },
            hoverAnimation: false
          }
        ]
      }
    }
  })
};
</script>

<style scoped>
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

.qingkuangFX {
  width: 100%;
  float: left;
  background: #2d4257;
  box-shadow: 1px 1px 3px #102337;
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

.getTime {
  float: right;
  font-size: 16px;
}

.zhaosheng-cont {
  width: 96%;
  padding: 20px 2%;
  float: left;
  box-shadow: 1px 1px 3px #102337;
  margin-top: 30px;
}

.zhaosheng-top-left {
  width: 24%;
  float: left;
  color: #fff;
  text-align: center;
  padding: 25px 0;
  background: url(../../static/images/zhaosheng-top-bg.png) no-repeat center;
  background-size: 100% 100%;
  margin-top: 30px;
}

.zhaosheng-month-num {
  height: 40px;
  font-size: 40px;
  color: #10c66e;
  margin-bottom: 10px;
}

.zhaosheng-top-center {
  width: 40%;
  float: left;
  margin-top: 30px;
}

.zhaosheng-top-center li {
  width: 50%;
  float: left;
  padding: 21px 0;
  text-align: center;
  color: #fff;
  font-size: 18px;
}

.zhaosheng-top-C1 {
  color: #ffb618;
  font-size: 20px;
}

.zhaosheng-top-C2 {
  color: #10c66e;
  font-size: 20px;
}

.zhaosheng-top-right {
  width: 36%;
  height: 186px;
  float: left;
}

.monthZB-echart {
  width: 50%;
  height: 200px;
  float: left;
  position: relative;
}

.bottom-tongji {
  width: 100%;
  text-align: center;
  color: #fff;
  line-height: 25px;
  float: left;
}

.monthZB-cont {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 50%;
  left: 50%;
  background: url(../../static/images/monthBZ.png) no-repeat center;
  background-size: 100% 100%;
  text-align: center;
  color: #fff;
  font-size: 12px;
  margin-top: -80px;
  margin-left: -80px;
}

.monthZB-num {
  font-size: 28px;
  padding: 5px 0;
  margin-top: 50px;
}
.icon-fanhui{
    color: #fff;
}
</style>


