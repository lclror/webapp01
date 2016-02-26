var mongodb_array=require('../mongodb/mongodb_array')
var coll_movie=mongodb_array.collection('movie')
var cheerio=require('cheerio')
var G_islogin=require('./node_G_islogin')

var prevUrl='../../'
var html='\
<!doctype html>\
<html>\
<head>\
<meta charset="utf-8">\
<title>无标题文档</title>\
<link rel="stylesheet" href="'+prevUrl+'../lib/xxxbase.css">\
<link rel="stylesheet" href="'+prevUrl+'../P_movie/P_list.css">\
<script src="'+prevUrl+'../lib/jquery.js"></script>\
</head>\
<body>\
<section id="list">\
	<h1>电影列表页</h1>\
	<h3 class="islogin"></h3>\
	<nav class="inFLeft inmarRight-2">\
		<a href="/movie/admin01/list" class="selected">总览</a>\
		<a href="/movie/admin01/list/科幻">科幻</a>\
		<a href="/movie/admin01/list/喜剧">喜剧</a>\
		<a href="/movie/admin01/list/惊悚">惊悚</a>\
		<a href="/movie/admin01/list/剧情">剧情</a>\
		<a href="/movie/admin01/list/励志">励志</a>\
		<a href="/movie/admin01/list/武侠">武侠</a>\
		<a href="/movie/admin01/list/动画">动画</a>\
	</nav>\
	<p class="p1">全部类型</p>\
	<table>\
		<thead>\
			<tr><th>电影名字</th><th>导演</th><th>国家</th><th>上映年份</th><th>查看</th><th>更新</th><th>删除</th></tr>\
		</thead>\
		<tbody>\
			<tr><td>aaa</td><td>aaa</td><td>aaa</td><td>aaa</td><td><a>查看</a></td><td><a>修改</a></td><td><button>删除</button></td></tr>\
		</tbody>\
	</table>\
	<section id="insert_pageing"></section>\
</section>\
</body>\
<script src="'+prevUrl+'../lib/require.js" data-main="'+prevUrl+'../P_movie/P_list.js"></script>\
</html>\
';





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

//~~~~~~~~~routerall~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var G_pageing=require('../G_pageing/node_G_pageing')
function routerall(app1){
	var $=cheerio.load(html,{decodeEntities: false})
	app1.get('/movie/admin01/list',G_islogin.process($),G_pageing.process($,$("#insert_pageing"),'/movie/admin01/list',coll_movie,5),function(req,res){
	//~~~~加入分页功能用到~~~~~~~~~~~~~~~~~~~~~~~	
	var skip=parseInt(req.query.skip) || 0
	var limit=parseInt(req.query.limit) || 5
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
		coll_movie.find().skip(skip).limit(limit).toArray(function(err,result){
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
	
	//~~~~增加电影列表中的分类页面接口~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var $1=cheerio.load(html,{decodeEntities:false})
	app1.get('/movie/admin01/list/:class', //路由过程开始引入
	G_islogin.process($1),
	G_pageing.process($1,$1("#insert_pageing"),'/movie/admin01/list/',coll_movie,2,'class'),
	function(req,res){
		var cate_name=req.params.class
		//~~~~加入分页功能用到~~~~~~~~~~~~~~~~~~~~~~~	
		var skip=parseInt(req.query.skip) || 0
		var limit=parseInt(req.query.limit) || 2
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~			
		coll_movie.find({category:cate_name}).skip(skip).limit(limit).toArray(function(err,result){
		//查询方法的增加是因为功能的扩展，把()值留空是不影响最初的查询功能的.
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
			$1("#list>table>tbody").html(tr)
			$1("#list>p.p1").html('<strong>'+cate_name+'</strong>')
			//~~给导航按钮添加样式~~~~~~~~~~~~~~~
			$1("#list>nav>a").each(function(i,elm){
				var $this_a=$1(this)
				var a_name=$this_a.text()	
				if(a_name==cate_name){
					$this_a.addClass("selected").siblings().removeClass("selected")
				}
			})
			//~~~~~~~~~~~~~~~~~~~~~~
			
			var html=$1.html()
			res.send(html)
		})		
	})
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//ajax1(app1)
	ajax2(app1)
}

exports.routerall=routerall


	//~~~增加url路径随路由路径变更~~~~~~~~~~~~
/*	var prev_url='../'
	$("html link").each(function(index, element) {
	var new_href=prev_url+$(this).attr("href")
	$(this).attr("href",new_href)
	});*/
	//~~~~~~~~~~~~~~~