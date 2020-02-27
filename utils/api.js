import { http ,test} from '@/utils/luch-request/index.js'

// let token = 
// try {
//     let token = uni.getStorageSync('storage_key')?uni.getStorageSync('storage_key'):' ';
// 	console.log(token)
// } catch (e) {
//     // error
// 	console.log('校验失败')
// }

// let token = uni.getStorage({
// 				key: 'storage_key',
// 				success: function (res) {
// 					console.log(res.data);
// 				}
// 			});
// console.log(token)
// export const bindDeviceId = (gatewayAddress,deviceId) => {
//   return request({
//     url: '/api/iot/devices/bindGatewayAddress',
//     method: 'post',
//     params: {
//       gatewayAddress,
//       deviceId
//     }
//   })
// }

export const getMapLocation = (token) => {
  return http.get('/iot/devices/locations',{},{
	header: {
		'Blade-Auth': 'bearer '+ token
	}
  })
}

// export const bindDeviceId = (gatewayAddress,deviceId) => {
//   return http.post('/iot/devices/bindGatewayAddress',{},
//     {
// 		params: {
// 		  gatewayAddress,
// 		  deviceId
// 		},
// 		header: {
// 			'Blade-Auth': 'bearer '+ token
// 		},
// 	})
// }

// this.$http
// .post('/blade-auth/token',{},{
// 	 params: { // 会拼接到url上
// 		tenantId: '000000',
// 		account: 'test',
// 		password:'123456',
// 		type:'account'
// 	 }})
// .then(res => {
//   console.log(res)
//   console.log(res.data.data.accessToken)
//   try {
// 	  uni.setStorageSync('storage_key','bearer ' +res.data.data.accessToken);
//   } catch (e) {
// 	  // error
// 	  console.log('获取失败')
//   }
// })
// .catch(err => {
// })


// // 获取新的token
// const getNewTokenServe = () => {
//   return http.get('/api/jwttoken/create')
// }


// export {
//   getNewTokenServe
// }
