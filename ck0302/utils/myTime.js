const moment=require('moment')
export function toTime(stamp){
	return moment(Number(stamp)).format('YYYY/MM/DD HH:mm:ss')
}
export function toStamp(time){
	return Date.parse(time)
}