<template>
	<view>
		<view class="cu-bar bg-white margin-bottom-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-green">设备信息</text>
				<text class="bg-green"></text>
				<!-- last-child选择器-->
			</view>
		</view>
		
		<!-- :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']" -->
		<view class="cu-list menu card-menu margin-top" >
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">设备名：</text>
					<text class="text-grey">{{data0.deviceName}}</text>
				</view>
				<view class="action">
					<view class="cu-tag light" :class="data0.deviceStatus?'line-green':'line-grey'">
						{{data0.deviceStatus?'已激活':'未激活'}}
					</view>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-infofill text-grey"></text>
					<!-- <image src="cuIcon-infofill" class="png" mode="aspectFit"></image> -->
					<text class="text-grey">设备id：</text>
					<text class="text-grey">{{data0.deviceId}}</text>
				</view>
			</view>
			<view class="cu-item" >
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-btn text-olive"></text>
					<text class="text-grey">创建时间：</text>
					<text class="text-grey">{{data0.createTime}}</text>
				</button>
			</view>
		</view>
		
		<scroll-view scroll-x class="bg-white nav text-left margin-top">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in list" :key="index" @tap="tabSelect" :data-id="index">
				{{item.name}}
			</view>
		</scroll-view>
		
		<!-- 垃圾桶数据 -->
		<view class="cu-list menu card-menu margin-top" v-if="TabCur== 0 && type == 'ashbin'">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">数据</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-blue light">{{ashbinData.lastUpdateTime}}</view>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">桶1：</text>
					<text class="text-grey">
					{{ashbinOption.statuslist[ashbinData.ashbinStatus['1']]?
					ashbinOption.statuslist[ashbinData.ashbinStatus['1']]:ashbinOption.statuslist[0]}}
					</text>
				</view>
				<view class="action">
					<image :src="ashbinOption.imagelist[ashbinData.ashbinStatus['1']]?
					ashbinOption.imagelist[ashbinData.ashbinStatus['1']]:ashbinOption.imagelist[0]
					" class="png img" mode="aspectFit"></image>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<!-- <image src="cuIcon-infofill" class="png" mode="aspectFit"></image> -->
					<text class="text-grey">桶2：</text>
					<text class="text-grey">{{ashbinOption.statuslist[ashbinData.ashbinStatus['2']]?
					ashbinOption.statuslist[ashbinData.ashbinStatus['2']]:ashbinOption.statuslist[0]}}
					</text>
				</view>
				<view class="action">
					<image :src="ashbinOption.imagelist[ashbinData.ashbinStatus['2']]?
					ashbinOption.imagelist[ashbinData.ashbinStatus['2']]:ashbinOption.imagelist[0]
					" class="png img" mode="aspectFit"></image>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">桶3：</text>
					<text class="text-grey">{{ashbinOption.statuslist[ashbinData.ashbinStatus['3']]?
					ashbinOption.statuslist[ashbinData.ashbinStatus['3']]:ashbinOption.statuslist[0]}}
					</text>
				</view>
				<view class="action">
					<image :src="ashbinOption.imagelist[ashbinData.ashbinStatus['3']]?
					ashbinOption.imagelist[ashbinData.ashbinStatus['3']]:ashbinOption.imagelist[0]
					" class="png img" mode="aspectFit"></image>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">桶4：</text>
					<text class="text-grey">{{ashbinOption.statuslist[ashbinData.ashbinStatus['4']]?
					ashbinOption.statuslist[ashbinData.ashbinStatus['4']]:ashbinOption.statuslist[0]}}
					</text>
				</view>
				<view class="action">
					<image :src="ashbinOption.imagelist[ashbinData.ashbinStatus['4']]?
					ashbinOption.imagelist[ashbinData.ashbinStatus['4']]:ashbinOption.imagelist[0]
					" class="png img" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu card-menu margin-top" v-if="TabCur== 0 && type == 'toilet'">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">数据</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-blue light">2020-01-20 12:00:00</view>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">日人流量：</text>
					<text class="text-grey">
					0
					</text>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">男厕温度：</text>
					<text class="text-grey">
					0
					</text>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">男厕湿度：</text>
					<text class="text-grey">
					0
					</text>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">女厕温度：</text>
					<text class="text-grey">
					0
					</text>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">女厕湿度：</text>
					<text class="text-grey">
					0
					</text>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">杀菌1运行时间：</text>
					<text class="text-grey">
					0
					</text>
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">杀菌2运行时间：</text>
					<text class="text-grey">
					0
					</text>
				</view>
			</view>
			
			
		</view>
		
		<!-- 地图信息 radius shadow shadow-lg bg-white -->
		<view class="margin mapShadow" v-if="TabCur==1">
			<view class="padding mapShadow bg-white text-center tip" v-if="tipShow">暂无位置信息</view>
			<map style="width: 100%; height: 600rpx;" :latitude="latitude" :longitude="longitude"
			enable-zoom show-location show-compass="true" @markertap="getMarker" :scale="scale"
			 :markers="covers">
			</map>
		</view>
	</view>
</template>

<script>
	import {Convertor} from '@/utils/map/mapConvert.js'
	export default {
		data() {
			return {
				TabCur: 0,
				list:[
					{
						name:'实时数据',
						id: 1,
					},{
						name:'位置信息',
						id: 2,
					}
				],
				type:'ashbin',
				
				//地图
				title: 'map',
				scale: 10,
				latitude: 39.909,
				longitude: 116.39742,
				covers: [],
				tipShow:false,
				
				// deviceId:'——',
				data0:{
					deviceId:'',
					deviceName:'',
					createTime:'——',
					lastUpdateTime:'——',
					deviceStatus:'未激活',
					gatewayAddress:'——',
					collectorAddress:'——'
				},
				ashbinData:{
					ashbinStatus: Object,
					iccid:'——',
					location:{
						lng:'',
						lat:''
					},
					userId:'',
					porigin:'',
					pbranch:Object,
					lastUpdateTime:'',
					createTime:'',
				},
				ashbinOption:{
					ashbinImg2:'',
					statuslist:[
						'未用','未满','已满','单故障','总故障',
					],
					imagelist: [
						require('../../../static/ashbin_unknown.png'), //未用
						require('../../../static/ashbin_notFull.png'), //在用
						require('../../../static/ashbin_Full.png'),    //已满
						require('../../../static/ashbin_warning.png'),  //单故障
						require('../../../static/ashbin_warning.png'),  //总故障
					],
				},
			};
		},
		onLoad(option) {
			// const item = JSON.parse(decodeURIComponent(option.item));
			console.log(option)
			if(option.deviceType == '厕所'){
				this.type='toilet'
			}
			this.data0.deviceId = option.deviceId;
			this.getDeviceDetail();
			// console.log('res'+uni.getStorageSync('storage_key'))
		},
		methods:{
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			
			getMarker: function(e) {
				// let that = this;
				console.log("getMarker")
				console.log(e)
				// this.hidden = !this.hidden;
				// //动画效果 目前无效
				// var anmiaton = e.currentTarget.dataset.class;
				// this.animation= anmiaton;
				// setTimeout(()=>{
				// 	this.animation= '';
				// }, 1000)
			
			},
			
			getDeviceDetail(){
				let token = uni.getStorageSync('storage_key');
				uni.request({
				    // url: '/api/iot/devicestatus/detail', //仅为示例，并非真实接口地址。
				    url: 'https://linkwireless.cn/api/iot/devicestatus/detail', //仅为示例，并非真实接口地址。
				    data: {
						deviceId:this.data0.deviceId
				    },
				    header: {
				        'Blade-Auth': 'bearer '+ token //自定义请求头信息
				    },
				    success: (res) => {
				        console.log(res.data);
						this.data0 = res.data.data
						// this.data0.deviceName = res.data.deviceName
						
				        // this.text = 'request success';
										  // uni.$emit('deviceData',res.data)
										  // this.deviceData = res.data
				    }
				});
				
				uni.request({
				    // url: '/api/iot/ashbin/status', //仅为示例，并非真实接口地址。
				    url: 'https://linkwireless.cn/api/iot/ashbin/status', //仅为示例，并非真实接口地址。
				    data: {
						deviceId:this.data0.deviceId
				    },
				    header: {
				        'Blade-Auth': 'bearer '+ token //自定义请求头信息
				    },
				    success: (res) => {
				        console.log(res.data);
						this.ashbinData = res.data.data
				        // this.text = 'request success';
										  // uni.$emit('deviceData',res.data)
										  // this.deviceData = res.data
						let str={
							// lng:120.07031391,
							// lng:120.12832446341031,
							lng:parseFloat(this.ashbinData.location.lng)||120.12832446341031,
							// lat:30.15856606
							// lat:30.26824270617709
							lat:parseFloat(this.ashbinData.location.lat)||30.26824270617709
						}
						// console.log(str)
						var c=new Convertor();
						var r1=c.WGS2GCJ(str);

						this.latitude = r1.lat
						this.longitude = r1.lng
						
						if(this.ashbinData.location.lng){
							let item = {
								id:this.ashbinData.deviceId,
								latitude: r1.lat,
								longitude: r1.lng,
								// iconPath: require('../../../static/icon_ashbin_blue.png'),
								iconPath: '/static/icon_ashbin_blue.png',
								// left:15,
								// top:-20,
								width:55.7,
								height:50,
								anchor:{x: .5, y: 0.9}
							}
							this.covers = []
							this.covers.push(item)
							console.log(item)
						}else{
							console.log('暂无位置信息')
							this.tipShow = true
						}
						
						
				    }
				});
				
				
				uni.request({
				    // url: '/api/iotPlatform/uploaddata/listByIdAndKey', //仅为示例，并非真实接口地址。
				    url: 'https://linkwireless.cn/api/iotPlatform/uploaddata/listByIdAndKey', //仅为示例，并非真实接口地址。
				    data: {
						deviceId:this.data0.deviceId,
						deviceKey:['0B00','0900']
				    },
				    header: {
				        'Blade-Auth': 'bearer '+ token //自定义请求头信息
				    },
				    success: (res) => {
						console.log(res)
					}
					});
			}
		}
	}
</script>

<style lang="scss">
.img{
	width: 50px;
	height: 50px;
}
.mapShadow{
	box-shadow: 0 2px 12px 0 rgba(0,0,0,.6);
	// box-shadow:0px 0px 10px #000;
}
.tip{
	position: absolute;
	bottom: 25%;
	left: 25%;
	width: 200px;
	z-index: 999;
	// height: 100px;
}
</style>
