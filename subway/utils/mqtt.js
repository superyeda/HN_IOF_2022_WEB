import mqtt from 'mqtt/dist/mqtt.js'
import store from '../store'
import {MQTTURL} from './env'
// 连接配置
const connection = {
	host: MQTTURL,
	port: 8083,
	endpoint: '/mqtt',
	clean: true,
	connectTimeout: 4000,
	reconnectPeriod: 0,
	clientId: 'sd_dsad213_232',
	username: 'mazsdo',
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
	options.clientId = 'test_H5'
	const connectUrl = `ws://${host}:${port}${endpoint}`
	// #endif
	// #ifdef MP-WEIXIN||APP-PLUS
	options.clientId = 'test_APP'
	const connectUrl = `wx://${host}:${port}${endpoint}`
	// #endif
	try {
		client = mqtt.connect(connectUrl, options)
	} catch (err) {
		console.log('mqtt.connect error', err)
	}
	// 监听连接成功
	client.on('connect', () => {
		store.commit('CHANGEONLINE', 1)
		console.log('连接成功')
	})
	// 监听连接失败 
	client.on('error', err => {
		console.log('连接失败', err)
	})
	// 监听消息传输
	client.on('message', (topic, message) => {
		// console.log(message);
		try{
			// console.log('................',message.toString());
			message = JSON.parse(message.toString())
		}catch(e){
			// console.log(topic,'============',message);
		}
		
		console.log(`收到消息 ${message} 来自 ${topic}`)
		// 采集湿度
		if (topic === "testtopic/humi")
			store.commit("humi/RECEIVEHUMI", message)
		// 采集温度
		if (topic === "testtopic/temp")
			store.commit("temp/RECEIVETEMP", message)
		// 采集光照
		if (topic === "testtopic/light")
			store.commit("light/RECEIVELIGHT", message)
		// 风扇状态
		if (topic === "testtopic/fan")
			store.commit("fan/RECEIVEFAN", message)
		// 添加卡号 入站
		if (topic === "testtopic/addCard")
			store.dispatch("card/addCard", message)
		// 打卡入库 出站
		if (topic === "testtopic/takeCard")
			store.dispatch("card/takeCard", message)
		// 监听返回时间戳
		if (topic === 'testtopic/curTime'){
			// console.log("=======",message);
			store.dispatch("time/CURTIME", message)
		}
			
		//空气传感器
		if (topic === "testtopic/air")
			store.commit("air/RECEIVEAIR", message)
		// 检测硬件是否收到消息
		if(topic==="testtopic/lock"){
			store.commit("lock/sMsg",1)
		}
		// 获取阈值
		if(topic==="testtopic/parameter")
			store.commit("mode/MAXVALUE",message)
			// 获取电量
		if(topic==='testtopic/battery')
			store.commit('battery/RECEIVEBAT',message)
		if(topic==='testtopic/alert')
			store.commit('warn/MYALERT',message)
		// CHANGE
		if(topic==="testtopic/found")
			store.commit("find/LOSTDATA",message)
			

	})
	// 监听断开连接
	client.on('close', () => {
		store.commit('CHANGEONLINE', 0)
		console.log('连接关闭')
	})
	// 监听重连
	// if(!store.state.isOnline)	
	client.on('reconnect', () => {
		console.log('正在重连');
	})
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

export function unSub(topic) {
	client.unsubscribe(topic, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log(`取消订阅,主题${topic}`);
		}
	})
}
