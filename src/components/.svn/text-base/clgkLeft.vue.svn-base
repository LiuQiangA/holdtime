<template>
	<div>
		<div class="ctr-list-btn" :class="{on: show}" @click="show = !show">
			<ul>
				<li class="ctr-list-text">车辆列表</li>
			</ul>
		</div>
		<div class="ctr-list" :class="{on: show}">
			<div class="ctr-list-head">
				<input class="ctr-list-seach" placeholder="请输入车牌号码" v-model="seachText" />
			</div>
			<div class="ctr-list-tab">
				<ul>
					<li class="list-zt1" @click="selectType(1)"><img src="static/images/list-zt1.jpg"></li>
					<li class="list-zt1" @click="selectType(2)"><img src="static/images/list-zt2.jpg"></li>
					<li class="list-zt1" @click="selectType(3)"><img src="static/images/list-zt3.jpg"></li>
					<li class="list-zt1" @click="selectType(4)"><img src="static/images/list-zt4.jpg"></li>
				</ul>
			</div>
			<div class="ctr-list-content">
				<div class="ctr-list-cont" v-for="car in seachData" @click="goCar(car)">
					<ul>
						<li :class="['ctr-list-cont-car'+car.carStatus]"></li>
						<li class="ctr-list-cont-ms">{{car.plateNumber||''}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "clgkleft",
		data() {
			return {
				show: false,
				seachText: '', //搜索框文本
				seachType: 0 //搜索类型
			}
		},
		props: ['carList'],
		computed: {
			seachData: function() {
				var _t = this.seachType,
					_v = this.seachText;
				if(_t > 0 && _v == "") {
					return this.carList.filter(function(car) {
						return car.carStatus == _t;
					});
				} else {
					this.seachType = 0;
					return _v != "" ? this.carList.filter(function(car) {
						return car.plateNumber.indexOf(_v) != -1;
					}) : this.carList;
				}
			}
		},
		methods: {
			selectType: function(type) {
				this.seachType = type;
			},
			goCar: function(car) {
				this.$emit('moveToCar', car);
			}
		}
	}
</script>

<style scoped>
	.ctr-list-btn {
		width: 40px;
		height: 140px;
		background: #2C4B6D;
		border-radius: 0 10px 10px 0;
		position: fixed;
		left: 0;
		top: 60%;
		margin-top: -70px;
		cursor: pointer;
		color: #fff;
		transition: all .2s ease-in-out;
		z-index: 1;
	}
	
	.ctr-list-btn.on {
		left: 180px;
	}
	
	.ctr-list-text {
		width: 20px;
		height: 80px;
		padding: 30px 10px;
		line-height: normal;
	}
	
	.ctr-list {
		width: 180px;
		height: 90%;
		position: fixed;
		left: -180px;
		bottom: 0;
		z-index: 2;
		transition: all .2s ease-in-out;
		background: #fff;
	}
	
	.ctr-list.on {
		left: 0;
	}
	
	.ctr-list-head {
		width: 90%;
		height: 40px;
		line-height: 40px;
		padding: 5px 5%;
		float: left;
		color: #fff;
		background: #2C4B6D;
	}
	
	.ctr-list-seach {
		width: 90%;
		height: 34px;
		padding: 0 5%;
		margin-top: 3px;
		float: right;
		border: 0;
		border-radius: 3px !important;
	}
	
	.ctr-list-tab {
		width: 100%;
		height: 40px;
		border-bottom: 1px solid #6097c3;
		float: left;
	}
	
	.list-zt1 {
		width: 22px;
		height: 22px;
		margin: 9px 11px;
		line-height: 22px;
		cursor: pointer;
		float: left;
	}
	
	.ctr-list-content {
		bottom: 0;
		overflow-x: hidden;
		overflow-y: auto;
		position: absolute;
		width: 100%;
		float: left;
		top: 91px;
	}
	
	.ctr-list-cont {
		width: 90%;
		float: left;
		padding: 10px 5%;
	}
	
	.ctr-list-cont ul {
		cursor: pointer;
	}
	
	.ctr-list-cont-car1 {
		width: 22px;
		height: 22px;
		float: left;
		margin-left: 15px;
		border-radius: 100%;
		background: url(../../static/images/list-zt1.jpg) no-repeat;
	}
	
	.ctr-list-cont-car2 {
		width: 22px;
		height: 22px;
		float: left;
		margin-left: 15px;
		border-radius: 100%;
		background: url(../../static/images/list-zt2.jpg) no-repeat;
	}
	
	.ctr-list-cont-car3 {
		width: 22px;
		height: 22px;
		float: left;
		margin-left: 15px;
		border-radius: 100%;
		background: url(../../static/images/list-zt3.jpg) no-repeat;
	}
	
	.ctr-list-cont-car4 {
		width: 22px;
		height: 22px;
		float: left;
		margin-left: 15px;
		border-radius: 100%;
		background: url(../../static/images/list-zt4.jpg) no-repeat;
	}
	
	.ctr-list-cont-ms {
		height: 22px;
		line-height: 22px;
		float: left;
		margin-left: 10px;
	}
</style>