import {
	doPublish
} from '@/utils/mqtt'
// 控制led灯
export function led(id,i=0,j=0) {
	let ledInfo={"id":parseInt(id),"l1":i,"l2":j}
	doPublish('testtopic/mode',JSON.stringify(ledInfo))
}
// 控制风扇
export function fan(id,i,j=0){
	let fanInfo={"f1":i,"f2":j,"id":parseInt(id)}
	doPublish("testtopic/mode",JSON.stringify(fanInfo))
}
// 控制速度	0	
export function fanSpd(id,i){
	let fanInfo={"fan1_spd":i,"id":parseInt(id)}
	doPublish("testtopic/mode",JSON.stringify(fanInfo))
}
// 修改工作模式
export function mode(id,i=1){
	let modeInfo={"mod":i,"id":parseInt(id)}
	doPublish("testtopic/mode",JSON.stringify(modeInfo))
}
// 控制蜂鸣器
export function buzzer(id,i=1){
	let buzzer={"bz":i,"id":parseInt(id)}
	doPublish("testtopic/mode",JSON.stringify(buzzer))
}
// 发送人数
export function people(id,i=0){
	let people={"pp":i,"id":parseInt(id)}
	doPublish('testtopic/mode',JSON.stringify(people))
}
// 控制步进电机
export function motor(id,i=3){
	let motor={"mot":i,"id":parseInt(id)}
	doPublish("testtopic/mode",JSON.stringify(motor))
}
// 重启自动发送时间
export function time(id){
	let time={"time":Math.floor(new Date().getTime()/1000),"id":parseInt(id)}
	if(id)
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
export function lock(id,i=1){
	let lock={"lock":i,"id":parseInt(id)}
	doPublish('testtopic/mode',JSON.stringify(lock))
}

// 发钱
export function money(id,mn){
	let sendInfo={money:mn,"id":parseInt(id)}
	doPublish('testtopic/mode',JSON.stringify(sendInfo))
}