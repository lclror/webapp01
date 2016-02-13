var mongodb_array=require('../mongodb/mongodb_array')
var coll_movie=mongodb_array.collection('movie')
var cheerio=require('cheerio')

var html='\
<!doctype html>\
<html>\
<head>\
<meta charset="utf-8">\
<title>无标题文档</title>\
<link rel="stylesheet" href="../../lib/xxxbase.css">\
<link rel="stylesheet" href="../../P_movie/P_list.css">\
<script src="../../lib/jquery.js"></script>\
</head>\
<body>\
<section id="list">\
	<h1>电影列表页</h1>\
	<p>科幻类</p>\
	<table>\
		<thead>\
			<tr><th>电影名字</th><th>导演</th><th>国家</th><th>上映年份</th><th>查看</th><th>更新</th><th>删除</th></tr>\
		</thead>\
		<tbody>\
			<tr><td>aaa</td><td>aaa</td><td>aaa</td><td>aaa</td><td><a>查看</a></td><td><a>修改</a></td><td><button>删除</button></td></tr>\
		</tbody>\
	</table>\
</section>\
</body>\
<script src="../../lib/require.js" data-main="../../P_movie/P_list.js"></script>\
</html>\
';

var $=cheerio.load(html,{decodeEntities: false})

/*function ajax1(app1){
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
}*/

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
	app1.get('/movie/admin01/list',function(req,res){
		coll_movie.find().limit(7).toArray(function(err,result){
			var tr=''
			for(var i in result){
				var title='<td>'+result[i].title+'</td>'
				var director='<td>'+result[i].director+'</td>'
				var country='<td>'+result[i].country+'</td>'
				var year='<td>'+result[i].year+'</td>'	
				
				var id=result[i]._id
				var look='<td><a href="/movie/details/'+id+'">查看</a></td>'
				var update='<td><a href="/movie/admin01/save/'+id+'">修改</a></td>'
				var button='<td><button>删除</button</td>'
				tr+='<tr>'+title+director+country+year+look+update+button+'</tr>'
			}	
			$("#list>table>tbody").html(tr)
			var html=$.html()
			res.send(html)
		})		
	})
	
	//ajax1(app1)
	ajax2(app1)
}

exports.routerall=routerall