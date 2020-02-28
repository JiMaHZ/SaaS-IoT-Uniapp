<template>
	<view class="aaa">
		<view class="cardBack">
				<view class="cu-card article isCard shadow markerCard animation-slide-bottom" 
				data-class="slide-bottom" v-if="!hidden">
					<view class="cu-item shadow">
						<view class="title">
							{{deviceName}}
							&nbsp;
							<view class="cu-tag line-green light sm  margin-left-xs">已激活</view>
						</view>
						<view class="cu-tag bg-blue light sm round align-start margin-left-sm margin-bottom-xs">{{uploadTime?uploadTime:'时间未知'}}</view>
						<view class="content  content_center">
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
					</view>
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
			locationData:Array
		},
		data(){
			return {
				hidden: true,
				title: 'map',
				scale: 10,
				latitude: 39.909,
				longitude: 116.39742,
				covers: [],
				
				animation:'',
				iconPath: require('../../static/icon_ashbin_blue.png'),
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
				uni.request({
				    // url: '/api/iot/ashbin/status', //仅为示例，并非真实接口地址。
				    url: 'https://linkwireless.cn/api/iot/ashbin/status', //仅为示例，并非真实接口地址。
				    data: {
						deviceId: e.detail.markerId
				    },
				    header: {
				        'Blade-Auth': 'bearer '+ token //自定义请求头信息
				    },
				    success: (res) => {
						this.hidden = false
						let ashbinData = res.data.data;
						if(ashbinData.ashbinStatus instanceof Object && ashbinData.ashbinStatus['1'] !== undefined){
							this.ashbinImg.img01 = this.imagelist[ashbinData.ashbinStatus['1']]
							this.ashbinImg.img02 = this.imagelist[ashbinData.ashbinStatus['2']]
							this.ashbinImg.img03 = this.imagelist[ashbinData.ashbinStatus['3']]
							this.ashbinImg.img04 = this.imagelist[ashbinData.ashbinStatus['4']]
						}else{
							this.ashbinImg.img01 = this.imagelist[0]
							this.ashbinImg.img02 = this.imagelist[0]
							this.ashbinImg.img03 = this.imagelist[0]
							this.ashbinImg.img04 = this.imagelist[0]
						}
						console.log(res.data);
						this.deviceName = ashbinData.deviceName;
						this.uploadTime = ashbinData.lastUpdateTime;
				    }
				});
				// uni.$on('deviceData',function(data){
				//         console.log('监听到事件来自 update ，携带参数 msg 为：' + data);
				//     })
				// console.log(this.locationData)
				

			},
			hideInfo:function(){
				// console.log("1243")
			}
		},
		created() {
			console.log(this.locationData)
			this.latitude = this.locationData[0].lat;
			this.longitude = this.locationData[0].lng;
			
			let c=new Convertor();
			this.covers = []
			this.locationData.forEach(element=>{
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
	top: 20rpx;
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
	bottom: 10%;
	/* left:10%; */
	/* background-color: #FFFFFF; */
	/* height: 300rpx; */
}
.ashbinName{
	height: 60rpx;
}
</style>
