var mongodb_array=require('../mongodb/mongodb_array')
var coll_booklist=mongodb_array.collection('booklist')
var cheerio=require('cheerio')

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
<title>book</title>\
<link rel="stylesheet" href="../lib/xxxbase.css">\
<link rel="stylesheet" href="../P_book/P_book.css">\
<script src="../lib/jquery.js"></script>\
</head>\
<body>\
<section id="insert_login"><!--login insert--></section>\
<div id="P_book">\
<h1>BOOK index</h1>\
<section id="insert_search"><!--search insert--></section>\
<section id="insert_lunbo"><!--lunbo--></section>\
<section id="insert_category"><!--category insert--></section>\
<section id="insert_booklist"><!--booklist insert--></section>\
<section id="insert_pageing"><!--pageing insert--></section>\
</div>\
</body>\
<script src="../lib/require.js" data-main="../P_book/P_book.js"></script>\
</html>\
';

var G_booklist=require('./node_G_booklist')
var G_pageing=require('../G_pageing/node_G_pageing2')
var G_category=require('../G_category/node_G_category2')
var G_search=require('../G_search/node_G_search2')
var G_login=require('../G_login/node_G_login')
var G_lunbo=require('../G_lunbo/node_G_lunbo')


function routerall(app1){
	var $=cheerio.load(html,{decodeEntities: false})
	app1.get('/book',
	G_category.process($,$('#insert_category')),
	G_search.process($,$('#insert_search')),
	G_booklist.process($,$('#insert_booklist'),coll_booklist),
	G_pageing.process($,$('#insert_pageing'),6,coll_booklist,'category',null,'search',null),
	G_login.process($,$('#insert_login')),
	G_lunbo.process( $('#insert_lunbo') ),
	function(req,res){
		html=$.html()	
		res.send(html)
	})
	
}
exports.routerall=routerall

