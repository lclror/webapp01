var mongoskin=require('mongoskin')
var ObjectId=mongoskin.ObjectId
var cheerio=require('cheerio')

var mongodb_array=require('../mongodb/mongodb_array')
var coll_booklist=mongodb_array.collection('booklist')
var coll_comment_book=mongodb_array.collection('commentBook')
//~~~~~~~add modules~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var G_comment2=require('../G_comment/node_G_comment2')
var G_login=require('../G_login/node_G_login')




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
<title>book details</title>\
<link rel="stylesheet" href="../../../lib/xxxbase.css">\
<link rel="stylesheet" href="../../../P_book/P_bookdetails.css">\
<script src="../../../lib/jquery.js"></script>\
</head>\
<body>\
<section id="insert_login"><!--login--></section>\
<div id="page">\
	<h1>book details</h1>\
	<p></p>\
	<ul>\
		<img src="../P_book/img/book01.jpg"/>\
		<li class="li1">书名：《 <span>鲁滨123123孙漂流记</span> 》</li>\
		<li class="li2">作者：<span>麦卡锡</span> </li>\
		<li class="li3">出版社：<span>人民出版社</span></li>\
		<li class="li4">ISBN：<span>123456456</span> </li>\
		<li class="li5">装订：<span>工装</span> </li>\
		<li class="li6">售价：<span>23.00</span> </li>\
		<li class="li7">页数：<span>563</span> </li>\
		<li class="li8">发布日期：<span>2016-03</span></li>\
	</ul>\
	<dl class="dl1">\
		<dt>图书简介:</dt>\
		<p></p>\
	</dl>\
	<dl class="dl2">\
		<dt>作者简介:</dt>\
		<p></p>\
	</dl>\
	<dl class="dl3">\
		<dt>图书目录:</dt>\
		<p></p>\
	</dl>\
	<section id="insert_comment"><!--add comment--></section>\
</div>\
</body>\
<script src="../../../lib/require.js" data-main="../../../P_book/P_bookdetails.js"></script>\
</html>\
';

var $=cheerio.load(html,{decodeEntities:false})
$("section#insert_comment").html(G_comment2.html)
var G_commentProcess=G_comment2.process($,coll_comment_book,{book_id:null})

function routerall(app1){
	
	app1.get('/book/details/:id',
	function(req,res,next){
	//此处为了去掉ObjectId() 处理非特定Id时的报错,正常的id是24个字符长度.	
		var book_id=req.params.id
		if(book_id.length !=24){
			res.redirect('/book')	
		}else{next()}	
	},	
	G_commentProcess, //process
	G_login.process($,$("#insert_login")),//process
	function(req,res){
		var _id=req.params.id
		coll_booklist.find({_id:ObjectId(_id)}).toArray(function(err,result){
			if(result[0]==null){res.redirect('/book')}else{
				//~~~~~~with pv~~~~~~~~~~~~
				coll_booklist.update({_id:ObjectId(_id)},{$inc:{pv:1}},function(err){
					if(err){console.log(err)}	
				})			
				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
				var id=result[0].id
				var image=result[0].image
				var title=result[0].title
				var author=result[0].author
				var publisher=result[0].publisher
				var ISBN=result[0].ISBN
								
				var pubdate=result[0].pubdate
				var pages=result[0].pages
				var binding=result[0].binding
				var price=result[0].price
				
				var summary=result[0].summary.replace(/\r\n/g,'<br/>')
				var author_intro=result[0].author_intro.replace(/\r\n/g,'<br/>')
				var catalog=result[0].catalog.replace(/\r\n/g,'<br/>')
				
				var category=result[0].category
				
				$("title").text(title)
				$("#page>p").html('《 '+title+' 》')
				$("#page>ul>img").attr('src',image)
				$("li.li1>span").text(title)
				$("li.li2>span").text(author)
				$("li.li3>span").text(publisher)
				$("li.li4>span").text(ISBN)
				$("li.li5>span").text(binding)
				$("li.li6>span").text(price)
				$("li.li7>span").text(pages)
				$("li.li8>span").text(pubdate)
				
				$("dl.dl1>p").text(summary)
				$("dl.dl2>p").text(author_intro)
				$("dl.dl3>p").text(catalog)
				html=$.html()
				res.send(html)
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
			}
		})
	})	
	//~~~~~~~~~~~~~~~~~~~~
	G_comment2.ajax1(app1,'/ajax/book/comment',coll_comment_book)
	G_comment2.ajax2(app1,'/ajax/book/comment/del',coll_comment_book)
	//~~~~~~~~~~~~~~~~~~~~
}
exports.routerall=routerall