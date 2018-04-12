<template>
	<div class="peixun">
		<div class="bigData-head">
			<a href="javascript:history.go(-1)"><i class="icon iconfont icon-fanhui"></i></a>教学运营统计分析</div>
		<div class="message-cont">
			<!--教学运营情况-->
			<div class="peixun-cont">
				<p class="peixun-title">
					<i class="icon iconfont icon-jiaoxueyuebao"></i>教学运营情况</p>
				<div class="xueshiT">
					<div class="xueshiT-item">
						<p class="yunyingQK-head">本月加时模拟
							<span class="yunyingQK-nomal">教学学时</span>
						</p>
						<div class="yunyingQK-nomal-num">{{jsmnxs.t1sub2Hours+jsmnxs.t1sub3Hours+jsmnxs.t2sub2Hours+jsmnxs.t2sub3Hours}}
							<span class="yunyingQK-danwei-nomal">小时</span>
						</div>
						<span class="yunyingQK-kemu">科二：加时{{jsmnxs.t1sub2Hours}},模拟{{jsmnxs.t1sub3Hours}}</span>
						<span class="yunyingQK-kemu">科三：加时{{jsmnxs.t1sub3Hours}},模拟{{jsmnxs.t2sub3Hours}}</span>
					</div>
					<div class="xueshiT-item">
						<p class="yunyingQK-head">本月车辆
							<span class="yunyingQK-nomal">教学里程</span>
						</p>
						<div class="yunyingQK-nomal-num">{{jxlc.totalMileage}}
							<span class="yunyingQK-danwei-nomal"> km</span>
						</div>
						<span class="yunyingQK-kemu">科二：{{jxlc.sub2Mileage}}</span>
						<span class="yunyingQK-kemu">科三：{{jxlc.sub3Mileage}}</span>
					</div>
				</div>
				<div class="xueshiT">
					<div class="xueshiT-item">
						<p class="yunyingQK-head">本月车辆
							<span class="yunyingQK-Unnomal">非教学次数</span>
						</p>
						<div class="yunyingQK-Unnomal-num">{{fjxlc.total}}
							<span class="yunyingQK-danwei-Unnomal"> 次</span>
						</div>
						<!--<span class="yunyingQK-kemu">科目二：975次</span>
						<span class="yunyingQK-kemu">科目三：475次</span>-->
					</div>
					<div class="xueshiT-item">
						<p class="yunyingQK-head">本月车辆
							<span class="yunyingQK-Unnomal">非教学里程</span>
						</p>
						<div class="yunyingQK-Unnomal-num">{{parseInt(fjxlc.mileage / 1000)}}
							<span class="yunyingQK-danwei-Unnomal"> km</span>
						</div>
						<!--<span class="yunyingQK-kemu">科目二：975km</span>
						<span class="yunyingQK-kemu">科目三：475km</span>-->
					</div>
				</div>
				<div class="xueshiT">
					<div class="xueshiT-item">
						<p class="yunyingQK-head">本月车辆
							<span class="yunyingQK-Unnomal">未采集次数</span>
						</p>
						<div class="yunyingQK-Unnomal-num">1850
							<span class="yunyingQK-danwei-Unnomal"> 次</span>
						</div>
					</div>
					<div class="xueshiT-item">
						<p class="yunyingQK-head">本月车辆
							<span class="yunyingQK-Unnomal">未采集里程</span>
						</p>
						<div class="yunyingQK-Unnomal-num">1850
							<span class="yunyingQK-danwei-Unnomal"> km</span>
						</div>
					</div>
				</div>
			</div>
			<!--本年度非教学里程分析-->
			<div class="peixun-cont">
				<p class="peixun-title">
					<i class="icon iconfont icon-analysis"></i>本年度非教学里程分析</p>
				<div class="qingkuangFX">
					<div class="month-echart">
						<IEcharts :option="line"></IEcharts>
					</div>
				</div>
			</div>
			<!--本年度未采集里程分析-->
			<div class="peixun-cont">
				<p class="peixun-title">
					<i class="icon iconfont icon-caiji"></i>本年度未采集里程分析</p>
				<div class="qingkuangFX">
					<div class="month-echart">
						<IEcharts :option="line3"></IEcharts>
					</div>
				</div>
			</div>
			<!--本年度与上一年度非教学里程对比分析-->
			<div class="peixun-cont margin-bottom">
				<p class="peixun-title">
					<i class="icon iconfont icon-fenxixian"></i>本年度与上一年度非教学里程对比分析</p>
				<div class="qingkuangFX">
					<div class="month-echart">
						<IEcharts :option="line2"></IEcharts>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import IEcharts from 'vue-echarts-v3';
	export default {
		name: 'yunying',
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

			//本月tab切换
			$(".monthTab").click(function() {
				$(this).addClass("on").siblings().removeClass("on");
			})

			this.$http.get(URL + "/company/getSubjectLessonStatOther/" + appDB.get("companyInfo").companyId, {
              headers: {'Authorization': appDB.get("companyInfo").token}
            })
			.then(response => {
				var d = response.data;
				if (d.resultCode == 0) {
					$.extend(this.jsmnxs, d.record);
				}
			});
			
			this.$http.get(URL + "/company/getSubjectLessonStat/" + appDB.get("companyInfo").companyId, {
              headers: {'Authorization': appDB.get("companyInfo").token}
            })
			.then(response => {
				var d = response.data;
				if (d.resultCode == 0) {
					$.extend(this.jxlc, d.record);
				}
			});
			
			this.$http.get(URL + "/company/getNoTaught/" + appDB.get("companyInfo").companyId, {
              headers: {'Authorization': appDB.get("companyInfo").token}
            })
			.then(response => {
				var d = response.data;
				if (d.resultCode == 0) {
					$.extend(this.fjxlc, d.record);
				}
			});
		},
		data: () => ({
			jsmnxs:{
				t1sub2Hours:0,
				t1sub3Hours:0,
				t2sub2Hours:0,
				t2sub3Hours:0
			},
			jxlc:{
				totalMileage:0,
				sub2Mileage:0,
				sub3Mileage:0
			},
			fjxlc: {
				total: 0,
				mileage: 0
			},
			line: {
				title: {
					text: '2017年度非教学里程分析',
					textStyle: {
						color: '#fff',
						fontWeight: 'nomal',
					},
				},
				tooltip: {
					trigger: 'axis'
				},

				legend: {
					selected: {
						'科二里程': true,
						'科三里程': false,
						'总里程': false,
					},
					right: '0',
					data: ['科二里程', '科三里程', '总里程'],
					textStyle: {
						color: '#fff',
						fontWeight: 'nomal',
					},
				},
				grid: {
					left: '1%',
					right: '3%',
					bottom: '0',
					containLabel: true
				},
				calculable: true,
				xAxis: [{
					type: 'category',
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
					axisLabel: {
						color: '#ffffff'
					},
					axisTick: {
						lineStyle: {
							width: 0,
						}
					},
					axisLine: {
						lineStyle: {
							color: '#00b77a',
							width: 2,
							type: 'solid',
						},
					},
				}],
				yAxis: [{
					axisLabel: {
						color: '#ffffff'
					},
					splitLine: {
						lineStyle: {
							// 使用深浅的间隔色
							color: ['#00b77a'],
							width: 1,
							type: 'solid',
						}
					},
					type: 'value',
					axisTick: {
						lineStyle: {
							width: 0,
						}
					},
					axisLine: {
						lineStyle: {
							color: '#00b77a',
							width: 3,
							type: 'solid',
						}
					},
				}],
				series: [{
						name: '科二里程',
						type: 'line',
						symbol: 'circle',
						symbolSize: 10,
						data: [890, 547, 1897, 5627, 4578, 3327, 1990, 2725, 987, 654, 5604, 3323],
						itemStyle: {
							normal: {
								color: '#00b77a'
							}
						},
						markPoint: {
							data: [{
									type: 'max',
									name: '最大值'
								},

							]
						},
					},
					{
						name: '科三里程',
						type: 'line',
						symbol: 'circle',
						symbolSize: 10,
						data: [658, 347, 2897, 4627, 5578, 327, 3990, 725, 2987, 1654, 604, 323],
						itemStyle: {
							normal: {
								color: '#feb71f'
							}
						},
						markPoint: {
							data: [{
									type: 'max',
									name: '最大值'
								},

							]
						},
					},
					{
						name: '总里程',
						type: 'line',
						symbol: 'circle',
						symbolSize: 10,
						data: [2658, 3347, 2897, 627, 578, 2327, 1990, 2725, 987, 654, 2604, 1323],
						itemStyle: {
							normal: {
								color: '#ff731f'
							}
						},
						markPoint: {
							data: [{
									type: 'max',
									name: '最大值'
								},

							]
						},
					}
				]
			},

			line3: {
				tooltip: {
					trigger: 'axis'
				},

				legend: {
					right: '0',
					data: ['未采集里程'],
					textStyle: {
						color: '#fff',
						fontWeight: 'nomal',
					},
				},
				grid: {
					left: '1%',
					right: '3%',
					bottom: '0',
					containLabel: true
				},
				calculable: true,
				xAxis: [{
					type: 'category',
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
					axisLabel: {
						color: '#ffffff'
					},
					axisTick: {
						lineStyle: {
							width: 0,
						}
					},
					axisLine: {
						lineStyle: {
							color: '#00b77a',
							width: 2,
							type: 'solid',
						},
					},
				}],
				yAxis: [{
					axisLabel: {
						color: '#ffffff'
					},
					splitLine: {
						lineStyle: {
							// 使用深浅的间隔色
							color: ['#00b77a'],
							width: 1,
							type: 'solid',
						}
					},
					type: 'value',
					axisTick: {
						lineStyle: {
							width: 0,
						}
					},
					axisLine: {
						lineStyle: {
							color: '#00b77a',
							width: 3,
							type: 'solid',
						}
					},
				}],
				series: [{
					name: '未采集里程',
					type: 'line',
					symbol: 'circle',
					symbolSize: 10,
					data: [890, 547, 1897, 5627, 4578, 3327, 1990, 2725, 987, 654, 5604, 3323],
					itemStyle: {
						normal: {
							color: '#00b77a'
						}
					},
				}, ]
			},

			line2: {
				tooltip: {
					trigger: 'axis'
				},

				legend: {
					// selected: {
					//     '全部学时': true,
					//     '科一学时': false,
					//     '科二学时': false,
					//     '科三学时': false,
					// },
					right: '0',
					data: ['2017年', '2016年'],
					textStyle: {
						color: '#fff',
						fontWeight: 'nomal',
					},
				},
				grid: {
					left: '1%',
					right: '3%',
					bottom: '0',
					containLabel: true
				},
				calculable: true,
				xAxis: [{
					type: 'category',
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
					axisLabel: {
						color: '#ffffff'
					},
					axisTick: {
						lineStyle: {
							width: 0,
						}
					},
					axisLine: {
						lineStyle: {
							color: '#00b77a',
							width: 2,
							type: 'solid',
						},
					},
				}],
				yAxis: [{
					axisLabel: {
						color: '#ffffff'
					},
					splitLine: {
						lineStyle: {
							// 使用深浅的间隔色
							color: ['#00b77a'],
							width: 1,
							type: 'solid',
						}
					},
					type: 'value',
					axisTick: {
						lineStyle: {
							width: 0,
						}
					},
					axisLine: {
						lineStyle: {
							color: '#00b77a',
							width: 3,
							type: 'solid',
						}
					},
				}],
				series: [{
						name: '2017年',
						type: 'line',
						symbol: 'circle',
						symbolSize: 10,
						data: [890, 547, 1897, 5627, 4578, 3327, 1990, 2725, 987, 654, 5604, 3323],
						itemStyle: {
							normal: {
								color: '#00b77a'
							}
						},
					},
					{
						name: '2016年',
						type: 'line',
						symbol: 'circle',
						symbolSize: 10,
						data: [658, 347, 2897, 4627, 5578, 327, 3990, 725, 2987, 1654, 604, 323],
						itemStyle: {
							normal: {
								color: '#feb71f'
							}
						},
					},
				]
			}
		}),
	}
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
	
	.xueshiT {
		width: 100%;
		float: left;
		display: flex;
		justify-content: space-between;
	}
	
	.xueshiT-item {
		width: 44%;
		padding: 15px 2%;
		float: left;
		border-radius: 5px;
		box-shadow: 1px 1px 3px #102337;
		margin-bottom: 20px;
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
		;
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
	
	.yunyingQK-nomal-num {
		width: 55%;
		float: left;
		padding: 15px 0;
		font-size: 40px;
		color: #13c970;
	}
	
	.yunyingQK-Unnomal-num {
		width: 160px;
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
		width: 45%;
		float: right;
		margin-top: 15px;
		color: #fff;
		font-size: 12px;
		text-align: right;
	}
	
	.icon-fanhui {
		color: #fff;
	}
</style>