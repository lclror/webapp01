var mongodb_array=require('../mongodb/mongodb_array')
var coll_booklist=mongodb_array.collection('booklist')
var cheerio=require('cheerio')
//var G_islogin=require('./node_G_islogin')

var html='\
<!doctype html>\
<html lang="zh-CN"/>\
<head>\
<meta charset="utf-8">\
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1"/>\
<meta name="renderer" content="webkit"/>\
<!--[if lte IE 9]>\
<script src="http://apps.bdimg.com/libs/html5shiv/r29/html5.min.js"></script>\
<![endif]-->\
<title>图书后台管理</title>\
<link rel="stylesheet" href="../../../lib/xxxbase.css">\
<link rel="stylesheet" href="../../../P_book/P_booktable.css">\
<script src="../../../lib/jquery.js"></script>\
</head>\
<body>\
<section id="booktable">\
	<h1>图书列表页</h1>\
	<section id="insert_search"><!--G_search--></section>\
	<h3 class="islogin"></h3>\
	<section id="insert_category"><!--G_category--></section>\
	<p class="p1">标签</p>\
	<section id="insert_booklist2"><!--booklist2--></section>\
	<section id="insert_pageing"><!--G_pageing--></section>\
</section>\
</body>\
<script src="../../../lib/require.js" data-main="../../../P_book/P_booktable.js"></script>\
</html>\
';




function ajax_del(app1){
	app1.post('/ajax/book/booklist2/delete',function(req,res){
		var title=req.body.title
		coll_booklist.remove({title:title},function(err,result){
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

var G_booklist=require('./node_G_booklist2')
var G_pageing=require('../G_pageing/node_G_pageing2')
var G_category=require('../G_category/node_G_category2')
var G_search=require('../G_search/node_G_search2')

function routerall(app1){
	var $=cheerio.load(html,{decodeEntities: false})
	app1.get('/book/admin01/booktable',
	function(req,res,next){
		var user=req.session.adminlogin
		if(user){next()}else{res.redirect('/book')}	
	},
	G_search.process($,$('#insert_search')),
	G_category.process($,$('#insert_category')),
	G_booklist.process($,$('#insert_booklist2'),coll_booklist),
	G_pageing.process($,$('#insert_pageing'),6,coll_booklist,'category',null,'search',null),
	function(req,res){
		html=$.html()	
		res.send(html)
	})	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
	
	ajax_del(app1)
}

exports.routerall=routerall


