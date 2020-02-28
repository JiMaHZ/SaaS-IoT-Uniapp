<template>
	<view>
		<!-- style="top:40px" -->
		<view class="cu-bar search bg-white fixed" >
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索设备名" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round ">搜索</button>
			</view>
		</view>
		<!-- style="top:90px" -->
		<scroll-view scroll-x class="bg-white nav fixed" scroll-with-animation :scroll-left="scrollLeft" style="top:50px">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @tap="tabSelect" :data-id="index">
				{{item.name}}
			</view>
		</scroll-view>
		
		<!-- <scroll-view scroll-y class="page"> -->
			<view class="cu-list card-menu" style="margin-top:100px">
				<!-- <view -->
					<view class="cu-item  " v-for="(item,index) in listData" :key="index" >
						<!-- <view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view> -->
						<!--menu-avatar  style="justify-content: flex-start;" -->
						<navigator :url="'/pages/home/deviceDetail/deviceDetail?deviceId='+item.deviceId+'&deviceType='+item.deviceType" hover-class="none">
							<view class="flex justify-between align-center padding-lr-xl item">
								<view class="start" >
									<view class="text-grey start">设备:{{item.deviceName}}</view>
									<view class="text-gray text-sm flex">
										<view class="text-cut">
											<text class="cuIcon-infofill text-red  margin-right-xs"></text>
											{{item.deviceId}}
										</view> </view>
								</view>
								<view class="action " >
									<view class="text-grey text-xs">12:00</view>
									<view class="cu-tag round  sm" :class="item.deviceStatus==1?'bg-green':'bg-grey'">{{item.deviceStatus==1?'已激活':'未激活'}}</view>
								</view>
							</view>
						</navigator>	
					</view>
				<!-- </view> -->
			</view>
		<!-- </scroll-view> -->
	</view>
</template>

<script>
	import {bindDeviceId,getMapLocation} from '../../utils/api.js'
	
	export default {
		props: {
		    deviceData: Array  //已弃用
		},
		data() {
			return {
				listData: '',
				TabCur: 0,
				scrollLeft: 0,
				list:[
					{
						name:'垃圾桶',
						id: 1,
					},{
						name:'厕所',
						id: 2,
					}
				],
				
				CustomBar: 20,
				title: 'Hello',
				// list: [{
				// 	deviceName:1,
				// 	deviceId:123
				// },{
				// 	deviceName:2,
				// 	deviceId:123
				// },{
				// 	deviceName:3,
				// 	deviceId:123
				// },{
				// 	deviceName:1,
				// 	deviceId:123
				// },{
				// 	deviceName:2,
				// 	deviceId:123
				// },{
				// 	deviceName:3,
				// 	deviceId:123
				// },],
				deviceData_: '',
				
			}
		},
		computed:{
			datawatch(){
				// uni.$on('deviceData1',(data)=>{
				//         console.log('监听到事件来自 update ，携带参数 msg 为：' + data);
				// 		this.listData = data;
				//     })
				// if(this.listData == null){
				// 	this.listData = this.deviceData
				// }
				console.log("store"+uni.getStorageSync('ashbin'))
				this.listData = uni.getStorageSync('ashbin');
				console.log(this.listData)
				console.log("123:"+this.deviceData)
			}
		},
		onLoad() {
			this.getLocation()
			// uni.$on('deviceData1',(data)=>{
			//         console.log('监听到事件来自 update ，携带参数 msg 为：' + data);
			// 		this.deviceData_ = data;
			//     })
			
			console.log(this.deviceData)
			console.log(this.listData)
			
		},
		mounted(){
			// Vue.nextTick(()=>{
			//   // DOM 更新了
			//   this.tabSelect(e);
			//   this.getLocation()
			// })
			  this.tabSelect(e);
			  this.getLocation()
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				
				uni.$on('deviceData1',(data)=>{
				        console.log('监听到事件来自 update ，携带参数 msg 为：' + data);
						this.deviceData_ = data;
				    })
				console.log(this.deviceData_)
				console.log(e.target.dataset.id)
				let num = e.target.dataset.id
				let token = uni.getStorageSync('storage_key');
				uni.request({
				    // url: '/api/iot/devices/locations/'+this.list[num].name, //
				    url: 'https://linkwireless.cn/api/iot/devices/locations/'+this.list[num].name, //
				    // url: '/api/iot/devices/locations/'+'qqq', //仅为示例，并非真实接口地址。
				    data: {
				    },
				    header: {
				        'Blade-Auth': 'bearer '+ token //自定义请求头信息
				    },
				    success: (res) => {
				        console.log(res.data);
						// this.deviceData = res.data;
						uni.setStorageSync('ashbin',res.data);
						this.listData = res.data;
				        // this.text = 'request success';
										  // uni.$emit('deviceData',res.data)
										  // this.deviceData = res.data
										  // this.locationData = res.data
				    }
				});
				
			},
			getLocation(){
				console.log("请求")
				// getMapLocation().then(res=>{
				// 	console.log(res)
				// })
				// try {
				//     let token = uni.getStorageSync('storage_key')?uni.getStorageSync('storage_key'):' ';
				// 	console.log(token)
				// } catch (e) {
				//     // error
				// 	console.log('校验失败')
				// }
				
				// uni.request({
				//     url: 'http://localhost:38080/iot/devices/locations', //仅为示例，并非真实接口地址。
				//     data: {
				//     },
				//     header: {
				//         'Blade-Auth': 'bearer '+ token //自定义请求头信息
				//     },
				//     success: (res) => {
				//         console.log(res.data);
				//         // this.text = 'request success';
										  
										  
				//     }
				// });
			}
		}
	}
</script>

<style>
	.item{
		height: 70px;
		background-color: #ffffff;
		border-bottom: 0.5px solid #ddd;
	}
</style>
