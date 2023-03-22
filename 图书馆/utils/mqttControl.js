import {
	doPublish
} from '@/utils/mqtt'
// 控制led灯
export function led(i=0,j=0) {
	let ledInfo={"led1":i,"led2":j}
	doPublish('testtopic/mode',JSON.stringify(ledInfo))
}
// 控制风扇
export function fan(i,j=0){
	let id=parseInt(uni.getStorageSync("curId"))
	let fanInfo={"fan1":i,"fan2":j,"id":id}
	doPublish("testtopic/mode",JSON.stringify(fanInfo))
}
// 控制速度	0	
export function fanSpd(i){
	let id=parseInt(uni.getStorageSync("curId"))
	let fanInfo={"fan1_spd":i,"id":id}
	doPublish("testtopic/mode",JSON.stringify(fanInfo))
}
// 修改工作模式
export function mode(i=1){
	let modeInfo={"mode":i}
	doPublish("testtopic/mode",JSON.stringify(modeInfo))
}
// 控制蜂鸣器
export function buzzer(id,i=1){
	let buzzer={"buzzer":i,"id":id}
	doPublish("testtopic/mode",JSON.stringify(buzzer))
}
// 发送人数
export function people(i=0){
	let people={"people":i}
	doPublish('testtopic/mode',JSON.stringify(people))
}
// 控制步进电机
export function motor(i=3){
	let motor={"motor":i}
	doPublish("testtopic/motol",JSON.stringify(motor))
}
// 重启自动发送时间
export function time(nid){
	let id=parseInt(uni.getStorageSync("curId"))
	let time={"time":Math.floor(new Date().getTime()/1000),"id":id}
	if(id!=null)
	doPublish("testtopic/mode",JSON.stringify(time))
}
// 温度阈值
export function temp(i){

	let temp={"temp":i}
	doPublish('testtopic/mode',JSON.stringify(temp))
}
// 湿度阈值
export function humi(i){
	let humi={"humi":i}
	doPublish('testtopic/mode',JSON.stringify(humi))
}
// 空气阈值
export function air(i){
	let air={"air":i}
	doPublish('testtopic/mode',JSON.stringify(air))
}
// 光照阈值
export function light(i,id){
	let light={"light":i,id:id}
	doPublish('testtopic/mode',JSON.stringify(light))
}

// 开锁
export function lock(i=1){
	let id=parseInt(uni.getStorageSync("curId"))
	let lock={"lock":i,"id":id}
	doPublish('testtopic/mode',JSON.stringify(lock))
}
