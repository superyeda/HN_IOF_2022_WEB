<template>
	<view class="content">
		<button type="default" @click="initBle">初始化蓝牙模块</button>
		<scroll-view scroll-y="true" show-scrollbar="true" v-if="connectDev===null">
			<radio-group>
				<view v-for="(item,index) in bleDevs" :key="index" v-if="item.name.length > 0">
					<view style="font-size: 32rpx; color: #333;">
						<radio :value="item.deviceId" />
						{{ item.name }}
					</view>
					<view style="font-size: 20rpx">信号强度: {{ item.RSSI }}dBm ({{ Math.max(100 + item.RSSI, 0) }}%)</view>
					<view style="font-size: 20rpx">deviceId: {{ item.deviceId }} 设备名称: {{ item.name }}</view>

					<button @tap="createBLEConnection(item)" style="margin: 20rpx;background-color: #007AFF;padding:
						10rpx;">连接</button>
					<!-- <button @tap="close(item)" style="margin: 20rpx;background-color: #007AFF;padding: 10rpx;">断开
					</button> -->
				</view>
			</radio-group>
		</scroll-view>
		<view class="connectDev" v-if="connectDev!==null">
			<view style="font-size: 32rpx; color: #333;">
				<radio :value="connectDev.deviceId" />
				{{ connectDev.name }}
			</view>
			<view style="font-size: 20rpx">信号强度: {{ connectDev.RSSI }}dBm ({{ Math.max(100 + connectDev.RSSI, 0) }}%)
			</view>
			<view style="font-size: 20rpx">deviceId: {{ connectDev.deviceId }} 设备名称: {{ connectDev.name }}</view>

			<button @click="close" style="margin: 20rpx;background-color: #007AFF;padding: 10rpx;">断开
			</button>
		</view>
		<uni-card title="温度" v-show="list.temp">
			<h1>{{list.temp}}</h1>
		</uni-card>
		<uni-card title="湿度" v-show="list.humi">
			<h1>{{list.humi}}</h1>
		</uni-card>
		<uni-card title="空气" v-show="list.air">
			<h1>{{list.air}}</h1>
		</uni-card>
		<uni-card title="风扇" v-show="list.fan">
			<h1>{{list.fan==1?'正转':list.fan==2?'反转':'停转'}}</h1>
		</uni-card>
		<template v-if="connectDev!==null">
			<uni-card title="开启">
				<button @click="sendBlueMsg('0')">自动</button>
				<button @click="sendBlueMsg('1')">手动</button>
				<button @click="sendBlueMsg('2')">蜂鸣器开</button>
				<button @click="sendBlueMsg('3')">led1开</button>
				<button @click="sendBlueMsg('4')">风扇1开</button>
				<button @click="sendBlueMsg('5')">风扇2开</button>
				<button @click="sendBlueMsg('6')">motor开</button>
			</uni-card>
			<uni-card title="关闭">
				<button @click="sendBlueMsg('7')">led1关</button>
				<button @click="sendBlueMsg('8')">风扇1关</button>
				<button @click="sendBlueMsg('9')">风扇2关</button>
			</uni-card>
		</template>


	</view>
</template>

<script>
	import myAlert from '@/utils/myAlert.js'
	export default {
		data() {
			return {
				title: 'Hello',
				connectDev: null,
				bleDevs: [],
				status: -2, //-2未连接  -1已连接  0连接成功
				deviceId: '',
				serviceId: '',
				characteristicId: '',
				list: {
					temp: '',
					humi: '',
					air: '',
					fan: ''
				}
			};
		},
		mounted() {
			this.onBLEConnectionStateChange()
		},
		methods: {
			// 发送控制信号
			sendBlueMsg(msg) {
				const buffer = new ArrayBuffer(msg.length)
				const dataView = new DataView(buffer)
				// dataView.setUint8(0, 1) 
				// byteOffset, value 

				for (var i = 0; i < msg.length; i++) {
					dataView.setUint8(i, msg.charAt(i).charCodeAt())
				}

				uni.writeBLECharacteristicValue({
					deviceId: this.deviceId, // 设备ID，在【4】里获取到
					serviceId: this.serviceId, // 服务UUID，在【6】里能获取到
					characteristicId: this.characteristicId, // 特征值，在【7】里能获取到
					value: buffer,
					success: (res) => {
						console.log('发送成功:', res)
					},
					fail(err) {
						console.error(err)
					}
				})
			},
			//初始化蓝牙
			initBle() {
				this.connectDev = null;
				console.log('初始化蓝牙>>>');
				this.bleDevs = [];
				this.list = {
					temp: '',
					humi: '',
					air: '',
					fan: ''
				};
				uni.openBluetoothAdapter({
					success: (res) => { //已打开
						uni.getBluetoothAdapterState({ //蓝牙的匹配状态
							success: (res1) => {
								console.log(res1, '“本机设备的蓝牙已打开”')
								// 开始搜索蓝牙设备
								this.startBluetoothDeviceDiscovery()
							},
							fail(error) {
								uni.showToast({
									icon: 'none',
									title: '查看手机蓝牙是否打开'
								});
							}
						});

					},
					fail: err => { //未打开 
						uni.showToast({
							icon: 'none',
							title: '查看手机蓝牙是否打开'
						});
					}
				})
			},

			// 开始搜索蓝牙设备
			startBluetoothDeviceDiscovery() {
				uni.startBluetoothDevicesDiscovery({
					success: (res) => {
						console.log('启动成功', res)
						// 发现外围设备
						this.onBluetoothDeviceFound()
					},
					fail: err => {
						console.log(err, '错误信息')
					}
				})
			},

			// 发现外围设备
			onBluetoothDeviceFound() {
				// console.log("执行到这--发现外围设备")
				uni.onBluetoothDeviceFound((res) => {
					// 把搜索到的设备存储起来，方便我们在页面上展示
					if (this.bleDevs.indexOf(res.devices[0].deviceId) == -1) {
						this.bleDevs.push(res.devices[0])
					}
				})
			},

			//选择设备连接把deviceId传进来,建立连接
			createBLEConnection(item) {
				this.connectDev = item
				let thit = this
				//data里面建立一个deviceId，存储起来
				this.deviceId = item.deviceId
				//连接蓝牙
				uni.createBLEConnection({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: this.deviceId,
					success(res) {
						//防止在这里面取不到this，古在外面用thit存储了this
						thit.stopBluetoothDevicesDiscovery()

						console.log("蓝牙连接成功deviceId", res)
						thit.getBLEDeviceServices()
					},
					fail(res) {
						console.log("蓝牙连接失败", res)
					}
				})
			},

			// 该方法回调中可以用于处理连接意外断开等异常情况
			onBLEConnectionStateChange() {
				uni.onBLEConnectionStateChange(res => {
					console.log(`设备 ${res.deviceId} 状态改变: ${res.connected} `)
					if (res.connected == false) {
						this.createBLEConnection()
					}
				})
			},
			//获取蓝牙的所有服务
			getBLEDeviceServices() {
				setTimeout(() => {
					uni.getBLEDeviceServices({
						// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
						deviceId: this.deviceId,
						success: (res) => {
							res.services.forEach((item) => {
								if (item.uuid.indexOf(
									"0000FFE0-0000-1000-8000-00805F9B34FB") != -1
									) { //寻找要使用的service
									this.serviceId = item.uuid,
										uni.onBLECharacteristicValueChange((res) => {
											console.log(res);
											let hexStr = this.ab2hex(res.value)
											let myStr = this.hexCharCodeToStr(hexStr)
											console.log("16进制转字符串", myStr);
											//存入数组
											let firstIndex = myStr.indexOf(',')
											let topic = myStr.slice(0, firstIndex)
											let data = myStr.slice(firstIndex + 1)
											data = JSON.parse(data)
											if (topic === "testtopic/temp") this.list
												.temp =
												data.temp1
											if (topic === "testtopic/humi") this.list
												.humi =
												data.humi1
											if (topic === "testtopic/fan") this.list.fan =
												data
												.fan1
											if (topic === "testtopic/air") this.list.air =
												data
												.air
										});
									//进入特征
									this.getBLEDeviceCharacteristics()
								}
							})
						}
					})
				}, 3000)
			},

			//获取蓝牙特征
			getBLEDeviceCharacteristics() {
				setTimeout(() => {
					uni.getBLEDeviceCharacteristics({ //获取特征列表（3个）
						// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
						deviceId: this.deviceId,
						// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
						serviceId: this.serviceId,
						success: (res) => {
							console.log("res.characteristics.", res.characteristics)
							res.characteristics.forEach((item) => {
								if (item.uuid.indexOf(
										"0000FFE1-0000-1000-8000-00805F9B34FB") != -
									1) { //选择要使用的特征的uuid
									console.log('characteristicId :', item.uuid)
									this.characteristicId = item.uuid
									//利用传参的形势传给下面的notify，这里的uuid如果都需要用到，就不用做判断了，建议使用setTimeout	进行间隔性的调用此方法
									this.notifyBLECharacteristicValueChange(item.uuid)
								}
							})
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}, 1000)
			},
			// ArrayBuffer转16进度字符串示例
			ab2hex(buffer) {
				const hexArr = Array.prototype.map.call(
					new Uint8Array(buffer),
					function(bit) {
						return ('00' + bit.toString(16)).slice(-2)
					}
				)
				return hexArr.join('')
			},

			// 停止搜寻蓝牙设备
			stopBluetoothDevicesDiscovery() {
				uni.stopBluetoothDevicesDiscovery({
					success: e => {
						this.loading = false
						console.log('停止搜索蓝牙设备:' + e.errMsg);
					},
					fail: e => {
						console.log('停止搜索蓝牙设备失败，错误码：' + e.errCode);
					}
				});
			},
			// 16进制转字符串



			hexCharCodeToStr(hexCharCodeStr) {
				var trimedStr = hexCharCodeStr.trim();
				var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) :
					trimedStr;
				var len = rawStr.length;
				if (len % 2 !== 0) {
					myAlert("存在非法字符!");
					return "";
				}
				var curCharCode;
				var resultStr = [];
				for (var i = 0; i < len; i = i + 2) {
					curCharCode = parseInt(rawStr.substr(i, 2), 16);
					resultStr.push(String.fromCharCode(curCharCode));
				}
				return resultStr.join("");
			},

			// 启用 notify 功能
			notifyBLECharacteristicValueChange(characteristicId) {
				console.log('特征值', characteristicId)
				console.log('this.deviceId', this.deviceId)
				console.log('this.serviceId', this.serviceId)

				uni.notifyBLECharacteristicValueChange({
					state: true, // 启用 notify 功能
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: this.deviceId,
					// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
					serviceId: this.serviceId,
					// 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
					characteristicId: this.characteristicId,
					success: (res) => {

						console.log('启用 notify 功能 success', res.errMsg)
					},
					fail: (res) => {
						console.log('启用 notify 功能 success2', res.errMsg)
					}
				})

			},
			// 断开连接
			close() {
				uni.closeBLEConnection({
					deviceId: this.connectDev.deviceId,
					success: res => {
						this.connectDev = null
						this.list = {
							temp: '',
							humi: '',
							air: '',
							fan: ''
						}
						console.log("断开蓝牙成功", res)
					},
					fail(res) {
						console.log("断开蓝牙失败", res)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 40rpx;

		button {
			margin: 20rpx auto;
		}
	}
</style>
