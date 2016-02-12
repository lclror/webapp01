var mongodb_array=require('../mongodb/mongodb_array')
var coll_movie=mongodb_array.collection('movie')

function ajax2(app1){
	app1.get('/ajax/movie/list/delete',function(req,res){
		var title=req.query.title
		coll_movie.remove({title:title},function(err,result){
			if(err){
				//console.log(err)
				res.send([{status:'error'}])	
			}else{
				//console.log(result.result)
				res.send([{status:'success'}])	
			}	
		})
	})	
}

function routerall(app1){
	app1.get('/ajax/movie/list',function(req,res){
		coll_movie.find().limit(7).toArray(function(err,result){
			if(err){
				res.send([])	
			}else{
				console.log(result[0].title+' list取回数据成功')
				res.send(result)	
			}	
		})	
	})
	
	ajax2(app1)
}

exports.routerall=routerall