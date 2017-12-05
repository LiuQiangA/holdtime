<template>
	<div>
		<button class="back" @click="back">返回</button>
		<el-amap vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :rotate-enable="rotateEnable" :resize-enable="resizeEnable" :expand-zoom-range="expandZoomRange" :zooms="zooms" :events="events">
			<el-amap-marker ref="markers" v-for="marker in markers" :key="marker.extData.id" :position="marker.position" :offset="marker.offset" :content="marker.content" :events="marker.events" :extData="marker.extData" :angle="marker.angle" :visible="marker.visible"></el-amap-marker>
			<el-amap-info-window :position="infowindow.position" :template="infowindow.template" :offset="infowindow.offset" :visible="infowindow.visible" :isCustom="true" closeWhenClickMap="true"></el-amap-info-window>
		</el-amap>
		<clgkLeft :carList="carList" @moveToCar="moveToCar"></clgkLeft>
		<clgkRight :carList="carList"></clgkRight>
		<clgkModel ref="model" v-if="modelData" :carData="modelData"></clgkModel>
		<div class="ctr-head-zt">
			<span><i class="ctr-head-jx"></i>教学</span>
			<span><i class="ctr-head-kx"></i>空闲</span>
			<span><i class="ctr-head-gz"></i>故障</span>
			<span><i class="ctr-head-ty"></i>停运</span>
		</div>
	</div>
</template>
<script>
	import clgkLeft from "@/components/clgkLeft";
	import clgkRight from "@/components/clgkRight";
	import clgkModel from "@/components/clgkModel";
	import VueAMap from 'vue-amap';
	import moment from 'moment';
	import '@/assets/jquery-websocket.js';
	import ComputeTool from '@/assets/compute-tool.js';

	export default {
		props: ['id'],
		name: 'clgk',
		components: {
			clgkLeft,
			clgkRight,
			clgkModel
		},
		data() {
			let _center = [109.840405, 40.658168];
			return {
				amapManager: new VueAMap.AMapManager(),
				zoom: 17,
				center: _center,
				plugin: ['Scale'],
				rotateEnable: true,
				resizeEnable: true,
				expandZoomRange: true,
				zooms: [3, 20],
				events: {
					init: (o) => {
						o.setLayers([new AMap.TileLayer(), new AMap.TileLayer.Satellite()]);

						$.getJSON(URL + '/jpms2/api/clgk/' + appDB.get("companyInfo").companyId + '/region', function(d) {
							if(d.status == "1") {
								let region = d.data.obj;
								if(region.jd && region.wd) {
									o.panTo([region.jd, region.wd]);
									if(region.layerCoordinate) {
										let arr = region.layerCoordinate.split(";");
										o.setZoom(arr[2] - 1);
										let _layers = o.getLayers();
										_layers.push(new AMap.ImageLayer({
											url: region.layerImage.indexOf("http") != -1 ? region.layerImage : "static/jxdt/" + region.layerImage,
											bounds: new AMap.Bounds(arr[0].split(","), arr[1].split(",")),
											zooms: [15, 20]
										}));
										o.setLayers(_layers);
									}
								}
							} else {
								//实例化城市查询类
								let citysearch = new AMap.CitySearch();
								//自动获取用户IP，返回当前城市
								citysearch.getLocalCity(function(status, result) {
									if(status === 'complete' && result.info === 'OK') {
										if(result && result.city && result.bounds) {
											console.debug(result.city);
											//地图显示当前城市
											o.setBounds(result.bounds);
										}
									}
								});
							}
						});
					}
				},
				carList: [], //车辆数据
				markers: {}, //地图描点
				infowindow: {
					position: _center,
					visible: false,
					offset: [10, -30],
					template: ''
				},
				modelData: null
			}
		},
		mounted() {
			let _that = this;
			global.websocket = $.websocket(WEBSOCKET_URL + _that.id, {
				isDebug: true,
				open: function() {
					console.debug('websocket连接成功...');
				},
				close: function() {
					console.debug('websocket连接断开...');
				},
				events: {
					webResult: function(d) {
						if(d.returnCode == 0) {
							layer.msg("指令发送成功！");
						} else {
							layer.msg(d.message, {
								shift: 6
							});
						}
					},
					initCarData: function(d) {
						_that.carList = d.carList;
						_that.carList.forEach(function(car, index) {
							_that.creatMarker(car);
						});
					},
					renderCarData: function(d) {
						_that.carList = d.carList;
						_that.carList.forEach(function(car, index) {
							if(_that.markers[car.devnum]) {
								_that.updateMarker(car);
							} else {
								_that.creatMarker(car);
							}
						});
					}
				}
			});
		},
		computed: {

		},
		methods: {
			back() {
				try {
					window.xiaolu.changeScreenPortrait();
				} catch(e) {}
				this.$router.back();
			},
			creatMarker(car) {
				if(car.locationInfo && car.locationInfo.length > 0) {
					car.locationInfo = car.locationInfo.pop(); //为了减少延迟，首次描点只获取与当前时间最近的点
				}
				let that = this;
				//没有定位信息或者教练员未登签不显示描点
				let _visible = car.locationInfo && car.teacher ? true : false;
				let _position = car.locationInfo ? [car.locationInfo.longitude, car.locationInfo.latitude] : this.center;
				let _angle = car.locationInfo && car.locationInfo.orientation && parseInt(car.locationInfo.orientation) > 0 ? parseInt(car.locationInfo.orientation) : 0;
				this.markers[car.devnum] = {
					position: _position,
					offset: [-12, -12],
					content: '<div class="map-car car' + car.carStatus + '"></div>',
					visible: _visible,
					angle: _angle,
					events: {
						init(m) {

						},
						click() {
							let _carData = this.getExtData().carData;
							that.modelData = _carData;
							that.$nextTick(() => {
								layer.open({
									type: 1,
									title: '',
									shadeClose: true, //点击遮罩关闭层
									skin: 'layui-layer-rim', //加上边框
									area: ['80%', '80%'], //宽高
									content: $(that.$refs.model.$el),
									end: function() {
										let _data = that.modelData;
										$.ajax({
											type: "GET",
											url: URL + "/jpms2/video/stopplay/" + _data.devnum,
											dataType: "json",
											success: function(d) {
												if(d.status == "1") {
													websocket.send("StopVideo", _data.devnum);
												}
											}
										});
										that.modelData = null;
									}
								});
							});
						},
						moveend() {
							let _carData = this.getExtData().carData,
								dataMarker = that.markers[_carData.devnum];
							if(_carData.locationInfo.orientation && parseInt(_carData.locationInfo.orientation) > 0) {
								dataMarker.angle = parseInt(_carData.locationInfo.orientation);
							}
							dataMarker.content = '<div class="map-car car' + _carData.carStatus + '"></div>';
							dataMarker.position = [_carData.locationInfo.longitude, _carData.locationInfo.latitude];
							$(this).dequeue();
						}
					},
					extData: {
						id: car.devnum,
						carData: car
					}
				};
			},
			updateMarker(car) {
				let dataMarker = this.markers[car.devnum],
					vueMarker = this.$refs.markers.filter(m => {
						return car.devnum == m.$$getExtData().id;
					});

				if(car.locationInfo && car.teacher) { // 有位置信息并且教练员登签后才描点
					if(!dataMarker.visible) {
						this.creatMarker(car);
					} else {
						if(vueMarker && vueMarker.length > 0) {
							let mapMarker = vueMarker[0].$$getInstance();

							car.locationInfo.forEach(lo => {
								$(mapMarker).queue(function() {
									let that = this,
										oldData = that.getExtData().carData;
									//判断，如果要描的点的时间在已经描点的时间之前，证明已经描过，跳出执行下一个
									if(moment(lo.uploadTime).isAfter(oldData.locationInfo.uploadTime)) {
										$.extend(dataMarker.extData, {
											'carData': $.extend(true, {}, car, {
												locationInfo: lo
											}),
											'oldData': oldData
										});
										let lnglat = that.getPosition(),
											newLnglat = new AMap.LngLat(lo.longitude, lo.latitude);

										if(!lnglat.equals(newLnglat)) { // 判断位置是否相同
											let jl = ComputeTool.division(lnglat.distance(newLnglat), 1000),
												sj = ComputeTool.division(moment(lo.uploadTime).diff(oldData.locationInfo.uploadTime, 'seconds'), 3600),
												sps = ComputeTool.division(jl, sj);
											that.moveTo(newLnglat, sps);
										} else {
											if(lo.orientation && parseInt(lo.orientation) > 0) {
												dataMarker.angle = parseInt(lo.orientation);
											}
											dataMarker.content = '<div class="map-car car' + car.carStatus + '"></div>';
											$(this).dequeue();
										}
									} else {
										$(this).dequeue();
									}
								});
							});
						}
					}
				} else { // 无位置信息或者教练员签退，隐藏描点
					if(!car.teacher)
						dataMarker.visible = false;
				}
			},
			showinfo(marker) {
				let _window = this.infowindow,
					vueMarker = this.$refs.markers.filter(m => {
						return marker.extData.id == m.$$getExtData().id;
					}),
					mapMarker = vueMarker[0].$$getInstance();
				_window.visible = false;
				_window.position = [mapMarker.getPosition().getLng(), mapMarker.getPosition().getLat()];
				let carData = marker.extData.carData;

				_window.template = `
					<div class="ctr-car-ms">
						<div class="ctr-car-ms-head" v-if="${carData.carStatus == '1'}">剩余教学时间：<span class="ctr-car-time">${carData.driverTime || 0}</span>分钟</div>
						<div class="ctr-car-content">
							<ul>
								<li v-if="${carData.teacher?true:false}">教练员：${carData.teacher?carData.teacher.name:''}</li>
								<li v-if="${carData.student?true:false}">学员：${carData.student?carData.student.name:''}</li>
								<li v-if="${carData.student?true:false}">培训部分：${carData.subject=='1'?'第一部分':carData.subject=='2'?'第二部分':carData.subject=='3'?'第三部分':carData.subject=='4'?'第四部分':''}</li>
								<li>车速：${carData.locationInfo.sps||0}km/h</li>
							</ul>
							<span class="ctr-car-id">【${carData.plateNumber||''}】</span>
						</div>
						<img class="ctr-jt" src="static/images/jt.png" />
					</div>`;

				this.$nextTick(() => {
					_window.visible = true;
				});
			},
			moveToCar(car) {
				let _marker = this.markers[car.devnum];
				if(_marker && _marker.visible) {
					this.amapManager.getMap().panTo(_marker.position);
					this.showinfo(_marker);
				}
				//console.info(JSON.parse(JSON.stringify(car)));
			}
		},
		beforeRouteLeave(to, from, next) {
			websocket.close();
			next();
		}
	}
</script>

<style>
	#amapDemo {
		bottom: 0;
		height: 100%;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
		z-index: -1;
	}
	
	.map-car {
		width: 30px;
		height: 42px;
		background: url(../../static/images/car.png);
	}
	
	.map-car.car1 {
		background-position: -47px -70px;
	}
	
	.map-car.car2 {
		background-position: -72px -70px;
	}
	
	.map-car.car3 {
		background-position: -22px -70px;
	}
	
	.map-car.car4 {
		background-position: -97px -70px;
	}
	
	.ctr-car-ms {
		width: 300px;
		float: left;
		border-radius: 3px;
		border: 1px solid #9bbbd5;
	}
	
	.ctr-car-ms-head {
		width: 100%;
		height: 40px;
		line-height: 40px;
		background: #9bbbd5;
		text-align: center;
		border-radius: 3px 3px 0 0;
	}
	
	.ctr-car-time {
		font-size: 18px;
		color: red;
	}
	
	.ctr-car-content {
		width: 100%;
		float: left;
		background: #fff;
	}
	
	.ctr-car-content li {
		width: 50%;
		padding: 10px 0;
		float: left;
		text-align: center;
		background: #fff;
	}
	
	.ctr-car-id {
		width: 100%;
		height: 30px;
		line-height: 30px;
		display: block;
		padding: 5px 0;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		float: left;
		color: red;
		background: #fff;
		border-radius: 3px;
	}
	
	.ctr-jt {
		height: 21px;
		position: absolute;
		bottom: -15px;
		left: 125px;
	}
	
	.back {
		padding: 6px 10px;
		position: absolute;
		top: 20px;
		right: 30px;
		border: 0;
		background: #00b77a;
		color: #fff;
	}
	
	.ctr-head-zt {
		width: 240px;
		height: 40px;
		background: #fff;
		border-radius: 3px;
		border: 1px solid #dadada;
		position: absolute;
		top: 20px;
		left: 30px;
	}
	
	.ctr-head-zt span {
		width: 24.5%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		float: left;
		border-radius: 3px;
	}
	
	.ctr-head-jx {
		background: url(../../static/images/car.png);
		background-position: -47px -70px;
		display: inline-block;
		height: 40px;
		vertical-align: top;
		width: 30px;
	}
	
	.ctr-head-kx {
		background: url(../../static/images/car.png);
		background-position: -72px -70px;
		display: inline-block;
		height: 40px;
		vertical-align: top;
		width: 30px;
	}
	
	.ctr-head-gz {
		background: url(../../static/images/car.png);
		background-position: -22px -70px;
		display: inline-block;
		height: 40px;
		vertical-align: top;
		width: 30px;
	}
	
	.ctr-head-ty {
		background: url(../../static/images/car.png);
		background-position: -97px -70px;
		display: inline-block;
		height: 40px;
		vertical-align: top;
		width: 30px;
	}
</style>