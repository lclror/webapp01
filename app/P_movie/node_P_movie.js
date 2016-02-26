var mongodb_array=require('../mongodb/mongodb_array')
var coll_movie=mongodb_array.collection('movie')
var cheerio=require('cheerio')
var cache=require('memory-cache')

var html='\
<!doctype html>\
<html>\
<head>\
<meta charset="utf-8">\
<title>电影首页</title>\
<script src="../../lib/jquery.js"></script>\
<link rel="stylesheet" href="../../lib/xxxbase.css">\
<link rel="stylesheet" href="../../P_movie/P_movie.css">\
</head>\
<body>\
<section id="movie">\
	<h1>MOVIE 首页</h1>\
	<nav class="inFLeft inmarRight-2">\
		<a href="/movie" class="selected">首页</a>\
		<a href="/movie/category/科幻">科幻</a>\
		<a href="/movie/category/喜剧">喜剧</a>\
		<a href="/movie/category/惊悚">惊悚</a>\
		<a href="/movie/category/剧情">剧情</a>\
		<a href="/movie/category/励志">励志</a>\
		<a href="/movie/category/武侠">武侠</a>\
		<a href="/movie/category/动画">动画</a>\
	</nav>\
	<ul class="rows-count-7-gap-2 inFLeft rowsMbottom-2">\
	</ul>\
	<section id="insert_pageing"></section>\
</section>\
</body>\
<script src="../../lib/require.js" data-main="../../G_pageing/G_pageing.js"></script>\
</html>\
'
//每个电影的小块组成如下
//<li><img src="../P_movie/img/yr.jpg" alt=""/><h3>蚁人</h3><a>观看预告片</a></li>\



var G_pageing=require('../G_pageing/node_G_pageing')

function routerall(app1){
	
//~~~~~~电影首页~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var $=cheerio.load(html,{decodeEntities: false})
//$("#insert_pageing").html(G_pageing.html) //加入分页按钮的html标签，要存放在的父容器
//var count=0	//看缓存请求数量用
var limit1=7
app1.get('/movie',G_pageing.process($,$("#insert_pageing"),'/movie',coll_movie,limit1),function(req,res,next){ 
	
/*	//这里的缓存也影响到了页面的实时响应，对于变动的模板页面，还没有想出使用缓存的方法,除非把每一个页面都分别缓存到对应的url地址
	var P_movie=cache.get('P_movie')
	if(P_movie==null){
		next()
	}else if(P_movie!=null){
		count+=1
		console.log('use cache '+count)
		res.send(P_movie)	
	}*/
	next()
},function(req,res){
	//~~~~~add 分页功能~~~~~~~~~~~~~~~~~
	
	var skip=parseInt(req.query.skip) || 0
	var limit=parseInt(req.query.limit) || limit1
	//console.log(skip+' , '+limit)
	
/*	var query=''
	if(skip && limit){
		query=coll_movie.find().skip(skip).limit(limit)  //注意这里查库有个过程，所以显示会脱节.等于线面的toArray先于此运行，所以有时什么都运行不到。
		//再次补充，这里不会脱节，因为定义的时候不会正真影响到渲染，因为下面会再次查询一次。
		
	}else{
		query=coll_movie.find()
	}*/
/*	if(!skip && !limit){
		//这里不用这样判断，因为没有的话，它下面就自动为空了,不影响查询.
	}*/
	//~~~~~~~~~~~~~~~~~~~~~~
	//下面的skip limit如果是空值的话也可以查库成功
	coll_movie.find().skip(skip).limit(limit).toArray(function(err,result){
		var ul=''
		for(var i in result){
			var title=result[i].title
			var posters=result[i].posters
			var id=result[i]._id
			
			var h3='<h3>'+title+'</h3>'
			var img='<img src="'+posters+'"/>'
			//movie 详情页链接参数用id出传递区分
			var a='<a target="_blank" href="/movie/details/'+id+'">观看预告片</a>'
			var li='<li>'+img+h3+a+'</li>'
			ul+=li
		}
		$("#movie>ul").html(ul)
		html=$.html()
		/*cache.put('P_movie',html,5000)
		count+=1
		console.log('no use cache '+count)*/
		res.send(html)	
	})
})
//~~~~~~~类型电影页面接口~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
var $1=cheerio.load(html,{decodeEntities:false})	
var limit2=2
app1.get('/movie/category/:class',G_pageing.process($1,$1("#insert_pageing"),'/movie/category/',coll_movie,limit2,'class'),function(req,res){
	var cate_name=req.params.class
	//~~~~~add 分页功能~~~~~~~~~~~~~~~~~
	var query=''
	var skip=parseInt(req.query.skip) || 0  
	//如果不设置默认的话， 那首页就不会自动进行数量限制，而是全部显示出来了。因为url中没有传入skip limit 这种必要的参数.
	var limit=parseInt(req.query.limit) || limit2
	//console.log(skip+' , '+limit)
	//~~~~~~~~~~~~~~~~~~~~~~
	coll_movie.find({category:cate_name}).skip(skip).limit(limit).toArray(function(err,result){
		var ul=''
		for(var i in result){
			var _id=result[i]._id
			var title=result[i].title
			var posters=result[i].posters
			
			var img='<img src="'+posters+'"/>'
			var h3='<h3>'+title+'</h3>'
			var a='<a href="/movie/details/'+_id+'">观看预告片</a>'
			var li='<li>'+img+h3+a+'</li>'
			ul+=li
		}
		if(ul==''){ul='<strong>暂无内容，请添加</strong>'}
		$1("#movie>ul").html(ul)
		
		$1("#movie>h1").html('<h1>MOVIE '+cate_name+'</h1>')
		//~~给导航按钮添加样式~~~~~~~~~~~~~~~
		$1("#movie>nav>a").each(function(i,elm){
			var $this_a=$1(this)
			var a_name=$this_a.text()	
			if(a_name==cate_name){
				$this_a.addClass("selected").siblings().removeClass("selected")
			}
		})
		//~~~~~~~~~~~~~~~~~~~~~~
		html=$1.html()
		res.send(html)
	})
})

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
}

		

exports.routerall=routerall

/*	coll_movie.find().limit(7).toArray(function(err,result){
		var ul=''
		for(var i in result){
			var h3='<h3>'+result[i].title+'</h3>'
			var posters=result[i].posters	
			var img='<img src="'+posters+'"/>'
					
			//movie 详情页链接参数用id出传递区分
			var id=result[i]._id
			var a='<a target="_blank" href="/movie/details/'+id+'">观看预告片</a>'
			var li='<li>'+img+h3+a+'</li>'
			ul+=li
		}
		$("#movie>ul").html(ul)
		html=$.html()
		cache.put('P_movie',html,5000)
		res.send(html)	
	})
*/
			



			
