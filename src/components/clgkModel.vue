<template>
	<div class="xfjg-mai">
		<div class="xfjg-navs">
			<ul>
				<li class="xfjg-nav" :class="[show==1? 'nav-on':'']" @click="show = 1">下发警告</li>
				<li class="xfjg-nav" :class="[show==2? 'nav-on':'']" @click="show = 2">车内视频</li>
				<li class="xfjg-nav" :class="[show==3? 'nav-on':'']" @click="show = 3">图片抓拍</li>
			</ul>
		</div>

		<div class="xfjg-nav-content">
			<div class="xfjg-nav-cont" v-show="show==1">
				<div class="xfjg-head"><span class="xfjg-head-text">车辆情况</span></div>
				<ul class="xfjg-art">
					<li>车牌号：{{carData.plateNumber}}</li>
					<li v-if="carData.teacher">教练员：{{carData.teacher.name}}</li>
					<li v-else>教练员：未登签</li>
					<template v-if="carData.student">
						<li>学&nbsp;&nbsp;&nbsp;员：{{carData.student.name}}</li>
						<li>报名时间：{{carData.student.applydate}}</li>
						<li>部&nbsp;&nbsp;&nbsp;分：{{carData.subject=='1'?'第一部分':carData.subject=='2'?'第二部分':carData.subject=='3'?'第三部分':carData.subject=='4'?'第四部分':''}}</li>
					</template>
					<li v-else>学&nbsp;&nbsp;&nbsp;员：未登签</li>
					<li v-if="carData.locationInfo">车&nbsp;&nbsp;&nbsp;速：{{carData.locationInfo.sps}}km/h</li>
				</ul>
				<textarea ref="xfjgText" class="xfjg-textarea" placeholder="请输入内容" v-model="xfjgText"></textarea>
				<input class="xfjg-btn" type="button" value="下发警告" @click="onXfjg" />
			</div>

			<div class="xfjg-nav-cont" v-show="show==2">
				<div class="cmsp-sp"><iframe frameborder="0" width="512" height="295" :src="videoSrc"></iframe></div>
			</div>

			<div class="xfjg-nav-cont" v-show="show==3">
				<div class="xfjg-cnsp-head">学员教练信息</div>
				<div class="xfjg-cnsp-content" id="xyjlxx2">
				</div>
				<div class="tpzp-left">
					<img :src="zimg? zimg :'static/images/zp-img2.jpg'" width="100%" />
					<input class="zp-btn" type="button" value="抓   拍" @click="zpz" />
				</div>
				<div class="tpzp-right">
					<img :src="yimg? yimg :'static/images/zp-img2.jpg'" width="100%"/>
					<input class="zp-btn" type="button" value="抓   拍" @click="zpy" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'clgkmodel',
		props: ['carData'],
		data() {
			return {
				show: 1,
				xfjgText: '',
				zimg: '',
				yimg: '',
				videoSrc: '',
			}
		},
		watch: {
			show: function(val, oldval) {
				let that = this;
				if(val == 2) {
					$.get(URL + "/jpms2/video/play/" + that.carData.devnum, function(d) {
						if(d.data.isPush == "1") {
							websocket.send("PlayVideo", that.carData.devnum, {
								pushUrl: d.data.pushUrl
							});
						}
						that.videoSrc = "static/flvLive.html?url=" + d.data.playUrl;
					}, "json");
				}
			}
		},
		methods: {
			onXfjg() {
				if(!this.xfjgText) {
					layer.msg("请输入警告内容！");
					let _text = this.$refs.xfjgText;
					setTimeout(function() {
						_text.focus()
					}, 0);
					return false;
				}
				websocket.send("SendMessage", this.carData.devnum, {
					type: "8",
					message: this.xfjgText
				});
			},
			zpz() {
				let that = this;
				websocket._settings.events["TakePhoto"] = function(d) {
					if(d.param.result != null) {
						if(d.param.result != 1) {
							switch(d.param.result) {
								case 2:
									layer.msg('拍照失败！', {
										shift: 6
									});
									break;
								case 3:
									layer.msg('SD卡故障！', {
										shift: 6
									});
									break;
								case 4:
									layer.msg('正在拍照，不能执行！', {
										shift: 6
									});
									break;
								case 5:
									layer.msg('重新连接摄像头，不能保证拍照！', {
										shift: 6
									});
									break;
								case 6:
									layer.msg('正在上传查询照片，不能执行！', {
										shift: 6
									});
									break;
								case 9:
									layer.msg("拍照指令：其他错误。");
									break;
							}
						}
					}
					if(d.param.picData != null) {
						that.zimg = "data:image/jpeg;base64," + d.param.picData
					}
				}
				websocket.send("TakePhoto", that.carData.devnum, {
					uploadType: "1",
					channel: "1",
					picSize: "1"
				});
			},
			zpy() {
				let that = this;
				websocket._settings.events["TakePhoto"] = function(d) {
					if(d.param.result != null) {
						if(d.param.result != 1) {
							switch(d.param.result) {
								case 2:
									parent.layer.msg('拍照失败！', {
										shift: 6
									});
									break;
								case 3:
									parent.layer.msg('SD卡故障！', {
										shift: 6
									});
									break;
								case 4:
									parent.layer.msg('正在拍照，不能执行！', {
										shift: 6
									});
									break;
								case 5:
									parent.layer.msg('重新连接摄像头，不能保证拍照！', {
										shift: 6
									});
									break;
								case 6:
									parent.layer.msg('正在上传查询照片，不能执行！', {
										shift: 6
									});
									break;
								case 9:
									layer.msg("拍照指令：其他错误。");
									break;
							}
						}
					}
					if(d.param.picData != null) {
						that.yimg = "data:image/jpeg;base64," + d.param.picData
					}
				}
				websocket.send("TakePhoto", that.carData.devnum, {
					uploadType: "1",
					channel: "2",
					picSize: "1"
				});
			},
		}
	}
</script>

<style scoped>
	.xfjg-mai {
		width: 100%;
	}
	
	.xfjg-navs {
		width: 100%;
		float: left;
		border-bottom: 1px solid #c9c9c9;
	}
	
	.xfjg-navs li {
		padding: 0 10px;
		margin: 0 25px;
		height: 60px;
		line-height: 60px;
		float: left;
		cursor: pointer;
		font-size: 16px;
	}
	
	.nav-on {
		font-weight: bold;
		color: #2c4b6d;
	}
	
	.xfjg-nav-content {
		width: 96%;
		padding: 2%;
		float: left;
	}
	
	.xfjg-nav-cont {
		width: 100%;
		position: relative;
	}
	
	.xfjg-textarea {
		width: 98%;
		height: 120px;
		line-height: 30px;
		margin-top: 10px;
		padding: 1%;
		background: #f3f3f3;
		box-shadow: -1px -1px 2px #c9c9c9;
		border: 0;
	}
	
	.xfjg-btn {
		width: 200px;
		height: 40px;
		margin: 40px auto;
		line-height: 40px;
		background: #2c4b6d;
		color: #fff;
		border: 0;
		border-radius: 3px;
		text-align: center;
		cursor: pointer;
		display: block;
	}
	
	.xfjg-head {
		width: 100%;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #91a0af;
	}
	
	.xfjg-head-text {
		padding: 0 30px;
		height: 40px;
		background: #2c4b6d;
		color: #fff;
		font-size: 16px;
		float: left;
		border-radius: 3px 3px 0 0;
	}
	
	.xfjg-art {
		width: 100%;
		float: left;
		padding: 20px 0;
	}
	
	.xfjg-art li {
		width: 33.3333333%;
		float: left;
		padding: 10px 0;
	}
	
	.xfjg-cnsp-content {
		width: 94%;
		float: left;
		padding: 20px 3%;
		border: 1px solid #caced3;
	}
	
	.xfjg-cnsp-head {
		height: 40px;
		line-height: 40px;
		padding: 0 30px;
		background: #2c4b6d;
		float: left;
		color: #fff;
		border-radius: 3px 3px 0 0;
	}
	
	.xfjg-cnsp-cont {
		width: 330px;
		float: left;
		margin-left: 5%;
	}
	
	.xfjg-cnsp-cont2 {
		width: 330px;
		float: right;
		margin-right: 5%;
	}
	
	.xfjg-cnsp-cont-img {
		width: 97px;
		height: 136px;
		float: left;
	}
	
	.tpzp-left {
		width: 34%;
		float: left;
		margin-left: 8%;
		margin-top: 30px;
	}
	
	.tpzp-right {
		width: 34%;
		float: right;
		margin-right: 8%;
		margin-top: 30px;
	}
	
	.zp-btn {
		width: 60%;
		height: 40px;
		margin: 30px 0 0 20%;
		background: #2c4b6d;
		color: #fff;
		border-radius: 3px !important;
		border: 0;
		cursor: pointer;
	}
	
	.cmsp-sp {
		position: relative;
		top: 30px;
		left: 50%;
		margin-left: -256px;
		float: left;
	}
</style>