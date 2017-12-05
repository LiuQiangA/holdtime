<template>
	<div>
		<!--右侧 教学情况-->
		<div class="jxqk-btn" v-show="!show" @click="show = !show">教学情况</div>
		<div class="jxqk" :class="{on: show}">
			<div class="jxpk-head">
				<span class="jxpk-span">教学情况</span>
				<ul class="jxpk-zt">
					<li class="jxpk-zt1">{{car1}}</li>
					<li class="jxpk-zt2">{{car2}}</li>
					<li class="jxpk-zt3">{{car3}}</li>
					<li class="jxpk-zt4">{{car4}}</li>
				</ul>
				<span class="jxpk-back" @click="show = !show"><img src="../../static/images/back2.png"></span>
			</div>
			<div class="jxpk-table-head">
				<ul>
					<li class="jxpk-text1">车牌号</li>
					<li class="jxpk-text2">状态</li>
					<li class="jxpk-text3">教练员</li>
					<li class="jxpk-text4">学员</li>
					<li class="jxpk-text5">部分</li>
					<li class="jxpk-text6">已学时间</li>
					<li class="jxpk-text7">剩余时间</li>
					<li class="jxpk-text8">车速</li>
				</ul>
			</div>
			<div class="jxpk-content">
				<table class="jxpk-table">
					<tr class="jxpk-table-tr" v-for="car in carList" v-if="car.carStatus == 1" @click="goCar(car)">
						<td class="jxpk-text1">{{car.plateNumber||''}}</td>
						<td class="jxpk-text2 jxpk-jx">教学</td>
						<td class="jxpk-text3">{{car.teacher.name||''}}</td>
						<td class="jxpk-text4">{{car.student.name||''}}</td>
						<td class="jxpk-text5">{{car.subject=='1'?'第一部分':car.subject=='2'?'第二部分':car.subject=='3'?'第三部分':car.subject=='4'?'第四部分':''}}</td>
						<td class="jxpk-text6">{{car.learnedTime}}分钟</td>
						<td class="jxpk-text7">{{car.driverTime}}分钟</td>
						<td class="jxpk-text8">{{car.locationInfo && car.locationInfo.length > 0 && car.locationInfo[car.locationInfo.length-1].sps? car.locationInfo[car.locationInfo.length-1].sps:0}}km/h</td>
					</tr>
				</table>
			</div>
		</div>
		<!--右侧 教学情况 end-->
	</div>
</template>

<script>
	export default {
		name: "clgkright",
		props: ['carList'],
		data() {
			return {
				show: false,
			}
		},
		computed: {
			car1() { // 教学状态
				return this.carList.filter(function(car) {
					return '1' == car.carStatus;
				}).length;
			},
			car2() { // 空闲状态
				return this.carList.filter(function(car) {
					return '2' == car.carStatus;
				}).length;
			},
			car3() { // 故障状态
				return this.carList.filter(function(car) {
					return '3' == car.carStatus;
				}).length;
			},
			car4() { // 停运状态
				return this.carList.filter(function(car) {
					return '4' == car.carStatus;
				}).length;
			}
		},
		methods: {
			goCar: function(car) {
				this.$emit('moveToCar', car);
			}
		}
	};
</script>

<style scoped>
	/*教学情况*/
	
	.jxqk {
		width: 70%;
		padding: 15px 20px;
		position: fixed;
		right: -80%;
		top: 50%;
		margin-top: -180px;
		background: #2b3c53;
		transition: all .2s ease-in-out;
		z-index: 1;
	}
	
	.jxqk-btn {
		width: 20px;
		height: 80px;
		padding: 30px 10px;
		background: #2C4B6D;
		border-radius: 10px 0 0 10px;
		position: fixed;
		right: 0;
		top: 60%;
		color: #fff !important;
		cursor: pointer;
		text-align: center;
		line-height: normal;
		z-index: 1;
		margin-top: -70px;
	}
	
	.jxqk.on {
		right: 0;
	}
	
	.jxpk-head {
		width: 100%;
		height: 40px;
		line-height: 40px;
	}
	
	.jxpk-span {
		color: #fff;
		font-size: 24px;
		display: block;
		float: left;
	}
	
	.jxpk-text1 {
		width: 16%;
	}
	
	.jxpk-text2 {
		width: 7%;
	}
	
	.jxpk-text3 {
		width: 10%;
	}
	
	.jxpk-text4 {
		width: 11%;
	}
	
	.jxpk-text5 {
		width: 14%;
	}
	
	.jxpk-text6 {
		width: 13%;
	}
	
	.jxpk-text7 {
		width: 14%;
	}
	
	.jxpk-text8 {
		width: 12%;
	}
	
	.jxpk-zt {
		float: left;
		margin-left: 60px;
	}
	
	.jxpk-zt1 {
		width: 85px;
		height: 30px;
		line-height: 30px;
		padding: 5px 0;
		float: left;
		background: url(../../static/images/jxpk-c1.png) no-repeat;
		background-position: 0 5px;
		text-align: center;
		color: #ed9c00;
		font-size: 20px;
	}
	
	.jxpk-zt2 {
		width: 85px;
		height: 30px;
		line-height: 30px;
		padding: 5px 0;
		float: left;
		background: url(../../static/images/jxpk-c2.png) no-repeat;
		background-position: 0 5px;
		text-align: center;
		color: #ed9c00;
		font-size: 20px;
	}
	
	.jxpk-zt3 {
		width: 85px;
		height: 30px;
		line-height: 30px;
		padding: 5px 0;
		float: left;
		background: url(../../static/images/jxpk-c3.png) no-repeat;
		background-position: 0 5px;
		text-align: center;
		color: #ed9c00;
		font-size: 20px;
	}
	
	.jxpk-zt4 {
		width: 85px;
		height: 30px;
		line-height: 30px;
		padding: 5px 0;
		float: left;
		background: url(../../static/images/jxpk-c4.png) no-repeat;
		background-position: 0 5px;
		text-align: center;
		color: #ed9c00;
		font-size: 20px;
	}
	
	.jxpk-content {
		width: 100%;
		height: 300px;
		float: left;
		overflow: auto;
	}
	
	.jxpk-back {
		float: right;
		color: #fff;
		font-size: 34px;
		cursor: pointer;
	}
	
	.jxpk-table {
		width: 100%;
		text-align: center;
		color: #fff;
		border: 1px solid #88b9d8;
	}
	
	.jxpk-table-head {
		width: 99.8%;
		float: left;
		border: 1px solid #88b9d8;
		border-bottom: 0;
		/* background: url(../../static/images/table-head-bg.png) repeat; */
		color: #fff;
		font-size: 16px;
		margin-top: 10px;
	}
	
	.jxpk-table-head ul li {
		float: left;
		height: 20px;
		margin: 10px 0;
		border-right: 1px solid #fff;
		text-align: center;
	}
	
	.jxpk-table-head ul li:last-child {
		border: 0;
	}
	
	#jxpk-table-head td:last-child {
		border-right: 0;
	}
	
	.jxpk-table-tr {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #32577e;
		/* background: url(../../static/images/tr-bg.png) repeat-x; */
		background-position: 0 48px;
		white-space: nowrap;
		line-height: 50px;
	}
	
	.jxpk-jx {
		color: #e28900;
	}
</style>