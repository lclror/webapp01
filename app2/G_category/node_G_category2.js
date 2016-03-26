
var html='\
	<nav id="category" class="inFLeft">\
		<a href="/movie" class="selected">首页</a>\
	</nav>\
';
var cate_array=['小说','艺术','政治军事','外语','文学','武侠',
'历史','动漫手绘','名人传记','电脑','旅游','原创','生活','自然科学']

var process=function($,$parent/*,aFromUrl,get_key,coll_query*/){
	$parent.html(html)
	var pro=function(req,res,next){
		var interfaceUrl=req._parsedUrl.pathname
		
		var cate_array_index=parseInt(req.query.category)
		var nav_a='<a href="'+interfaceUrl+'" class="selected">首页</a>'
		var nav=''
		for(var i in cate_array){
			var name=cate_array[i]
			var a='<a href="'+interfaceUrl+'?category='+i+'">'+name+'</a>'
			if(cate_array_index==i){
				a='<a class="selected" >'+name+'</a>' //当前标签
				nav_a='<a href="'+interfaceUrl+'">首页</a>'
				req.cate_array_index=name
			}
			nav+=a	
		}
		if(req.query.search){
			nav_a='<a href="'+interfaceUrl+'" class="selected">搜索页/回到首页</a>'
		}
		$("#category").html(nav_a+nav)	
	next()}
	return pro;	
}

exports.process=process