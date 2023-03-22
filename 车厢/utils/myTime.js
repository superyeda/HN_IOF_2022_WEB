const moment=require('moment')
export function toTime(stamp){
	return moment(parseInt(stamp)*1000).format('YYYY/MM/DD HH:mm:ss')
}
export function toStamp(time){
	return Date.parse(time)
}