import {
	doPublish
} from '@/utils/mqtt'
// 控制led灯
export function led(id,i=0,j=0) {
	let ledInfo={"led1":i,"led2":j,id:parseInt(id)}
	doPublish('testtopic/mode',JSON.stringify(ledInfo))
}
// 控制风扇
export function fan(id,i=2,j=2){
	let fanInfo={"fan1":i,"fan2":j,id:parseInt(id)}
	doPublish("testtopic/mode",JSON.stringify(fanInfo))
}
// 控制速度	0	
export function fanSpd(id,i=0){
	let fanInfo={"fan1_spd":i,id:parseInt(id)}
	doPublish("testtopic/mode",JSON.stringify(fanInfo))
}
// 修改工作模式
export function mode(id,i=1){
	let modeInfo={"mode":i,id:parseInt(id)}
	doPublish("testtopic/mode",JSON.stringify(modeInfo))
}
// 控制蜂鸣器
export function buzzer(id,i=1){
	let buzzer={"buzzer":i,id:parseInt(id)}
	doPublish("testtopic/mode",JSON.stringify(buzzer))
}
// 发送人数
export function people(id,i=0){
	let people={"people":i,id:parseInt(id)}
	doPublish('testtopic/mode',JSON.stringify(people))
}
// 控制步进电机
export function motor(id,i=3){
	let motor={"motor":i,id:parseInt(id)}
	doPublish("testtopic/motol",JSON.stringify(motor))
}
// 重启自动发送时间
export function time(id){
	let time={"time":Math.floor(new Date().getTime()/1000),id:parseInt(id)}
	doPublish("testtopic/mode",JSON.stringify(time))
}
// 温度阈值
export function temp(id,i){

	let temp={"temp":i,id:parseInt(id)}
	doPublish('testtopic/mode',JSON.stringify(temp))
}
// 湿度阈值
export function humi(id,i){
	let humi={"humi":i,id}
	doPublish('testtopic/mode',JSON.stringify(humi))
}
// 空气阈值
export function air(id,i){
	let air={"air":i,id:parseInt(id)}
	doPublish('testtopic/mode',JSON.stringify(air))
}
// 光照阈值
export function light(i,id){
	let light={"light":i,id:parseInt(id)}
	doPublish('testtopic/mode',JSON.stringify(light))
}

// 开锁
export function lock(id,i=1){
	let lock={"lock":i,id:parseInt(id)}
	doPublish('testtopic/mode',JSON.stringify(lock))
}
