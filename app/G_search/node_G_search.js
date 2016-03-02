var html='<div id="search"><input class="form-input" type="text"><a>search</a></div>';

function process($,$parent/*,aFromUrl*/){
	$parent.html(html)
	
	var pro=function(req,res,next){
	var interfaceUrl=req._parsedUrl.pathname
		
	$("#search>a").attr('href',interfaceUrl+'?search=')	
	//方法是在客户端脚本中 把input中的值替换掉xxx即可实现自适应.
	//~~~~~add search~~~~~~~~~~~~~~~~~
	/*var query={}
	var search_val=req.query.search
	if(search_val){
		query={title:new RegExp( search_val+'.*','i')}
		req.G_search=query
		//$("#movie>nav>a").eq(0).removeClass("selected")
		//$("#movie>h1").html('<h1>MOVIE 搜索结果页</h1>')
		//这里之所以注释掉，是因为谁的事情谁自己最清楚，不要无故的为了拆分干净而拆分出去，这样是没有效率的事情.
		//一个模块中只要没有自己的数据库要查，那就不必考虑其它关键字的兼容性。
		//有自己的库要查的话，那最好把库、关键字，查库方法都不要写死，否则就无法复用了.
	}else{
		//$("#movie>h1").html('<h1>MOVIE 首页</h1>')	
		//$("#movie>nav>a").eq(0).addClass("selected")
	}*/
	//~~~~~~~~~~~~~~~~~~~~~~		
	next()
	}
	return pro;	
}

exports.process=process

