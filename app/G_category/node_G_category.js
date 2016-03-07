
var html='\
	<nav id="category" class="inFLeft inmarRight-2">\
		<a href="/movie" class="selected">首页</a>\
	</nav>\
';
var cate_array=['科幻','喜剧','惊悚','剧情','励志','武侠','动画','爱情','悬疑','动作']

//G_category.process($,放到哪个父容器中$('#xxx')，在url中的关键字段'xxx'，在coll查询哪个字段{xxx:null})
//还有夸中间件传值(query代表mongodb的查询条件)：  req.G_category_query={xxx:'xxx'}  
var process=function($,$parent/*,aFromUrl,get_key,coll_query*/){
	$parent.html(html)
	var pro=function(req,res,next){
		var interfaceUrl=req._parsedUrl.pathname
		//var cate_name=req.params.class //用url中的get传值的关键字增加需要查库的功能模块来的更加简单.
		
		/* 此处等于多此一举
		var query={}
		var cate_name=req.query[get_key]
		if(cate_name){
		//~关于为什么要把查库的方法传递出去：因为视图数据是通过查库得来的，而查库又不在这里查，所以要传递出去。
		//根据不同的查询字段和值查出不同的数据来，所以把要查询的{字段：值}传递出去，然后到真正查库的中间件中去接收这个方法。
		//之所以使用req对象承载数据，因为这是最简单的夸中间件的数据传递方式~
			req.G_category_query={category:cate_name}	 //默认查询category字段
			if(coll_query){ //如果自定义coll查询字段的话
				for(var i in coll_query){
					coll_query[i]=cate_name
					req.G_category_query=coll_query	
				}	
			}
		}*/
		
		var cate_name=req.query.category 
		//此处敢于把category这个 url get中的关键字写死，是因为这是这个模块的专属关键字，自己当然想怎么决定都可以.
		var nav_a='<a href="'+interfaceUrl+'" class="selected">首页</a>'
		var nav=''
		for(var i in cate_array){
			var name=cate_array[i]
			//var a='<a href="/movie/category/'+name+'">'+name+'</a>'
			var a='<a href="'+interfaceUrl+'?category='+name+'">'+name+'</a>'
			if(cate_name==name){
				a='<a class="selected" >'+name+'</a>'
				nav_a='<a href="'+interfaceUrl+'">首页</a>'
			}
			nav+=a	
		}
		//~~兼容搜索~~~~~~~~~~~~~~~~
		if(req.query.search){
			nav_a='<a href="'+interfaceUrl+'" class="selected">搜索页/回到首页</a>'
		}
		//~~~~~~~~~~~~~~~~~~~~
		$("#category").html(nav_a+nav)	
	next()}
	return pro;	
}

exports.process=process