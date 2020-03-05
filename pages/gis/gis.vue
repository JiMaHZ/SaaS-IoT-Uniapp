<template>
	<view class="aaa">
		<view class="cardBack">
				<view class="cu-card article isCard shadow markerCard position-bottom-10 animation-slide-bottom cardWidth" 
				data-class="slide-bottom" v-if="!hidden">
					<view class="cu-item shadow">
						<view class="title">
							{{deviceName}}
							&nbsp;
							<view class="cu-tag line-green light sm  margin-left-xs">已激活</view>
						</view>
						<view class="cu-tag bg-blue light sm round align-start margin-left-sm margin-bottom-xs">{{uploadTime?uploadTime:'时间未知'}}</view>
						<view class="content  content_center" v-if="mapType =='垃圾桶'">
							<view class="grid col-4 grid-square text-center">
								<view>
									<image :src="ashbinImg.img01" class="img"></image>
									<view>桶1</view>
								</view>
								<view>
									<image :src="ashbinImg.img02" class="img"></image>
									<view>桶2</view>
								</view>
								<view>
									<image :src="ashbinImg.img03" class="img"></image>
									<view>桶3</view>
								</view>
								<view>
									<image :src="ashbinImg.img04" class="img"></image>
									<view>桶4</view>
								</view>
							</view>
							
						</view>
						<view class="content  content_center" v-if="mapType =='厕所'">
							<view class="grid col-2 grid-square text-center">
								<!-- <view>
									<view>{{keyObj[0].keyName}}</view>
									<view>{{keyObj[0].keyValue}}</view>
								</view>
								<view>
									<view>{{keyObj[0].keyName}}</view>
									<view>{{keyObj[0].keyValue}}</view>
								</view> -->
							</view>
							
						</view>
					</view>
				</view>
				
				<view class="cu-card article isCard shadow markerCard animation-slide-bottom position-right-0"
				data-class="slide-bottom" >
					
					<picker @change="PickerChange" :value="index" :range="mapSelect">
						<button class="cu-btn round sm bg-black shadow margin-sm">
						<!-- <view class="round sm bg-black shadow margin-sm"> -->
							<!-- {{index>-1?mapSelect[index]:'123'}} -->
							<text class="margin-right-xs">▽</text>
							{{mapType}}
						</button>
					</picker>
				</view>
		</view>
		
		
		<view class="page-body mapBack">
			<view class="page-section page-section-gap">
				<map style="width: 100vw; height: 100vh;" :latitude="latitude" :longitude="longitude" 
				enable-zoom show-location show-compass="true" @markertap="getMarker" :scale="scale"
				@tap="hideInfo" :markers="covers">
					
					<!-- <cover-view class="cardBack radius">
							<cover-view class="cu-card article isCard shadow markerCard animation-slide-bottom" 
							data-class="slide-bottom" > --><!-- v-if="!hidden" -->
								<!-- <cover-view class="cu-item shadow">
									<cover-view class="title">
										{{deviceName}}
										&nbsp;
										<cover-view class="cu-tag line-green light sm  margin-left-xs">已激活</cover-view>
									</cover-view>
									<cover-view class="cu-tag bg-blue light sm round align-start margin-left-sm margin-bottom-xs">{{uploadTime?uploadTime:'时间未知'}}</cover-view>
									<cover-view class="content  content_center">
										<cover-view class="grid col-4 grid-square text-center">
											<cover-view>
												<cover-image :src="ashbinImg.img01" class="img"></cover-image>
												<cover-view class="ashbinName">桶1</cover-view>
											</cover-view>
											<cover-view>
												<cover-image :src="ashbinImg.img02" class="img"></cover-image>
												<cover-view>桶2</cover-view>
											</cover-view>
											<cover-view>
												<cover-image :src="ashbinImg.img03" class="img"></cover-image>
												<cover-view>桶3</cover-view>
											</cover-view>
											<cover-view>
												<cover-image :src="ashbinImg.img04" class="img"></cover-image>
												<cover-view>桶4</cover-view>
											</cover-view>
										</cover-view>
										
									</cover-view>
								</cover-view>
							</cover-view>
					</cover-view>
					 -->
				</map>
			</view>
		</view>
		
		
		
		
	</view>
</template>

<script>
	import {Convertor} from '@/utils/map/mapConvert.js'
	export default {
		props:{
			// locationData:Array
		},
		data(){
			return {
				locationData:[],
				hidden: true,
				title: 'map',
				scale: 10,
				latitude: 39.909,
				longitude: 116.39742,
				covers: [],
				
				mapType:'垃圾桶',
				mapSelect:['垃圾桶','厕所'],
				keyObj:[
					{
						keyName:'--',
						keyValue:''
					},
					{
						keyName:'--',
						keyValue:''
					}
				],
				
				animation:'',
				// iconPath: require('../../static/icon_ashbin_blue.png'),
				ashbinImg:{
					img01:require('@/static/ashbin_unknown.png'),  //默认
					img02:require('@/static/ashbin_unknown.png'),
					img03:require('@/static/ashbin_unknown.png'),
					img04:require('@/static/ashbin_unknown.png'),
				},
				imagelist: [
					require('@/static/ashbin_unknown.png'), //未用
					require('@/static/ashbin_notFull.png'), //在用
					require('@/static/ashbin_Full.png'),    //已满
					require('@/static/ashbin_warning.png'),  //单故障
					require('@/static/ashbin_warning.png'),  //总故障
				],
				deviceName:'未知设备',
				deviceStatus:'已激活',
				statusSelect:['异常','未知','已激活','未激活'],
				statusType:'success',
				typeSelect:['warning','info','success','info'],
				uploadTime:'——',
			}
		},
		methods:{
			getMarker: function(e) {
				// let that = this;
				console.log("getMarker")
				console.log(e)
				// let arr = e.markerId.split(',');
				// let markerId = arr[0];
				// if(arr.length>1){
				// 	this.deviceName = arr[1]
				// }else{
				// 	this.deviceName = '未知设备'
				// }
				
				this.hidden = !this.hidden;
				//动画效果 目前无效
				var anmiaton = e.currentTarget.dataset.class;
				this.animation= anmiaton;
				setTimeout(()=>{
					this.animation= '';
				}, 1000)
				
				let token = uni.getStorageSync('storage_key');
				this.hidden = true;
				this.uploadTime = null;
				uni.request({
				    // url: '/api/iot/ashbin/status', //仅为示例，并非真实接口地址。
				    // url: 'https://linkwireless.cn/api/iot/ashbin/status', //仅为示例，并非真实接口地址。
				    url: 'https://linkwireless.cn/api/iot/deviceKey/list', //仅为示例，并非真实接口地址。
				    // url: 'http://localhost:38080/iot/deviceKey/list', //仅为示例，并非真实接口地址。
				    data: {
						deviceId: e.markerId
				    },
				    header: {
				        'Blade-Auth': 'bearer '+ token //自定义请求头信息
				    },
				    success: (res) => {
						console.log(res.data);
						this.hidden = false
						let deviceData = res.data.data;
						this.deviceName = deviceData.deviceName;
						if(deviceData.data.length > 0){
							this.uploadTime = deviceData.data[0].modifyTime;
						}
						if(this.mapType === "垃圾桶"){
							if(deviceData.data.length >0 && ashbinData[0] !== undefined){
								this.ashbinImg.img01 = this.imagelist[deviceData[0].value]
								this.ashbinImg.img02 = this.imagelist[deviceData[1].value]
								this.ashbinImg.img03 = this.imagelist[deviceData[2].value]
								this.ashbinImg.img04 = this.imagelist[deviceData[3].value]
							}else{
								this.ashbinImg.img01 = this.imagelist[0]
								this.ashbinImg.img02 = this.imagelist[0]
								this.ashbinImg.img03 = this.imagelist[0]
								this.ashbinImg.img04 = this.imagelist[0]
							}
						}else{
							// if(deviceData.le)厕所
						}
						
				    }
				});
				

			},
			hideInfo:function(){
				// console.log("1243")
			},
			PickerChange(e){
				this.index = e.detail.value
				// console.log(this.index)
				this.mapType = this.mapSelect[this.index]
				this.hidden = true;
				this.getLocationList(this.mapType)			
			},
			loadMapMarker(locationData){
				// console.log("====")
				// console.log(this.locationData)
				// console.log("====")
				this.latitude = locationData[0].lat;
				this.longitude = locationData[0].lng;
				
				let c=new Convertor();
				this.covers = []
				locationData.forEach(element=>{
					console.log(element)
					let str={
						// lng:120.07031391,
						// lng:120.12832446341031,
						lng:parseFloat(element.lng)||120.12832446341031,
						// lat:30.15856606
						// lat:30.26824270617709
						lat:parseFloat(element.lat)||30.26824270617709
					}
					// console.log(str)
					
					var r1=c.WGS2GCJ(str);
					
					let marker={
						id:element.deviceId,
						// title:'********',
						// label:{
						// 	content:'********',
						// },
						latitude: r1.lat,
						longitude: r1.lng,
						// iconPath: require('../../static/icon_ashbin_blue.png'),
						iconPath: '/static/icon_ashbin_blue.png',
						// iconPath: this.iconPath,
						// left:15,
						// top:15,
						width:55.7,
						height:50,
						anchor:{x: .5, y: 0.9}
					}
					this.covers.push(marker)
					// console.log(this.covers)
				})
			},
			getLocationList(type){
				let token = uni.getStorageSync('storage_key');
				uni.request({
				    // url: '/api/iot/devices/locations/垃圾桶', //仅为示例，并非真实接口地址。
					url: 'https://linkwireless.cn/api/iot/devices/locations/'+type, //仅为示例，并非真实接口地址。
				    data: {
				    },
				    header: {
				        'Blade-Auth': 'bearer '+ token //自定义请求头信息
				    },
				    success: (res) => {
				        console.log(res.data);
				        // this.text = 'request success';
						this.locationData = res.data
						console.log(this.locationData)
						if(this.locationData.length > 0){
							this.loadMapMarker(this.locationData);
						}
				    }
				});
			}
		},
		created() {
			this.getLocationList(this.mapType);
		}
	}
</script>

<style>
page {
    height: 100%;
}
/* .aaa {
    position: absolute;
    bottom: 10%;
    width: 100%;
} */
.img{
	width: 150rpx;
	height: 100rpx;
}
.title{
	line-height: 40px !important;
	margin-left: 20rpx;
}
.content_center{
	flex-direction: column;
	align-items: center;
	text-align: center;
}

.mapBack{
	position: fixed;
	z-index: 1;
	/* top: 20rpx; */
}
/* .cardBack{
	position: relative;
	z-index: 999;
	height: 100%;
} */
/* .markerCard{
	position: absolute;
	border-radius:5px;
	z-index: 999;
	bottom: 16%;
	left:10%;
	background-color: #FFFFFF;
	height: 300rpx;
} */
.markerCard{
	position: absolute;
	/* border-radius:5px; */
	z-index: 999;
	/* bottom: 10%; */
	/* left:10%; */
	/* background-color: #FFFFFF; */
	/* height: 300rpx; */
}

.cardWidth{
	width: 100%;
}

.position-bottom-10{
	bottom: 10%;
}

.position-right-0{
	top:1%;
	right: 0%;
}

.ashbinName{
	height: 60rpx;
}
</style>
