function ajax_del(e){e.post("/ajax/book/booklist2/delete",function(e,t){var n=e.body.title;coll_booklist.remove({title:n},function(e,n){e?t.send([{status:"error"}]):t.send([{status:"success"}])})})}function routerall(e){var t=cheerio.load(html,{decodeEntities:!1});e.get("/book/admin01/booktable",function(e,t,n){var r=e.session.adminlogin;r?n():t.redirect("/book")},G_search.process(t,t("#insert_search")),G_category.process(t,t("#insert_category")),G_booklist.process(t,t("#insert_booklist2"),coll_booklist),G_pageing.process(t,t("#insert_pageing"),6,coll_booklist,"category",null,"search",null),function(e,n){html=t.html(),n.send(html)}),ajax_del(e)}var mongodb_array=require("../mongodb/mongodb_array"),coll_booklist=mongodb_array.collection("booklist"),cheerio=require("cheerio"),html='<!doctype html><html lang="zh-CN"/><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1"/><meta name="renderer" content="webkit"/><!--[if lte IE 9]><script src="http://apps.bdimg.com/libs/html5shiv/r29/html5.min.js"></script><![endif]--><title>图书后台管理</title><link rel="stylesheet" href="../../../lib/xxxbase.css"><link rel="stylesheet" href="../../../P_book/P_booktable.css"><script src="../../../lib/jquery.js"></script></head><body><section id="booktable">	<h1>图书列表页</h1>	<section id="insert_search"><!--G_search--></section>	<h3 class="islogin"></h3>	<section id="insert_category"><!--G_category--></section>	<p class="p1">标签</p>	<section id="insert_booklist2"><!--booklist2--></section>	<section id="insert_pageing"><!--G_pageing--></section></section></body><script src="../../../lib/require.js" data-main="../../../P_book/P_booktable.js"></script></html>',G_booklist=require("./node_G_booklist2"),G_pageing=require("../G_pageing/node_G_pageing2"),G_category=require("../G_category/node_G_category2"),G_search=require("../G_search/node_G_search2");exports.routerall=routerall;