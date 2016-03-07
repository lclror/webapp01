var mongodb_array=require('../mongodb/mongodb_array')
var coll_movie=mongodb_array.collection('movie')
var cheerio=require('cheerio')
var cache=require('memory-cache')


	
var html='\n\
<!doctype html>\n\
<html>\n\
<head>\n\
<meta charset="utf-8">\n\
<title>电影首页</title>\n\
<script src="../../lib/jquery.js"></script>\n\
<link rel="stylesheet" href="../../lib/xxxbase.css">\n\
<link rel="stylesheet" href="../../P_movie/P_movie.css">\n\
</head>\n\
<body>\n\
<section id="movie">\n\
	<h1>MOVIE 首页</h1>\n\
	\n\
	<section id="insert_search">~~~~~~~~搜索功能块~</section>\n\
	\n\
	<section id="insert_category">~放入电影类型标签~~~~~</section>\n\
	\n\
	<ul class="rows-count-7-gap-2 inFLeft rowsMbottom-2">~~~~~电影数据渲染~~~~~</ul>\n\
	\n\
	<section id="insert_pageing">~~~~放入分页页码~~~~~</section>\n\
</section>\n\
</body>\n\
<script src="../../lib/require.js" data-main="../../P_movie/P_movie.js"></script>\n\
</html>\n\
'
//每个电影的小块组成如下
//<li><img src="../P_movie/img/yr.jpg" alt=""/><h3>蚁人</h3><a>观看预告片</a></li>\



var G_pageing=require('../G_pageing/node_G_pageing')
var G_search=require('../G_search/node_G_search')
var G_category=require('../G_category/node_G_category')
//~~目前做到的兼容有~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//在这里每种功能的加入都是为了搜索不同的内容，并把他们渲染出来。谁让它们要用到这个视图模板接口的其中之一呢(所以要对被加入功能的接口做模块兼容)。
//0:原本的查询方法：						 query={} 什么都查，没有限制
//1:按 标签模块传来的方法 作为条件查库   让query=新的查询条件1
//2:按 搜索模块传来的方法 作为条件查库	 让query=新的查询条件2
//3:为 分页模块增加查库方法连 skip().limit() 
//注：在接口中加入新的功能，目前看来都是在url中加入一个get的关键字段，然后用这个新加入的关键字段做文章.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function routerall(app1){
//~~~~~~电影首页~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var $=cheerio.load(html,{decodeEntities: false})
//$("#insert_pageing").html(G_pageing.html) //加入分页按钮的html标签，要存放在的父容器
//var count=0	//看缓存请求数量用

/*var opts={
		$parent:$("#insert_pageing"),
		pageingUrl:'/movie',
		btn_coll:	coll_movie,
		limit:7,
		param:'',
		search_coll_key:'',
}*/

app1.get('/movie',
G_category.process($,$("#insert_category")/*,'/movie','category',{category:null}*/),

G_pageing.process($,
 $("#insert_pageing"), //父容器 
//'/movie', //a标签连接到哪个页面的url  
2,				//每页显示几条数据 
coll_movie,	//给哪个coll分页
'category' ,			//url中加入 标签分页功能 的关键字段
{category:null},	//给coll 标签分页 要查库中的哪个键
'search' ,			//url中加入 搜索功能 的关键字段
{title:null}	//给coll 搜索分页 要查库中的哪个键
),
G_search.process($,$("#insert_search")/*,'/movie'*/),

function(req,res,next){
/*	req.G_pageing={
		//parent:'',
		pageingUrl:'/movie',
		btn_coll:	coll_movie,
		limit:limit1,
		param:'',
		query:'',
	}*/
	//req.G_pageing={}
	//req.G_pageing.parent=$("#insert_pageing")
	//var search1=req.query.search	
	//if(search1){
		//req.G_pageing.query={title:new RegExp( search1 /*req.G_pageing.search*/+'.*','i')}
	//}
	
/*	//此方法也不行，仍然绕不过二级方法调用undefined错误.
	req.page_$parent=$("#insert_pageing")
	req.page_ingUrl='/movie'
	req.page_btn_coll=coll_movie
	req.page_limit=limit1
	req.page_param=''
	console.log(req)*/
	next()
},
//G_pageing.process($,$("#insert_pageing"),'/movie',coll_movie,limit1),
//G_pageing.process($, opts.$parent, opts.pageingUrl, opts.btn_coll, opts.limit)/*.apply(opts)// 此方法也不行*/,
//G_search.process($),
function(req,res,next){ 
	
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
	//下面的skip limit如果是空值的话也可以查库成功
	//~~~~~add search~~~~~~~~~~~~~~~~~
	//疑问，如果要做到中间件功能的完全独立，是应该增加各个中间件的兼容性(曾一个中间件，其他相关中间件都要改动，这显然是不好的;)，还是尽量独立到自身？
	//接上:或者是只在模板接口中增加各个中间件的兼容代码?
	//例如下面，是在本页面中为了搜索功能，变动类型标签高亮，还是在搜索中间件中变动？
	//var query={}
	/*var search_val=req.query.search
	if(search_val){
		query={title:new RegExp( search_val+'.*','i')}
		$("#movie>nav>a").eq(0).removeClass("selected")
		$("#movie>h1").html('<h1>MOVIE 搜索结果页</h1>')
	}*/
	var query={}
	//~~~增加分页~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var skip=parseInt(req.query.skip) || 0
	//var limit=parseInt(req.query.limit) || 7	
	var limit=7
	
	//~~~增加对搜索功能的兼容 代码改动~~~~~~~~~~~~~~~~~~~
	var search_val=req.query.search
	if(search_val){
		//query=req.G_search 
		query={title:new RegExp( search_val+'.*','i')} //不要因为查库条件复杂了而否决这种实时定义方法.
		$("#movie>h1").html('<h1>MOVIE 搜索结果页</h1>')
	}else{
		$("#movie>h1").html('<h1>MOVIE 首页</h1>')	
	}
	//~~~~~增加电影类别兼容~~~~~~~~~~~~~~~~~
	var category=req.query.category
	if(category){
		//是否没有那么麻烦，可以直接根据url中的关键字，来直接直接设定查库条件.
		//query={category:category} ,而哪些功能最主要的缺点是不知道要查那个库，哪个接口用，就在那个接口用到的库中查，与其在功能中定义查库方法，
		//不如在接口中根据有没有关键字来直接定义(因为接口比功能块更加了解数据库的结构)，之前那样在功能块中定义查库方法等于绕了一大圈又回来，是绝对不可取的。
		//所以要取消那种方法,直接在接口中实时定义查库方法.
		//query=req.G_category_query
		query={category:category}
		//limit=parseInt(req.query.limit) || 2	 //如果url中有关键字category 那每页就显示2个电影
		limit=2
		$("#movie>h1").html('<h1>MOVIE '+category+'</h1>')
	}else{
		//limit=parseInt(req.query.limit) || 7	
	}

	//~~~~以下为基本功能代码~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	coll_movie.find(query).skip(skip).limit(limit).toArray(function(err,result){
		//console.log(err) 
		//console.log(result)
		var ul='\n'
		//~~~增加result为空的提示~~~~~~~~~~
		if(result[0]==null){
			ul='<h2>未搜索到结果</h2>'	
		}
		//~~~~~~~~~~~~~
		for(var i in result){
			var title=result[i].title
			var posters=result[i].posters
			var id=result[i]._id
			
			var h3='<h3>'+title+'</h3>'
			var img='<img src="'+posters+'"/>'
			//movie 详情页链接参数用id出传递区分
			var a='<a target="_blank" href="/movie/details/'+id+'">观看预告片</a>'
			var li='<li>'+img+h3+a+'</li>\n'
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





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~类型电影页面接口~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var $1=cheerio.load(html,{decodeEntities:false})	
var limit2=2
/*var G_pageing_opts={
	//$parent:$1("#insert_pageing"),
	pageingUrl:'/movie/category/',
	//btn_coll:coll_movie,
	limit:2,
	param:'class',		
}*/

app1.get('/movie1111/category/:class',
G_category.process($1,$1("#insert_category")),
G_pageing.process(
	$1,
	$1("#insert_pageing"),
	'/movie/category/',
	coll_movie,
	limit2,
	'class'
	//{title:new RegExp( search_val/*req.G_pageing.search*/+'.*','i')}
),
//G_pageing.process($1,$1("#insert_pageing"),coll_movie,G_pageing_opts),
//G_search.process($1),
function(req,res){
	var cate_name=req.params.class
	var query={}
	
	//~~~~~add 分页功能~~~~~~~~~~~~~~~~~
	var skip=parseInt(req.query.skip) || 0  
	//如果不设置默认的话， 那首页就不会自动进行数量限制，而是全部显示出来了。因为url中没有传入skip limit 这种必要的参数.
	var limit=parseInt(req.query.limit) || limit2
	//console.log(skip+' , '+limit)
	if(cate_name){
		query={category:cate_name}
	}
	//~~~~~add search~~~~~~~~~~~~~~~~~
	//由于不需要添加分类下的搜索，所以此url接口不需要，等需要添加分类页面样式的搜索结果再用也不迟，由于共用一个html模板，所以路由不需要添加搜索过程了.
	/*var search_val=req.query.search
	if(search_val){
		query={title:new RegExp( search_val+'.*','i')}	
		cate_name='搜索结果页'
	}
	*/
	//~~~~~~~~~~~~~~~~~~~~~~	
	
	coll_movie.find(query).skip(skip).limit(limit).toArray(function(err,result){
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
		/*var cate_array=['科幻','喜剧','惊悚','剧情','励志','武侠','动画']
		var nav=''
		for(var i in cate_array){
			var cateName=cate_array[i]
			var a='<a href="/movie/category/'+cateName+'">'+cateName+'</a>'
			if(cate_name==cateName){
				a='<a class="current" href="/movie/category/'+cateName+'">'+cateName+'</a>'
			}
			nav+=a	
		}
		$1("#movie>nav").html(nav)*/
		
		/*$1("#movie>nav>a").each(function(i,elm){
			var $this_a=$1(this)
			var a_name=$this_a.text()	
			if(a_name==cate_name){
				$this_a.addClass("selected").siblings().removeClass("selected")
			}
		})*/
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
			



			
