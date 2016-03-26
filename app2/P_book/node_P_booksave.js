var mongoskin=require('mongoskin')
var ObjectId=mongoskin.ObjectId

var mongodb_array=require('../mongodb/mongodb_array')
var coll_booklist=mongodb_array.collection('booklist')
var cheerio=require('cheerio')



var html='<!doctype html>\
<html lang="zh-CN"/>\
<head>\
<meta charset="utf-8">\
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1"/>\
<meta name="renderer" content="webkit"/>\
<!--[if lte IE 9]>\
<script src="http://apps.bdimg.com/libs/html5shiv/r29/html5.min.js"></script>\
<![endif]-->\
<title>booksave</title>\
<link rel="stylesheet" href="../../../lib/xxxbase.css">\
<link rel="stylesheet" href="../../../P_book/P_booksave.css">\
<script src="../../../lib/jquery.js"></script>\
</head>\
<body>\
<section id="booksave">\
	<nav></nav>\
	<h1>book 后台录入页</h1>\
	<label class="marright3">豆瓣图书 id:</label><input type="text" class="input1 form-input marright2"/>\
	<button class="btn1 btn-opacity ">获取jsonp</button>\
	<ul>\
		<li>小说</li> <li>艺术</li> <li>政治军事</li> <li>外语</li> <li>文学</li>\
		<li>武侠</li> <li>历史</li> <li>动漫手绘</li> <li>名人传记</li> <li>电脑</li>\
		<li>旅游</li> <li>原创</li> <li>生活</li> <li>自然科学</li> <li>其他</li>\
	</ul>\
	<p>标签</p>\
	<form>\
		<label for="">id </label><input type="text"><br/>\
		<label for="">封面 </label><input type="text"><br/>\
		<label for="">标题 </label><input type="text"><br/>\
		<label for="">作者 </label><input type="text"><br/>\
		<label for="">出版社 </label><input type="text"><br/>\
		<label for="">ISBN </label><input type="text"><br/>\
\
		<label for="">发布日期 </label><input type="text"><br/>\
		<label for="">页数 </label><input type="text"><br/>\
		<label for="">装订 </label><input type="text"><br/>\
		<label for="">价钱 </label><input type="text"><br/>\
		<label for="">封面上传 </label><input disabled type="file"><br/>\
\
		<label class="des" for="">概要 </label><textarea name="" id="" cols="45" rows="7"></textarea><br/>\
		<label class="des" for="">作者简介 </label><textarea name="" id="" cols="45" rows="7"></textarea><br/>\
		<label class="des" for="">目录 </label><textarea name="" id="" cols="45" rows="7"></textarea><br/>\
\
		<button type="button">录入</button>\
		<p class="hide">[未获得录入权限]</p>\
	</form>\
</section>\
</body>\
<script src="../../../lib/require.js" data-main="../../../P_book/P_booksave.js"></script>\
</html>\
'

var multer=require('multer')
var upload=multer({dest:'./P_book/img'}) 



//~~~~~ajax  book save in booklist~~~~~~~~~~~~~~
function ajax(app1){
	app1.post('/ajax/book/admin/save',upload.single('posters_file'),function(req,res){
		var nav_bookId=req.body.nav  
		
		var id=req.body.id
		var image=req.body.image  
		var title=req.body.title
		var author=req.body.author
		var publisher=req.body.publisher
		var ISBN=req.body.ISBN
		
		var pubdate=req.body.pubdate
		var pages=req.body.pages
		var binding=req.body.binding
		var price=req.body.price
		
		var summary=req.body.summary
		var author_intro=req.body.author_intro
		var catalog=req.body.catalog	
		
		var category=req.body.category 
		var category_arr=category.split(',')  

		
		var doc={

				id:id,
				image:image,
				title:title,
				author:author,
				publisher:publisher,
				ISBN:ISBN,
				
				pubdate:pubdate,
				pages:pages,
				binding:binding,
				price:price,	
							
				summary:summary,
				author_intro:author_intro,
				catalog:catalog,
				
				category:category_arr,
				pv:0
		}
		if(nav_bookId!=''){ 
			doc._id=ObjectId(nav_bookId)
		}
		coll_booklist.save(doc,function(err,result){
				console.log(result.result)
				if(err){
					res.send({status:'error'})	
				}else{
					res.send({status:'success'})
				}	
		})
	})	
}



//var G_isloginProcess1=G_islogin.process($01)

function routerall(app1){
	ajax(app1)
//修改页路由以及配置.
	var $1=cheerio.load(html,{decodeEntities:false})  //单独/save 用
	app1.get('/book/admin01/save',
	function(req,res,next){
		var user=req.session.adminlogin
		if(user){next()}else{res.redirect('/book')}	
	},	
	function(req,res){
		//var html=$.html()  //这里只所以还是干净的，是因为下面的例子有从新开了一个新的$去调用,这此之内的$不是同一个.
		//在路由过程中往全局中传递变量，是传递到最顶层的，只要在系统内任何一个封装方法内有同名变量，就会覆盖那个全局的变量，所以不容易使用。
		//所以如果这次路由过程中传递html为全局变量，就接收不到，因为它被开头部分的html给覆盖了。
		html=$1.html()
		res.send(html)	  
	})
	
//修改页	带参数路由\
	var $=cheerio.load(html,{decodeEntities:false})  //save/:id 用 如果同一个html页面字符串，被多个页面接口使用的话，为了不冲突就这样使用.
	app1.get('/book/admin01/save/:id'/*,G_islogin.process($)*/,function(req,res){
		
		//var index=parseInt(req.params.id)
		var book_id=req.params.id
		coll_booklist.find({_id:/*index*/ObjectId(book_id)}).toArray(function(err,result){
				$("#booksave>nav").text(book_id)  
	
		var 	id=result[0].id,
				image=result[0].image,
				title=result[0].title,
				author=result[0].author,
				publisher=result[0].publisher,
				ISBN=result[0].ISBN,
				
				pubdate=result[0].pubdate,
				pages=result[0].pages	
				binding=result[0].binding,
				price=result[0].price,
				
				summary=result[0].summary,
				author_intro=result[0].author_intro,
				catalog=result[0].catalog,
				
				category=result[0].category	 //电影标签数组对象
				//console.log(category)
		var $input=$("#booksave>form>input")
		$input.eq(0).val(id)
		$input.eq(1).val(image)
		$input.eq(2).val(title)
		$input.eq(3).val(author)		
		$input.eq(4).val(publisher)
		$input.eq(5).val(ISBN)
		
		$input.eq(6).val(pubdate)
		$input.eq(7).val(pages)
		$input.eq(8).val(binding)
		$input.eq(9).val(price)
		
		$("#booksave>form>textarea").eq(0).val(summary)
		$("#booksave>form>textarea").eq(1).val(author_intro)
		$("#booksave>form>textarea").eq(2).val(catalog)
		//点提交时脚本就会把此值一并提交给ajax接口，然后ajax接口用此值来判断是否为更新.
		//~~~再从电影信息库中查它的类别数据~~~~~~~~~~~~
		$("#booksave>ul>li").each(function(i, elm) {
			var $this_li=$(this)
			var li_text=$this_li.text()
			for(var i in category){
				var tag_text=	category[i]
				if(li_text==tag_text){
					$this_li.addClass("selected")	
				}else{
					$this_li.removeClass('selected')	
				}
			}
		});	
		//~~~~submit_btn~~~~~~~~~~~
		if(result[0].pv>14){
			$("#booksave form button").addClass('hide')
			$("#booksave form p").removeClass('hide')
		}else{
			$("#booksave form button").removeClass('hide')
			$("#booksave form p").addClass('hide')	
		}
		html=$.html()
		res.send(html)	
		})	
	})
	
}

exports.routerall=routerall