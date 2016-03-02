var html='\
<div id="pageing">\
	<a href="#">1</a><a href="#">2</a><a href="#">3</a>\
</div>\
';
/*var opts={
	$parent:$("#xxx"), //把html(此模块)放到哪个父容器中
	pageingUrl:'/xxx/xxx/', //生成a标签要用到的href 部分的值
	btn_coll:coll_movie,  //要搜索的collection(集)
	limit:2,      //限制一页显示的数量为多少
	param:'class', //在url中代表电影类型的关键字段名
	search_coll_key,	  //在选定的coll中要查哪个字段
}*/
//~~目前做到的兼容有~~~~~~~~~~~~~~
//1:主页面电影分页
//2:各类型标签页分页
//3:搜索结果页分页
//注：在这里的搜索不是搜他们的内容，而是搜它们的数量，好用来生成多个分页与按钮。
//加入每种功能的兼容，是为了搜索它们的数量，并把按钮按数量自动生成出来。
//~~~~~~~~~~~~~~~~
/*G_pageing.process($,
 $("#xxx"), //父容器 
'/xxx/xxx', //a标签连接到哪个页面的url  
7,				//每页显示几条数据 
collection,	//给哪个coll分页
'xxx' ,			//url中加入 标签分页功能 的关键字段
{xxxkey:null},	//给coll 标签分页 要查库中的哪个键
'xxx' ,			//url中加入 搜索功能 的关键字段
{xxxkey:null},	//给coll 搜索分页 要查库中的哪个键
)*/
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function process($,
$parent,//父容器 
//aFromUrl,//a标签连接到哪个页面的ur
limit,//每页显示几条数据
whereCollPageing,//给哪个coll分页
urlKeyFromCategory,		//url中加入 标签分页功能 的关键字段
collKeyFromCategory,		//给coll 标签分页 要查库中的哪个键
urlKeyFromSearch,			//url中加入 搜索功能 的关键字段
collKeyfromSearch			//给coll 搜索分页 要查库中的哪个键
){ 

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//function process($,$parent,pageingUrl,btn_coll,limit,param,search_coll_key){ 
/*,pageingUrl,limit,param*/ 
//最后一个参数:param 是给a标签中的路径用的,也可以理解为变动的路径/key ，例如/movie 它是写死的，那要是灵活变动的路径，就要用req.params[param]这种方法了
		//要改变this的指向，必须在某个函数的外壳下，单独对一个非函数的对象改变它的this是没有办法实现的.
/*		var $parent=opts.$parent
		var pageingUrl=opts.pageingUrl
		var btn_coll=opts.btn_coll
		var limit=opts.limit
		var param=opts.param*/
	$parent.html(html)
	var pro=function(req,res,next){
		var interfaceUrl=req._parsedUrl.pathname
		//console.log(req._parsedUrl.pathname)
		var limit=2	
		var query={}
		//~~~计算当前页~~~~~~~
		//这里取到的值是字符串，所以不能进行除法运算，必须先转换类型为number
/*		var _skin=parseInt(req.query.skip) || 0
		var _limit=parseInt(req.query.limit) || limit
		//下面是当前页
		var c_page=Math.ceil(_skin/_limit) */
		var c_page=req.query.page || 0
		
		//console.log(_skin+_limit+'====>' +c_page)
		/////var cate_name=req.params[param] || ''
		//~~与电影分类标签的兼容~~~~~~~~~
		//var cate_name=req.query.category || ''
		var cate_name=req.query[urlKeyFromCategory] 
		if(cate_name){
			//limit=2
			query={category:cate_name}	
			if(collKeyFromCategory){
				for(var i in collKeyFromCategory){
					collKeyFromCategory[i]=cate_name
					query=collKeyFromCategory
				}	
			}
		}
		
		if(!cate_name){
		//传来的limit默认是2 ，如果url中没有关键字category说明是首页或者搜索页，那每页显示7个.
			limit=7	
			
		}
		//search module~~辅助搜索功能用，按钮数量根据搜索结果来增加~~~~~~~~~~~~~
		//var search_val=req.query.search
		var search_val=req.query[urlKeyFromSearch]
		if(search_val){
			query={title:new RegExp( search_val+'.*','i')}
			//search_coll_key={key:''}
			if(collKeyfromSearch){
				for(var i in collKeyfromSearch){
					collKeyfromSearch[i]=new RegExp( search_val+'.*','i')
					query=collKeyfromSearch
				}
			}
		}

		//~~~~~~~~~~~~~~~
		//根据不同的查询条件，查询出不同数量的结果，再根据相同的limit生成不同的按钮数量。
		//目前条件有 1：全部的电影coll，2：只查category字段下的某个值；3：搜索title字段，模糊匹配.
		whereCollPageing.find(query).count(function(err,count){
		//if( parseInt(count)>5 && parseInt(count)<22 ){var limit=7}else if(parseInt(count)<=4){var limit=2}
		//上面按钮数量正常变动了，但开始默认显示还是默认的limit，是因为在主视图页面查库没有查一步做一步判断、赋值一次，而是查库用链式调用了,就失去了灵活的变动赋值机会.
			var btnCount=Math.ceil(count/limit)
			if(btnCount==1){btnCount=0} //按钮数量为1时，按钮不显示
			var div=''
			for(var i=0;i<btnCount;i++){
				var skip=i*limit
				//var a='<a href="'+pageingUrl+cate_name+'?skip='+skip+'&limit='+limit+'">'+i+'</a>'
				var a='<a href="'+interfaceUrl+'?skip='+skip+'&page='+i+'">'+(i+1)+'</a>'
				//~~兼容标签的按钮生成~~~
				if(cate_name){
					a='<a href="'+interfaceUrl+'?skip='+skip+'&page='+i+'&category='+cate_name+'">'+(i+1)+'</a>'	
				}
				//~~兼容搜索的按钮生成~~~
				if(search_val){
					a='<a href="'+interfaceUrl+'?skip='+skip+'&page='+i+'&search='+search_val+'">'+(i+1)+'</a>'	
				}
				//当前页无连接
				if(c_page==i ){ 
					a='<a class="current">'+(i+1)+'</a>'	 //此分页按钮的样式都写在了css文件中.
				}					
				div+=a	
			}
			$("div#pageing").html(div)
			//search module~~增加对搜索功能的兼容~~~~~~~~~~~~~
			//if(count==0){$("div#pageing").html('<h2>未搜索到结果</h2>')}
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~			
			next();
		})
	}
	return pro;	
}
//exports.html=html
exports.process=process

