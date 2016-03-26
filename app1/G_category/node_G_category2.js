
var html='\
	<nav id="category" class="inFLeft">\
		<a href="/movie" class="selected">首页</a>\
	</nav>\
';
var cate_array=['小说','艺术','政治军事','外语','文学','武侠',
'历史','动漫手绘','名人传记','电脑','旅游','原创','生活','自然科学']

//G_category.process($,放到哪个父容器中$('#xxx')，在url中的关键字段'xxx'，在coll查询哪个字段{xxx:null})
//还有夸中间件传值(query代表mongodb的查询条件)：  req.G_category_query={xxx:'xxx'}  
var process=function($,$parent/*,aFromUrl,get_key,coll_query*/){
	$parent.html(html)
	var pro=function(req,res,next){
		var interfaceUrl=req._parsedUrl.pathname
		//var cate_name=req.params.class //用url中的get传值的关键字增加需要查库的功能模块来的更加简单.
		
		var cate_array_index=parseInt(req.query.category)
		//此处敢于把category这个 url get中的关键字写死，是因为这是这个模块的专属关键字，自己当然想怎么决定都可以.
		var nav_a='<a href="'+interfaceUrl+'" class="selected">首页</a>'
		var nav=''
		for(var i in cate_array){
			var name=cate_array[i]
			//var a='<a href="/movie/category/'+name+'">'+name+'</a>'
			var a='<a href="'+interfaceUrl+'?category='+i+'">'+name+'</a>'
			if(cate_array_index==i){
				a='<a class="selected" >'+name+'</a>' //当前标签
				nav_a='<a href="'+interfaceUrl+'">首页</a>'
				req.cate_array_index=name
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