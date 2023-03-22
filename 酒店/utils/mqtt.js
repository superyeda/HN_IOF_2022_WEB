import mqtt from 'mqtt/dist/mqtt.js'
import store from '../store'
const connection = {
	host: '192.168.56.60',
	port: 8083,
	endpoint: '/mqtt',
	clean: true,
	connectTimeout: 4000,
	reconnectPeriod: 4000,
	clientId: '',
	username: 'maziyo',
	password: '123456'
}
var client = null
// 建立连接
export function createConnection() {
	const {
		host,
		port,
		endpoint,
		...options
	} = connection
	// #ifdef H5 
	options.clientId='test_H5'
	const connectUrl = `ws://${host}:${port}${endpoint}`
	// #endif
	// #ifdef MP-WEIXIN||APP-PLUS
	options.clientId='test_APP'
	const connectUrl = `wx://${host}:${port}${endpoint}`
	// #endif
	try {
		client = mqtt.connect(connectUrl, options)
	} 
	catch (err) {
		console.log('mqtt.connect error', err)
	}
	// 监听连接成功
	client.on('connect', () => {
		console.log('连接成功')
	})
	// 监听连接失败 
	client.on('error', err => {
		console.log('连接失败', err)
	})
	// 监听消息传输
	client.on('message', (topic, message) => {
			message = JSON.parse(message.toString())
			console.log(`收到消息 ${message} 来自 ${topic}`)
			// 采集湿度
			if (topic === "testtopic/humi")
				store.commit("humi/RECEIVEHUMI", message)
			// 采集温度
			if (topic === "testtopic/temp")
				store.commit("temp/RECEIVETEMP", message)
			// 采集光照
			if (topic === "testtopic/light")
				store.commit("light/RECEIVEHUMI", message)
			// 风扇状态
			if (topic === "testtopic/fan")
				store.commit("fan/RECEIVEFAN", message)
			// 添加卡号
			if (topic==="testtopic/addCard")
				store.commit("ADDCARD",message)
			// 打卡入库
			if(topic==="testtopic/takeCard")
				store.dispatch("TAKECARD",message)
			// 监听返回时间戳
			if(topic==='testtopic/curTime')
				store.dispatch("CURTIME",message)
			// 烟雾传感器
			if(topic==="testtopic/air")
				store.commit("RECEIVEAR",message)
			// 车辆出库
			// if(topic==="testtopic/leave")
			// 	store.dispatch("LEAVE",message)
		})
		client.on('close', () => {
			console.log('连接关闭')
		}) //断开连接回调  
	client.on('reconnect', () => {
		console.log('正在重连');
	}) //重连回调
}

// 订阅主题
export function doSubscribe(topic) {
	const qos = 1
	client.subscribe(topic, {
		qos
	}, (err, res) => {
		if (err) {
			console.log('Subscribe to topics error', err)
			return
		}
		console.log('订阅的主题', res)
	})
}
// 发布主题和消息
export function doPublish(topic, payload) {
	const qos = 1
	client.publish(topic, payload, qos, err => {
		if (err) {
			console.log('Publish error', err)
		} else {
			console.log('发送成功', JSON.parse(payload));
		}
	})
}

export function unSub(topic){
	client.unsubscribe(topic,function(err){
		if(err){
			console.log(err);
		}else{
			console.log(`取消订阅,主题${topic}`);
		}
	})
}
