const moment=require('moment')
export function toTime(stamp){
	return moment(stamp).format('MM/DD HH:mm:ss')
	
}
export function toStamp(time){
	return parseInt(Date.parse(time))
}

export function toRelTime(time){
	time=time/1000
	let hour = parseInt(time/3600)
	let min=parseInt(time%3600/60)
	let sec=parseInt(time%3600%60)
	hour=hour<9?`0${hour}`:hour
	min=min<9?`0${min}`:min
	sec=sec<9?`0${sec}`:sec
	return `${hour}小时${min}分钟${sec}秒`
}