var html='\
<div id="pageing">\
	<a href="#">1</a><a href="#">2</a><a href="#">3</a>\
</div>\
';
//~~目前做到的兼容有~~~~~~~~~~~~~~
//1:主页面电影分页
//2:各类型标签页分页
//3:搜索结果页分页
//注：在这里的搜索不是搜他们的内容，而是搜它们的数量，好用来生成多个分页与按钮。
//加入每种功能的兼容，是为了搜索它们的数量，并把按钮按数量自动生成出来。
//~~~~~~~~~~~~~~~~
/*G_pageing.process($,
 $("#xxx"), //父容器 
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
limit,//每页显示几条数据
whereCollPageing,//给哪个coll分页
urlKeyFromCategory,		//url中加入 标签分页功能 的关键字段
collKeyFromCategory,		//给coll 标签分页 要查库中的哪个键
urlKeyFromSearch,			//url中加入 搜索功能 的关键字段
collKeyfromSearch			//给coll 搜索分页 要查库中的哪个键
){ 

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	$parent.html(html)
	var pro=function(req,res,next){
		var interfaceUrl=req._parsedUrl.pathname
		//console.log(req._parsedUrl.pathname)
		var query={}
		
		var c_page=req.query.page || 0  //current page
		
		//console.log(_skin+_limit+'====>' +c_page)
		//~~与电影分类标签的兼容~~~~~~~~~
		var cate_name=req.query[urlKeyFromCategory] 
		if(cate_name){
			query={category:req.cate_array_index}	
			if(collKeyFromCategory){
				for(var i in collKeyFromCategory){
					collKeyFromCategory[i]=/*cate_name*/req.cate_array_index
					query=collKeyFromCategory
				}	
			}
		}
		
		//search module~~辅助搜索功能用，按钮数量根据搜索结果来增加~~~~~~~~~~~~~
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
			var btnCount=Math.ceil(count/limit)
			if(btnCount==1){btnCount=0} //按钮数量为1时，按钮不显示
			var div=''
			for(var i=0;i<btnCount;i++){
				var skip=i*limit
				//var a='<a href="'+pageingUrl+cate_name+'?skip='+skip+'&limit='+limit+'">'+i+'</a>'
				var a='<a href="'+interfaceUrl+'?skip='+skip+'&page='+i+'">'+(i+1)+'</a>'
				//~~兼容标签的按钮生成~~~
				if(cate_name){
					a='<a href="'+interfaceUrl+'?skip='+skip+'&page='+i+'&'+urlKeyFromCategory+'='+cate_name+'">'+(i+1)+'</a>'	
				}
				//~~兼容搜索的按钮生成~~~
				if(search_val){
					a='<a href="'+interfaceUrl+'?skip='+skip+'&page='+i+'&'+urlKeyFromSearch+'='+search_val+'">'+(i+1)+'</a>'	
				}
				//当前页无连接
				if(c_page==i ){ 
					a='<a class="current">'+(i+1)+'</a>'	 //此分页按钮的样式都写在了css文件中.
				}					
				div+=a	
			}
			$("div#pageing").html(div)
			next();
		})
	}
	return pro;	
}
exports.process=process

