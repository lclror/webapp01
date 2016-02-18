
//从 1对n 的那个集 开始操作,哪个集是1对N的 ，就把它放入，
//把它的查询条件放入
//把它之内的需要填充的字段的名字放入
//这个填充是来自哪个集，就把哪个集的封装放入
//最后把所有集中的返回的结果都放入回调函数中去，然后在回调函数中进行统一的遍历操作，这时所要的所有的关联数据都在其中了.只不过它是按集分类的，不在一个集中，但不影响操作.

//它不像mongoose 的 populate 方法，自动把填充的数据合入到一个结果中，而是把结果依次分开的,例如：//populate-test(A,B,C,D,func(coll_1toN_res,coll01_res,coll02_res){})
//缺点是把本应在服务器后台完成的任务，提到了脚本的层面来进行，这是使用nosql的缺点，因为它不是关系型数据库，没有Join方法,只能这样模拟了.


function populate1(coll_oneToN,query_oneToN,populate_key01,ref_coll01,callback){
	coll_oneToN.find(query_oneToN).toArray(function(err,oneToN_result){
		var populate_key01_allId=[]  //要填充字段的id收集到这里
		for(var i in oneToN_result){
			var ref_coll01_query_id=oneToN_result[i][populate_key01] //那个字段要填充就把哪个字段的id全部收集起来(通过遍历).
			populate_key01_allId.push(ref_coll01_query_id) //id收集中
		}
		var coll01_query={_id:{$in:populate_key01_allId}}  //把收集到的id进行包含查询 前的格式化
		ref_coll01.find(coll01_query).toArray(function(err,coll01_result){   //到 ref 的 集01中进行查询
		
			//var coll01=[]
			for(var i in populate_key01_allId){
				var id_o=populate_key01_allId[i]
				for(var j in coll01_result){
					var coll01_Obj=coll01_result[j]
					var  id_coll01=coll01_Obj._id
					if(id_o==id_coll01){
						//coll01.push(coll01_Obj)	
						oneToN_result[i][populate_key01]=coll01_Obj
					}
				}
			}
			callback(oneToN_result/*,coll01*/)
		})
	})
}



function populate2(coll_oneToN,query_oneToN,populate_key01,ref_coll01,populate_key02,ref_coll02,callback){
	coll_oneToN.find(query_oneToN).toArray(function(err,oneToN_result){
		var populate_key01_allId=[]  //要填充字段的id收集到这里
		var populate_key02_allId=[]
		
		for(var i in oneToN_result){
			var ref_coll01_query_id=oneToN_result[i][populate_key01] //那个字段要填充就把哪个字段的id全部收集起来(通过遍历).
			var ref_coll02_query_id=oneToN_result[i][populate_key02]
			populate_key01_allId.push(ref_coll01_query_id) //id收集中
			populate_key02_allId.push(ref_coll02_query_id)
		}
		var coll01_query={_id:{$in:populate_key01_allId}}  //把收集到的id进行包含查询 前的格式化
		var coll02_query={_id:{$in:populate_key02_allId}}
		ref_coll01.find(coll01_query).toArray(function(err1,coll01_result){   //到 ref 的 集01中进行查询
			ref_coll02.find(coll02_query).toArray(function(err2,coll02_result){
				//var coll01=[]
				//var coll02=[]
				for(var i in populate_key01_allId){
				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
				//需要进行length的比较，把最长的作为遍历的数量，对象少的数组没有值系统就自动不填入了.
				//~~~ 因为数量不够的话，那{}就是空了，空值当然里面没有_id了，所以服务报错 。
					var key01_oid=populate_key01_allId[i]
					//var key02_oid=populate_key02_allId[i]
					for(var j in coll01_result){
						//~~~
						var coll01_Obj=coll01_result[j]
						var  id_coll01=coll01_Obj._id
						if(key01_oid==id_coll01){
							//coll01.push(coll01_Obj)	
							oneToN_result[i][populate_key01]=coll01_Obj
						}
						//对象数量不同，不能共用一个j ，否则报错,要并列去写j的循环,在i之内.
						/*var coll02_Obj=coll02_result[j]
						var  id_coll02=coll02_Obj._id
						if(key02_oid==id_coll02){
							//coll01.push(coll01_Obj)	
							oneToN_result[i][populate_key02]=coll02_Obj
						}*/
						//~~~
					}
					//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					var key02_oid=populate_key02_allId[i]
					for(var j in coll02_result){
						var coll02_Obj=coll02_result[j]
						var  id_coll02=coll02_Obj._id
						if(key02_oid==id_coll02){
							//coll02.push(coll02_Obj)	
							oneToN_result[i][populate_key02]=coll02_Obj
						}
					}
				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~		
				}
				callback(oneToN_result/*,coll01,coll02*/)
			})
		})
	})
}


function populate3(coll_oneToN,query_oneToN,populate_key01,ref_coll01,populate_key02,ref_coll02,populate_key03,ref_coll03,callback){
	coll_oneToN.find(query_oneToN).toArray(function(err,oneToN_result){
		var populate_key01_allId=[]  //要填充字段的id收集到这里
		var populate_key02_allId=[]
		var populate_key03_allId=[]
		for(var i in oneToN_result){
			var ref_coll01_query_id=oneToN_result[i][populate_key01] //那个字段要填充就把哪个字段的id全部收集起来(通过遍历).
			var ref_coll02_query_id=oneToN_result[i][populate_key02]
			var ref_coll03_query_id=oneToN_result[i][populate_key03]
			populate_key01_allId.push(ref_coll01_query_id) //id收集中
			populate_key02_allId.push(ref_coll02_query_id)
			populate_key03_allId.push(ref_coll03_query_id)
		}
		var coll01_query={_id:{$in:populate_key01_allId}}  //把收集到的id进行包含查询 前的格式化
		var coll02_query={_id:{$in:populate_key02_allId}}
		var coll03_query={_id:{$in:populate_key03_allId}}
		ref_coll01.find(coll01_query).toArray(function(err1,coll01_result){   //到 ref 的 集01中进行查询
			ref_coll02.find(coll02_query).toArray(function(err2,coll02_result){
				ref_coll03.find(coll03_query).toArray(function(err3,coll03_result){
					//var coll01=[]
					//var coll02=[]
					//var coll03=[]
					for(var i in populate_key01_allId){
					//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
						var key01_oid=populate_key01_allId[i]
						for(var j in coll01_result){
							var coll01_Obj=coll01_result[j]
							var  id_coll01=coll01_Obj._id
							if(key01_oid==id_coll01){
								//coll01.push(coll01_Obj)	
								oneToN_result[i][populate_key01]=coll01_Obj
							}
						}
						//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
						var key02_oid=populate_key02_allId[i]
						for(var j in coll02_result){
							var coll02_Obj=coll02_result[j]
							var  id_coll02=coll02_Obj._id
							if(key02_oid==id_coll02){
								//coll02.push(coll02_Obj)	
								oneToN_result[i][populate_key02]=coll02_Obj
							}
						}
						//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
						var key03_oid=populate_key03_allId[i]
						for(var j in coll03_result){
							var coll03_Obj=coll03_result[j]
							var  id_coll03=coll03_Obj._id
							if(key03_oid==id_coll03){
								//coll03.push(coll03_Obj)	
								oneToN_result[i][populate_key03]=coll03_Obj
							}
						}					
						//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~		
					}
					callback(oneToN_result/*,coll01,coll02*/)
				})
			})
		})
	})
}

exports.populate1=populate1
exports.populate2=populate2
exports.populate3=populate3