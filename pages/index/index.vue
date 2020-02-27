<template>
	<view>
		<!-- <view class="content">
			<image class="logo" src="/static/logo.png"></image>
			<view class="text-area">
				<text class="title">{{title}}</text>
			</view>
		</view> -->
		<home v-if="PageCur=='home'" :deviceData.sync='deviceData'></home>
		<gis v-if="PageCur=='gis'" :locationData.sync='locationData'></gis>
		<user v-if="PageCur=='user'"></user>
		
		<view class="cu-bar tabbar bg-white foot">
			<view class="action" :class="PageCur=='home'?'text-green':'text-gray'" 
			@click="NavChange" data-cur="home">
				<view :class="PageCur=='home'?'cuIcon-homefill':'cuIcon-home'"></view> 
				<view :class="PageCur=='home'?'text-green':'text-gray'"> 首页</view>
			</view>
			<!-- <view class="action text-gray">
				<view class="cuIcon-similar"></view> 分类  
			</view> -->
			<!-- <navigator class="" url="/pages/map/map" hover-class="none"> -->
				<view class="action add-action" :class="PageCur=='gis'?'text-green':'text-gray'" 
				@click="NavChange" data-cur="gis">
					<button class="cu-btn cuIcon-location bg-green shadow"></button>
					<view :class="PageCur=='gis'?'text-green':'text-gray'"> 地图</view>
				</view>
			<!-- </navigator> -->
			<!-- <view class="action text-gray">
				<view class="cuIcon-cart">
					<view class="cu-tag badge">99</view>
				</view>
				购物车
			</view> -->
			<view class="action" :class="PageCur=='user'?'text-green':'text-gray'" 
			@click="NavChange" data-cur="user">
				<view :class="PageCur=='user'?'cuIcon-myfill':'cuIcon-my'">
					<!-- <view class="cu-tag badge"></view> -->
				</view>
				<view :class="PageCur=='user'?'text-green':'text-gray'"> 我的</view>
			</view>
			
			<!-- <view class="action" @click="NavChange" data-cur="plugin">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur == 'plugin'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">扩展</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {bindDeviceId,getMapLocation} from '../../utils/api.js'
	export default {
		data() {
			return {
				CustomBar: 20,
				PageCur: 'home',
				
				deviceData: {
					type:Array
				},
				locationData: {
					type:Array
				},
				
			}
		},
		onLoad() {
			// uni.request({
			//     url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
			//     data: {
			//         text: 'uni.request'
			//     },
			//     header: {
			//         'custom-header': 'hello' //自定义请求头信息
			//     },
			//     success: (res) => {
			//         console.log(res.data);
			//         this.text = 'request success';
			//     }
			// });
			
			// this.$http.post('/blade-auth/token?tenantId=000000&account=test&password=123456&type=accoun')
			// .then(res=>{
			// 	console.log(res)
			// }).catch(error=>{
			// 	console.log(error)
			// })
			this.getToken();
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
			getToken(){
				// this.$http
				// .post('/blade-auth/token',{},{
				//      params: { // 会拼接到url上
				//         tenantId: '000000',
				//         account: 'test',
				//         password:'123456',
				//         type:'account'
				//      }})
				// .then(res => {
				//   console.log(res)
				//   // console.log(res.data.data.accessToken)
				//   try {
				//       uni.setStorageSync('storage_key',res.data.data.accessToken);
				// 	  uni.$emit('token',res.data.data.accessToken)
					  
				// 	  console.log('res'+uni.getStorageSync('storage_key'))
				//   } catch (e) {
				//       // error
				// 	  console.log('获取失败')
				//   }
				//   //待解决
				//   // getMapLocation(res.data.data.accessToken).then(res=>{
				//   // 	console.log(res)
				//   // })
				  
				//   uni.request({
				//       url: this.$baseUrl+'/iot/devices/locations', //仅为示例，并非真实接口地址。
				//       data: {
				//       },
				//       header: {
				//           'Blade-Auth': 'bearer '+ res.data.data.accessToken //自定义请求头信息
				//       },
				//       success: (res) => {
				//           console.log(res.data);
				//           // this.text = 'request success';
				// 		  // uni.$emit('deviceData',res.data)
				// 		  this.deviceData = res.data
				// 		  this.locationData = res.data
				//       }
				//   });
				  
				  
				// })
				// .catch(err => {
				// })
				
				uni.request({
				    url: '/api/blade-auth/token?tenantId=000000&account=test&password=123456&type=account', //仅为示例，并非真实接口地址。
				    data: {
						// tenantId: '000000',
						// account: 'test',
						// password:'123456',
						// type:'account'
				    },
				    header: {
				        Authorization:'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
				    },
					method: 'POST',
				    success: (res) => {
				        console.log(res.data);
						
						try {
						  uni.setStorageSync('storage_key',res.data.data.accessToken);
						  uni.$emit('token',res.data.data.accessToken)
						  
						  console.log('res'+uni.getStorageSync('storage_key'))
					  } catch (e) {
						  // error
						  console.log('获取失败')
					  }
						
						uni.request({
						    url: '/api/iot/devices/locations/垃圾桶', //仅为示例，并非真实接口地址。
						    data: {
						    },
						    header: {
						        'Blade-Auth': 'bearer '+ res.data.data.accessToken //自定义请求头信息
						    },
						    success: (res) => {
						        console.log(res.data);
						        // this.text = 'request success';
												  // uni.$emit('deviceData',res.data)
												  this.deviceData = res.data
												  this.locationData = res.data
						    }
						});

				    }
				});
				
			}
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
</style>
