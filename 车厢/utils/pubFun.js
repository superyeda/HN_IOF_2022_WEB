export const sendnMqtt=(fn,topic,info)=>{
	let i=0
	let p=setInterval(()=>{
		i++
		fn(topic,info)
		if(i===3)
		clearInterval(p)
	},500)
}