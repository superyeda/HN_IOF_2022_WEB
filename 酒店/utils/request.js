function request(params){
	return new Promise((resolve,reject)=>{
		uni.request({
			...params,
			url:'http://192.168.56.227:1337/api/'+params.url,
			success:(res)=>{
				resolve(res)
			},
			fail:(err)=>{
				reject(err)
			}
		})
	})
}
export default request