//~~~~~~~~details:~~~~~~~~
//先查出一段各自都带有id编号的数据，(其他库的数据就填充到其中）。把这些id号都一个个提取出来归集到一个数组里，然后拿这个数组去需要关联的库中包含查询一下，
//用查到的结果中的Id再一条条与前面数组中的槽位一一对照一下，对照上了就把id所在当前数据填充到原始数据当前遍历到的相关key中去.
function populateN(opt,callback){
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
	var oneToN_result=opt.P_result
	var populate_keyN=opt.key
	var ref_collN=opt.ref
	var collN_query_key=opt.ref_query_key || [0]
	var find_count=opt.coll_find
	
	var length=ref_collN.length	
	
		var populate_keyN_allId=[]
		for(var j in populate_keyN){
			populate_keyN_allId.push([])
			for(var i in oneToN_result){
				var ref_collN_query_id=oneToN_result[i][populate_keyN[j]] 
				populate_keyN_allId[j].push(ref_collN_query_id)
			}	
		}
		
		var key=[]
		for(var i=0;i<length;i++){
			if(collN_query_key[i]==0 || collN_query_key[i]==null){
				key.push('_id')	
				collN_query_key[i]={_id:{$in:populate_keyN_allId[i]}}
			}else{
				for(var j in collN_query_key[i]){
						key.push(j)
						collN_query_key[i][j]={$in:populate_keyN_allId[i]}	
				}
			}
		}	
		
function find(i,_callback){
	ref_collN[i].find(collN_query_key[i]).toArray(function(errN,collN_result){
		for(var j in populate_keyN_allId[i]){
			var keyN_oid=populate_keyN_allId[i][j]
			for(var k in collN_result){
				var collN_Obj=collN_result[k]	
				var id_collN=collN_Obj[key[i]]
				if(keyN_oid==id_collN){
					oneToN_result[j][populate_keyN[i]]=collN_Obj
				}
			}
		}	
		if(i==length-1){
			callback(oneToN_result)
		}else{
			_callback()
		}
	})		
}

find_count(find)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
}

exports.populateN=populateN
